import { AxiosError } from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';

import styles from './FriendList.module.scss';

import { UserError } from '../../../constants/errors';
import { API_params, NoPosts } from '../../../constants/pages';
import useFetch from '../../../hooks/useFetch';
import { getId } from '../../../store/selectors/userSelector';
import { IFriendItem } from '../../../types/types';
import UserService from '../../API/UserService';
import Loader from '../../Loader/Loader';
import FriendItem from '../FriendItem/FriendItem';

const FriendList: React.FC = () => {
  const [friends, setFriends] = useState<IFriendItem[]>();

  const [skip, setSkip] = useState<number>(0);
  const [isPaginationLoad, setIsPaginationLoad] = useState<boolean>(false);
  const [paginationError, setPaginationError] = useState<string>('');

  const myId = useSelector(getId);

  const [fetchFriends, isFriendsLoading, isFriendsError] = useFetch(async () => {
    const friendList = await UserService.getAllUsers(API_params.limit, skip);

    const pureFriends = friendList.data.filter((user) => {
      return user._id !== myId;
    });

    setFriends(pureFriends);
    setSkip((prev) => (prev += API_params.skip));
  });

  useEffect(() => {
    fetchFriends();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastElement = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const changePage = async (): Promise<void> => {
    if (friends?.length === 0) return;

    try {
      const allFriendsLength = (await UserService.getAllUsers()).data.length;

      if (friends?.length! + 1 >= allFriendsLength) {
        throw new Error('Больше нечего подгружать');
      }

      setPaginationError('');
      setIsPaginationLoad(true);

      const response = await UserService.getAllUsers(API_params.limit, skip);
      const pureFriends = response.data.filter((user) => {
        return user._id !== myId;
      });
      setSkip((prev) => (prev += API_params.skip));
      setFriends([...friends!, ...pureFriends]);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setPaginationError(err.message);
      }
    }
  };

  useEffect(() => {
    if (isFriendsLoading || !lastElement.current) return;

    if (observer.current) observer.current.disconnect();

    const callback = function (entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting) {
        try {
          changePage();
        } catch (err) {
          console.error(`Error has occured, ${err}`);
        }
      }
    };

    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current);
    setIsPaginationLoad(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  if (isFriendsLoading) {
    return (
      <div className={styles.friendsWrapper}>
        <Loader />
      </div>
    );
  }

  if (isFriendsError) {
    return (
      <div className={styles.friendsWrapper}>
        <h1 className={styles.friendsError}>{`${UserError.postListgetErr}${UserError.postListTryLater}`}</h1>
      </div>
    );
  }

  if (!friends) return null;

  if (friends.length === 0) {
    return (
      <div className={styles.friendsWrapper}>
        <h1>{NoPosts.usersFriendPage}</h1>
      </div>
    );
  }

  return (
    <div className={styles.friendsWrapper}>
      {friends.map((friend) => (
        <FriendItem
          key={friend._id}
          name={friend.name}
          body={friend.body}
          _id={friend._id}
          createdDate={friend.createdDate}
        />
      ))}
      <div ref={lastElement} className={styles.observer}></div>
      <div className={styles.paginationParams}>
        {paginationError ? (
          <span>
            {UserError.postListgetErr} {paginationError}. {UserError.userData}
          </span>
        ) : (
          isPaginationLoad && <Loader />
        )}
      </div>
    </div>
  );
};

export default FriendList;

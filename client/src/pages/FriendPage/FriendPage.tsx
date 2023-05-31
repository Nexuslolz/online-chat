import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router';

import styles from './FriendPage.module.scss';

import UserService from '../../components/API/UserService';
import FriendData from '../../components/FriendData/FriendData';
import Loader from '../../components/Loader/Loader';
import UserPostList from '../../components/Posts/UserPostList/UserPostList';
import Slider from '../../components/Slider/Slider';
import { UserError } from '../../constants/errors';
import { Friends } from '../../constants/pages';
import useFetch from '../../hooks/useFetch';
import { IUser } from '../../types/types';

const FriendPage: React.FC = () => {
  const [friend, setFriend] = useState({} as IUser);
  const location = useLocation();
  const id = location.pathname.replace(/\/friends\//gi, '');

  const [isAnyFriend, setIsAnyFriend] = useState<boolean>(false);

  const [fetchFriend, isFriendLoading, isFriendError] = useFetch(async () => {
    const friendList = await UserService.getUser(id);

    setFriend(friendList.data);
  });

  useEffect(() => {
    fetchFriend(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (friend.friends && friend.friends.length > 0) {
      setIsAnyFriend(true);
    }
  }, [friend]);

  if (isFriendLoading) {
    return (
      <div className={styles.friendData__wrapper}>
        <Loader />
      </div>
    );
  }

  if (isFriendError) {
    return (
      <div className={styles.friendData__wrapper}>
        <h1>{`${UserError.postListgetErr}${UserError.userData}`}</h1>
      </div>
    );
  }

  return (
    <div className={styles.friendData__wrapper}>
      <FriendData id={id} friend={friend} />
      <div className={styles.friend__posts}>
        {isAnyFriend ? (
          <Slider friends={friend.friends} />
        ) : (
          <h1 className={styles.userData__friends}>{Friends.noFriends}</h1>
        )}
        <UserPostList postList={friend.posts!} />
      </div>
    </div>
  );
};

export default FriendPage;

import React, { useEffect, useState } from 'react';

import styles from './FriendList.module.scss';

import useFetch from '../../../hooks/useFetch';
import { IFriendItem } from '../../../types/types';
import UserService from '../../API/UserService';
import Loader from '../../Loader/Loader';
import FriendItem from '../FriendItem/FriendItem';

const FriendList: React.FC = () => {
  const [friends, setFriends] = useState<IFriendItem[]>();
  const [fetchFriends, isFriendsLoading] = useFetch(async () => {
    const friendList = await UserService.getAllUsers();
    setFriends(friendList.data);
  });

  useEffect(() => {
    fetchFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!friends) return null;
  return (
    <div className={styles.friendsWrapper}>
      {isFriendsLoading ? <Loader /> : friends.map((friend) => <FriendItem name={friend.name} id={friend.id} />)}
    </div>
  );
};

export default FriendList;

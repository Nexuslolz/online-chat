import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import styles from './FriendItem.module.scss';

import avatar from '../../../assets/person-avatar-placeholder.png';
import { PeoplePage } from '../../../constants/pages';
import { getId, getUserFriends } from '../../../store/selectors/userSelector';
import { userSlice } from '../../../store/slices/userSlice';
import { IFriendItem } from '../../../types/types';
import UserService from '../../API/UserService';
import Button from '../../Button/Button';

const FriendItem: React.FC<IFriendItem> = (props: IFriendItem) => {
  const friendList = useSelector(getUserFriends);
  const userId = useSelector(getId);

  const router = useNavigate();
  const [isFriend, setIsFriend] = useState<boolean>(friendList.includes(props._id) ? true : false);
  const dispatch = useDispatch();

  const redirectToProduct = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    router(`/friends/${props._id}`);
  };

  const addFriend = () => {
    UserService.addFriend(userId, props._id);
    dispatch(userSlice.actions.addFriend([...friendList, props._id]));
    setIsFriend(true);
  };

  const deleteFriend = () => {
    UserService.deleteFriend(userId, props._id);
    const deleteFriend = friendList.filter((item) => item !== props._id);
    dispatch(userSlice.actions.addFriend(deleteFriend));
    setIsFriend(false);
  };

  return (
    <div id={props._id} className={styles.friendItem}>
      <div onClick={redirectToProduct} className={styles.friendsItem__data}>
        <div className={styles.friendItem__imgWrapper}>
          <img className={styles.friendItem__img} src={avatar} alt='avatar' />
        </div>
        <div className={styles.friendsItem__content}>
          <h2 className={styles.friendItem__header}>{props.name}</h2>
          <p>
            <span>{PeoplePage.city}</span>
            {props.body.city}
          </p>
          <p>
            <span>{PeoplePage.register}</span>
            {new Date(props.createdDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className={styles.friendsItem__btns}>
        <Button additionalClass={styles.friends__btn} text={PeoplePage.chat} />
        <Button
          additionalClass={isFriend ? styles.friends__btn_remove : styles.friends__btn}
          text={isFriend ? PeoplePage.removeFriend : PeoplePage.addFriend}
          onClick={isFriend ? deleteFriend : addFriend}
        />
      </div>
    </div>
  );
};

export default FriendItem;

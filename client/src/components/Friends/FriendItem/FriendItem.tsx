import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import styles from './FriendItem.module.scss';

import avatar from '../../../assets/person-avatar-placeholder.png';
import { MyPage, PeoplePage } from '../../../constants/pages';
import { getId, getUserFriends } from '../../../store/selectors/userSelector';
import { IFriendItem } from '../../../types/types';
import { deleteFriend, addFriend } from '../../../utils/friendControlls';
import { Routes, redirect } from '../../../utils/redirect';
import Button from '../../Button/Button';

const FriendItem: React.FC<IFriendItem> = (props: IFriendItem) => {
  const friendList = useSelector(getUserFriends);
  const userId = useSelector(getId);

  const router = useNavigate();
  const [isFriend, setIsFriend] = useState<boolean>(friendList.includes(props._id) ? true : false);
  const dispatch = useDispatch();

  return (
    <div id={props._id} className={styles.friendItem}>
      <div onClick={() => redirect(router, Routes.friends, props._id)} className={styles.friendsItem__data}>
        <div className={styles.friendItem__imgWrapper}>
          <img className={styles.friendItem__img} src={avatar} alt='avatar' />
        </div>
        <div className={styles.friendsItem__content}>
          <h2 className={styles.friendItem__header}>{props.name}</h2>
          <p>
            <span>{PeoplePage.city}</span>
            {props.body.city ? props.body.city : MyPage.noValue}
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
          onClick={
            isFriend
              ? () => deleteFriend(userId, props._id, friendList, dispatch, setIsFriend)
              : () => addFriend(userId, props._id, friendList, dispatch, setIsFriend)
          }
        />
      </div>
    </div>
  );
};

export default FriendItem;

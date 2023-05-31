import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './FriendData.module.scss';

import image from '../../assets/person-avatar-placeholder.png';

import { PeoplePage, MyPage } from '../../constants/pages';
import { getId, getUserFriends } from '../../store/selectors/userSelector';
import { IUser } from '../../types/types';
import { deleteFriend, addFriend } from '../../utils/friendControlls';
import { getAge } from '../../utils/getAge';
import Button from '../Button/Button';

interface IFriendData {
  id: string;
  friend: IUser;
}

const FriendData: React.FC<IFriendData> = (props: IFriendData) => {
  const friendList = useSelector(getUserFriends);
  const dispatch = useDispatch();

  const userId = useSelector(getId);
  const [isFriend, setIsFriend] = useState<boolean>(friendList.includes(props.id) ? true : false);

  return (
    <div className={styles.friendData}>
      <div className={styles.friendData__content}>
        <div className={styles.friendData__headerWrapper}>
          <div className={styles.friendData__imgWrapper}>
            <img className={styles.friendData__img} src={image} alt='photouser' />
          </div>
          <h1 className={styles.friendData__name}>{props.friend.name}</h1>
        </div>
        <div className={styles.friendData__contentWrapper}>
          <div className={styles.friend__btns}>
            <Button additionalClass={styles.friends__btn} text={PeoplePage.chat} />
            <Button
              additionalClass={isFriend ? styles.friends__btn_remove : styles.friends__btn}
              text={isFriend ? PeoplePage.removeFriend : PeoplePage.addFriend}
              onClick={
                isFriend
                  ? () => deleteFriend(userId, props.id, friendList, dispatch, setIsFriend)
                  : () => addFriend(userId, props.id, friendList, dispatch, setIsFriend)
              }
            />
          </div>
          <ul className={styles.friendDataField}>
            <li className={styles.friendDataField__item}>
              <h3 className={styles.friendData__header}>{`${MyPage.age}:`}</h3>
              <span>{`${isNaN(getAge(props.friend.body?.age!)) ? '' : getAge(props.friend.body?.age!)} ${
                isNaN(getAge(props.friend.body?.age!)) ? MyPage.noValue : MyPage.years
              }`}</span>
            </li>
            <li className={styles.friendDataField__item}>
              <h3 className={styles.friendData__header}>{`${MyPage.birth}:`}</h3>
              <span>
                {props.friend.body?.age ? new Date(props.friend.body?.age).toLocaleDateString() : MyPage.noValue}
              </span>
            </li>
            <li className={styles.friendDataField__item}>
              <h3 className={styles.friendData__header}>{`${MyPage.city}:`}</h3>
              <span>{props.friend.body?.city ? props.friend.body?.city : MyPage.noValue}</span>
            </li>
            <h3 className={styles.friendData__header}>{`${MyPage.about}:`}</h3>
            <li className={styles.friendDataField__item}>
              <p className={`${styles.friendDataField__item} ${styles.friendDataField__paragraph}`}>
                {props.friend.body?.about ? props.friend.body?.about : MyPage.noValue}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FriendData;

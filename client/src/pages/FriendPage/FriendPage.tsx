import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';

import styles from './FriendPage.module.scss';

import image from '../../assets/person-avatar-placeholder.png';
import UserService from '../../components/API/UserService';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import UserPostList from '../../components/Posts/UserPostList/UserPostList';
import { UserError } from '../../constants/errors';
import { MyPage, PeoplePage } from '../../constants/pages';
import useFetch from '../../hooks/useFetch';
import { getUserFriends, getId } from '../../store/selectors/userSelector';
import { IUser } from '../../types/types';
import { addFriend, deleteFriend } from '../../utils/friendControlls';
import { getAge } from '../../utils/getAge';

const FriendPage: React.FC = () => {
  const [friend, setFriend] = useState({} as IUser);
  const location = useLocation();
  const id = location.pathname.replace(/\/friends\//gi, '');

  const friendList = useSelector(getUserFriends);
  const userId = useSelector(getId);
  const [isFriend, setIsFriend] = useState<boolean>(friendList.includes(id) ? true : false);

  const dispatch = useDispatch();

  const [fetchFriend, isFriendLoading, isFriendError] = useFetch(async () => {
    const friendList = await UserService.getUser(id);

    setFriend(friendList.data);
  });

  useEffect(() => {
    fetchFriend(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className={styles.friendData}>
        <div className={styles.friendData__content}>
          <div className={styles.friendData__headerWrapper}>
            <div className={styles.friendData__imgWrapper}>
              <img className={styles.friendData__img} src={image} alt='photouser' />
            </div>
            <h1 className={styles.friendData__name}>{friend.name}</h1>
          </div>
          <div className={styles.friendData__contentWrapper}>
            <div className={styles.friend__btns}>
              <Button additionalClass={styles.friends__btn} text={PeoplePage.chat} />
              <Button
                additionalClass={isFriend ? styles.friends__btn_remove : styles.friends__btn}
                text={isFriend ? PeoplePage.removeFriend : PeoplePage.addFriend}
                onClick={
                  isFriend
                    ? () => deleteFriend(userId, id, friendList, dispatch, setIsFriend)
                    : () => addFriend(userId, id, friendList, dispatch, setIsFriend)
                }
              />
            </div>
            <ul className={styles.friendDataField}>
              <li className={styles.friendDataField__item}>
                <h3 className={styles.friendData__header}>{`${MyPage.age}:`}</h3>
                <span>{`${isNaN(getAge(friend.body?.age!)) ? '' : getAge(friend.body?.age!)} ${
                  isNaN(getAge(friend.body?.age!)) ? MyPage.noValue : MyPage.years
                }`}</span>
              </li>
              <li className={styles.friendDataField__item}>
                <h3 className={styles.friendData__header}>{`${MyPage.birth}:`}</h3>
                <span>{friend.body?.age ? new Date(friend.body?.age).toLocaleDateString() : MyPage.noValue}</span>
              </li>
              <li className={styles.friendDataField__item}>
                <h3 className={styles.friendData__header}>{`${MyPage.city}:`}</h3>
                <span>{friend.body?.city ? friend.body?.city : MyPage.noValue}</span>
              </li>
              <h3 className={styles.friendData__header}>{`${MyPage.about}:`}</h3>
              <li className={styles.friendDataField__item}>
                <p className={`${styles.friendDataField__item} ${styles.friendDataField__paragraph}`}>
                  {friend.body?.about ? friend.body?.about : MyPage.noValue}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.friend__posts}>
        <UserPostList postList={friend.posts!} />
      </div>
    </div>
  );
};

export default FriendPage;

import React from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import styles from './FriendCard.module.scss';

import image from '../../../../assets/person-avatar-placeholder.png';
import { MyPage } from '../../../../constants/pages';
import { getId } from '../../../../store/selectors/userSelector';
import { getAge } from '../../../../utils/getAge';
import { Routes } from '../../../../utils/redirect';

export interface IFriendCard {
  name: string;
  city: string;
  birth: string;
  additionalClass: string;
  id: string;
}

const FriendCard: React.FC<IFriendCard> = (props: IFriendCard) => {
  const router = useNavigate();
  const userId = useSelector(getId);

  const redirect = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    if (userId === props.id) {
      router(`${Routes.mypage}`);
    } else {
      router(`${Routes.friends}/${props.id}`);
    }
  };

  return (
    <div id={props.id} onClick={redirect} className={`${styles.friendCard} ${props.additionalClass}`}>
      <div className={styles.friendCard__imgWrapper}>
        <img className={styles.friendCard__img} src={image} alt='avatar' />
      </div>
      <div className={styles.friendCard__contentWrapper}>
        <div className={styles.friendCard__contentBorder}>
          <p className={styles.friendCard__name}>{props.name}</p>
          <p className={styles.friendCard__content}>
            <span className={styles.friendCard__header}>{MyPage.city}: </span>
            {props.city ? props.city : MyPage.noValue}
          </p>
          <p className={styles.friendCard__content}>
            <span className={styles.friendCard__header}>{MyPage.age}: </span>
            {props.birth ? getAge(props.birth) : MyPage.noValue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;

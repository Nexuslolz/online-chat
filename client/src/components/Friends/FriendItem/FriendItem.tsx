import React from 'react';

import styles from './FriendItem.module.scss';

import { IFriendItem } from '../../../types/types';

const FriendItem: React.FC<IFriendItem> = (props: IFriendItem) => {
  return (
    <div id={props.id} className={styles.friendItem}>
      <div className={styles.friendItem__imgWrapper}>
        <img className={styles.friendItem__img} src='' alt='avatar' />
      </div>
      <h2 className={styles.friendItem__header}>{props.name}</h2>
    </div>
  );
};

export default FriendItem;

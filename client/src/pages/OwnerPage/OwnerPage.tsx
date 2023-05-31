import React from 'react';

import { useSelector } from 'react-redux';

import styles from './OwnerPage.module.scss';

import PostEditor from '../../components/Posts/components/PostEditor';
import UserPostList from '../../components/Posts/UserPostList/UserPostList';
import Slider from '../../components/Slider/Slider';
import UserData from '../../components/UserData/UserData';
import { Friends } from '../../constants/pages';
import { getPosts, getUserFriends } from '../../store/selectors/userSelector';
const OwnerPage: React.FC = () => {
  const postList = useSelector(getPosts);
  const friends = useSelector(getUserFriends);

  return (
    <div className={styles.ownerPage}>
      <UserData />
      <div className={styles.myPage__posts}>
        {friends.length > 0 ? (
          <Slider friends={friends} />
        ) : (
          <h1 className={styles.userData__friends}>{Friends.noFriends}</h1>
        )}
        <PostEditor />
        <UserPostList postList={postList!} />
      </div>
    </div>
  );
};

export default OwnerPage;

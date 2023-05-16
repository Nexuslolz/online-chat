import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { getPosts } from '../../../store/selectors/userSelector';
import { IUserPost } from '../../../types/types';
import PostItem from '../PostItem/PostItem';
import styles from '../PostList/PostList.module.scss';

const UserPostList: React.FC = () => {
  const [posts, setPosts] = useState<IUserPost[]>();

  const postList = useSelector(getPosts);

  useEffect(() => {
    const list = postList?.slice().reverse();
    setPosts(list);
  }, [postList]);

  if (!posts) return null;

  return (
    <div className={styles.postWrapper}>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostItem
            visible={false}
            id={post._id}
            key={post._id}
            name={post.username}
            body={post.body}
            date={new Date(post.createdDate)}
            likes={post.likes}
            image={post.image}
          />
        ))
      ) : (
        <h1>У вас пока нет новостей</h1>
      )}
    </div>
  );
};

export default UserPostList;

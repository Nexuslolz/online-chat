import React, { useEffect, useState } from 'react';

import { NoPosts } from '../../../constants/pages';
import { IUserPost } from '../../../types/types';
import PostItem from '../PostItem/PostItem';
import styles from '../PostList/PostList.module.scss';

interface IPostList {
  postList: IUserPost[] | [];
}

const UserPostList: React.FC<IPostList> = (props: IPostList) => {
  const [posts, setPosts] = useState<IUserPost[]>();

  // const postList = useSelector(getPosts);

  useEffect(() => {
    const list = props.postList?.slice().reverse();
    setPosts(list);
  }, [props.postList]);

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
        <h1>{NoPosts.postUserPage}</h1>
      )}
    </div>
  );
};

export default UserPostList;

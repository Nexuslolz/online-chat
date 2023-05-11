import React, { useEffect, useState } from 'react';

import styles from './PostList.module.scss';

import useFetch from '../../../hooks/useFetch';
import { ILikes } from '../../../types/types';
import PostsService from '../../API/PostsService';
import Loader from '../../Loader/Loader';
import PostItem from '../PostItem/PostItem';

interface IData {
  body: string;
  createdDate: string;
  likes: ILikes[];
  _id: string;
  username: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<IData[]>();

  const [fetchPosts, isPostsLoading, postError] = useFetch(async () => {
    const posts = await PostsService.getPosts();
    setPosts(posts.data);
  });

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!posts) return null;

  return (
    <div className={styles.postWrapper}>
      {postError ? (
        <h1>Error has occured. {postError}. Try again later.</h1>
      ) : isPostsLoading ? (
        <Loader />
      ) : (
        posts.map((post) => (
          <PostItem
            visible={true}
            key={post._id}
            id={post._id}
            name={post.username}
            body={post.body}
            date={new Date(post.createdDate)}
            likes={post.likes}
          />
        ))
      )}
    </div>
  );
};

export default PostList;

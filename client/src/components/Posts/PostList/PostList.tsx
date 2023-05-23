import { AxiosError } from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import styles from './PostList.module.scss';

import { UserError } from '../../../constants/errors';
import { API_params, NoPosts } from '../../../constants/pages';
import useFetch from '../../../hooks/useFetch';
import { IData } from '../../../types/types';
import { effectPagination } from '../../../utils/pagination';
import PostsService from '../../API/PostsService';
import Loader from '../../Loader/Loader';
import PostItem from '../PostItem/PostItem';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<IData[]>();

  const [skip, setSkip] = useState<number>(0);
  const [isPaginationLoad, setIsPaginationLoad] = useState<boolean>(false);
  const [paginationError, setPaginationError] = useState<string>('');

  const [fetchPosts, isPostsLoading, postError] = useFetch(async () => {
    const posts = await PostsService.getPosts(API_params.limit, skip);

    setPosts(posts.data);
    setSkip((prev) => (prev += API_params.skip));
  });

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lastElement = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const changePage = async (): Promise<void> => {
    if (posts?.length === 0) return;

    try {
      const allPostsLength = (await PostsService.getPosts()).data.length;

      if (posts?.length! >= allPostsLength) {
        throw new Error('Больше нечего подгружать');
      }
      setPaginationError('');
      setIsPaginationLoad(true);

      const response = await PostsService.getPosts(API_params.limit, skip);
      setSkip((prev) => (prev += API_params.skip));
      setPosts([...posts!, ...response.data]);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setPaginationError(err.message);
      }
    }
  };

  useEffect(() => {
    effectPagination(isPostsLoading, lastElement, observer, changePage, setIsPaginationLoad);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  if (isPostsLoading) {
    return (
      <div className={styles.postWrapper}>
        <Loader />
      </div>
    );
  }

  if (!posts) return null;
  if (posts.length === 0) {
    return (
      <div className={styles.postWrapper}>
        <h1>{NoPosts.postUserPage}</h1>
      </div>
    );
  }

  if (postError) {
    return (
      <div className={styles.postWrapper}>
        <h1>
          {UserError.postListgetErr} {postError}. {UserError.postListTryLater}
        </h1>
      </div>
    );
  }

  return (
    <div className={styles.postWrapper}>
      {posts.map((post) => (
        <PostItem
          visible={true}
          key={post._id}
          id={post._id}
          name={post.username}
          body={post.body}
          date={new Date(post.createdDate)}
          likes={post.likes}
          image={post.image}
          userId={post.user}
        />
      ))}
      <div ref={lastElement} className={styles.observer}></div>
      <div className={styles.paginationParams}>
        {paginationError ? (
          <span>
            {UserError.postListgetErr} {paginationError}. {UserError.userData}
          </span>
        ) : (
          isPaginationLoad && <Loader />
        )}
      </div>
    </div>
  );
};

export default PostList;

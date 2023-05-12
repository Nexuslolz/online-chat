import { AxiosError } from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import styles from './PostList.module.scss';

import { API_params } from '../../../constants/pages';
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

      if (posts?.length! >= allPostsLength) return;
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
    if (isPostsLoading || !lastElement.current) return;

    if (observer.current) observer.current.disconnect();

    const callback = function (entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting) {
        try {
          changePage();
        } catch (err) {
          console.error(`Error has occured, ${err}`);
        }
      }
    };

    observer.current = new IntersectionObserver(callback);
    observer.current.observe(lastElement.current);
    setIsPaginationLoad(false);
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
        <h1>Новостей пока нет</h1>
      </div>
    );
  }

  return (
    <div className={styles.postWrapper}>
      {postError ? (
        <h1>Error has occured. {postError}. Try again later.</h1>
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
      <div ref={lastElement} className={styles.observer}></div>
      <div className={styles.paginationParams}>
        {paginationError ? (
          <span>Error has occured. {paginationError}. Please, try later.</span>
        ) : (
          isPaginationLoad && <Loader />
        )}
      </div>
    </div>
  );
};

export default PostList;

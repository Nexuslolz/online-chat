import { AxiosError } from 'axios';
import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router';

import styles from './PostItem.module.scss';

import { getIsAuth } from '../../../store/selectors/authSelector';
import { getId } from '../../../store/selectors/userSelector';
import { authSlice } from '../../../store/slices/authSlice';
import { ILikes } from '../../../types/types';
import { Routes } from '../../../utils/redirect';
import PostsService from '../../API/PostsService';
import FavouriteBtn from '../../Icons/FavouriteBtn';

interface IPost {
  // image?: File;
  body: string;
  date: Date;
  likes: ILikes[];
  name: string;
  id: string;
  visible: boolean;
  image: string;
  userId?: string;
}

const PostItem: React.FC<IPost> = (props: IPost) => {
  const [likes, setLikes] = useState<number>(props.likes.length);
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();
  const router = useNavigate();
  const userId = useSelector(getId);

  const giveLike = async () => {
    if (!isAuth) {
      dispatch(authSlice.actions.setOpenModal(true));
    }
    try {
      await PostsService.likePost(props.id);
      setLikes((prev) => prev + 1);
    } catch (err) {
      if (err instanceof AxiosError) {
        const userId = err.response?.data.error;
        return removeLike(userId);
      }
    }
  };

  const redirect = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    if (userId === props.userId) {
      router(`${Routes.mypage}`);
    } else {
      router(`${Routes.friends}/${props.userId}`);
    }
  };

  const removeLike = async (userId: string) => {
    try {
      const postLikes = (await PostsService.getPost(props.id)).data.likeList.likes;
      // eslint-disable-next-line array-callback-return
      const likeId = postLikes.map((like: ILikes) => {
        if (like.user === userId) {
          return like._id;
        }
      });
      const pureLikeId = likeId.filter((like: string) => like !== undefined);
      await PostsService.removeLikePost(props.id, pureLikeId);

      setLikes((prev) => prev - 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id={props.id} className={styles.post}>
      <div onClick={redirect} className={styles.postHeader}>
        <div className={styles.postHeader__authorImg}></div>
        <div className={styles.postHeader__authorWrapper}>
          <h2 className={styles.postHeader__authorName}>{props.name}</h2>
          <div className={styles.postHeader__authorTime}></div>
          <span>{props.date.toLocaleDateString()}</span> <span>{props.date.toLocaleTimeString()}</span>
        </div>
      </div>
      <div className={styles.postBody__content}>
        {(props.image === undefined || props.image.length > 0) && (
          <div className={styles.postBody__img}>{/* <img src={props.image} alt='postImage' /> */}</div>
        )}
        <div className={styles.postBody__text}>{props.body}</div>
      </div>
      <div className={styles.postFooter__likes}>
        {props.visible && (
          <div className={styles.postFooter__likesWrapper}>
            <div className={styles.postFooter__likesImg}>
              <FavouriteBtn onClick={giveLike} />
            </div>
            <span>{likes}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;

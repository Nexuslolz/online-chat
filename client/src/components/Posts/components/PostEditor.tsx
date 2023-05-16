import React, { FormEvent, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './PostEditor.module.scss';

import { UserError } from '../../../constants/errors';
import { PostEditorNames } from '../../../constants/postEditor';
import useFetch from '../../../hooks/useFetch';
import { getPostFile } from '../../../store/selectors/postSelector';
import { postSlice } from '../../../store/slices/postSlice';
import { userSlice } from '../../../store/slices/userSlice';
import { IPostData } from '../../../types/types';
import PostsService from '../../API/PostsService';
import UserService from '../../API/UserService';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import ImageAdd from '../../ImageAdd/ImageAdd';
import Loader from '../../Loader/Loader';

const PostEditor: React.FC = () => {
  const [body, setBody] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const imgPost = useSelector(getPostFile);
  const formData: IPostData = {
    content: '',
    image: '',
  };

  const [sendPost, isLoadingSendPost, isErrorSendPost] = useFetch(async () => {
    await PostsService.addUserPosts(formData);
    await PostsService.addPosts(formData);

    if (!isErrorSendPost) {
      setBody(PostEditorNames.success);
      setTimeout(() => setBody(''), 3000);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  });

  useEffect(() => {
    if (isErrorSendPost) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  }, [isErrorSendPost]);

  const submitPost = async (event: FormEvent) => {
    event.preventDefault();
    if (isErrorSendPost) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
    try {
      formData.content = body;
      await sendPost();

      const postList = await UserService.getUserPosts();
      dispatch(userSlice.actions.createPost(postList.data));
      dispatch(postSlice.actions.setPostFile({} as File));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteImg = () => {
    dispatch(postSlice.actions.setPostFile({} as File));
  };

  return (
    <div className={styles.postEditor__wrapper}>
      <form className={styles.postEditor}>
        <textarea
          onChange={(event) => setBody(event.target.value)}
          className={styles.postEditor__text}
          name='post text'
          id='post'
          cols={50}
          rows={8}
          placeholder={PostEditorNames.default}
          disabled={body === PostEditorNames.success ? true : false}
          value={body.length > 0 ? body : ''}
        ></textarea>
        <div className={styles.postEditor__fileWrapper}>
          <ImageAdd />
          <div className={styles.postEditor__file}>
            <span onClick={deleteImg} className={styles.postEditor__deleteFile}></span>
            <img className={styles.postEditor__fileImg} src={imgPost.name ? URL.createObjectURL(imgPost) : ''} alt='' />
          </div>
        </div>
        <div className={styles.postEditor__footer}>
          <Button
            additionalClass={
              body.length > 0 && body !== PostEditorNames.success
                ? `${styles.postEditor__btn}`
                : `${styles.postEditor__btn} ${styles.postEditor__btn_hidden}`
            }
            text={PostEditorNames.submit}
            onClick={submitPost}
          />
          <div className={styles.postEditor__loaderWrapper}>{isLoadingSendPost && <Loader />}</div>
        </div>
        <ErrorMessage
          additionalClass={error ? styles.postEditor__error_visible : styles.postEditor__error_hidden}
          text={UserError.userData}
        />
      </form>
    </div>
  );
};

export default PostEditor;

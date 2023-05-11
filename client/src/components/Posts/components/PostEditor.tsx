import React, { FormEvent, useState } from 'react';

import { useDispatch } from 'react-redux';

import styles from './PostEditor.module.scss';

import { PostEditorNames } from '../../../constants/postEditor';
import { userSlice } from '../../../store/slices/userSlice';
import PostsService from '../../API/PostsService';
import UserService from '../../API/UserService';
import Button from '../../Button/Button';
import ImageAdd from '../../ImageAdd/ImageAdd';

const PostEditor: React.FC = () => {
  const [body, setBody] = useState<string>('');
  const dispatch = useDispatch();
  const submitPost = async (event: FormEvent) => {
    event.preventDefault();

    await PostsService.addPosts(body);
    await PostsService.addUserPosts(body);
    const postList = await UserService.getUserPosts();
    dispatch(userSlice.actions.createPost(postList.data));
    // setTimeout(() => {
    // }, 50);
    setBody('Успешно');
    setTimeout(() => setBody(''), 2000);
  };
  return (
    <div className={styles.postEditor__wrapper}>
      <form className={styles.postEditor}>
        <textarea
          onChange={(event) => setBody(event.target.value)}
          className={styles.postEditor__text}
          name='post text'
          id='post'
          cols={30}
          rows={10}
          value={body.length > 0 ? body : ''}
        ></textarea>
        <ImageAdd />
        <Button text={PostEditorNames.submit} onClick={submitPost} />
      </form>
    </div>
  );
};

export default PostEditor;

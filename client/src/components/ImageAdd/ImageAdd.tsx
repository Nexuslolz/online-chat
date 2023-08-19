import React from 'react';

import { useDispatch } from 'react-redux';

import styles from './ImageAdd.module.scss';

import { postSlice } from '../../store/slices/postSlice';

const ImageAdd: React.FC = () => {
  const dispatch = useDispatch();

  const setImage = (file: FileList) => {
    dispatch(postSlice.actions.setPostFile(file[0]));
  };

  return (
    <div className={styles.postEditor__inputWrapper}>
      <label className={styles.postEditor__label} htmlFor='file'></label>
      <input
        onChange={(event) => setImage(event.target.files!)}
        className={styles.postEditor__input}
        id='file'
        type='file'
        accept='image/*,.png,.jpg,'
      />
    </div>
  );
};

export default ImageAdd;

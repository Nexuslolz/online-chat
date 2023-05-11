import React from 'react';

import styles from './ImageAdd.module.scss';

const ImageAdd = () => {
  return (
    <div className={styles.postEditor__inputWrapper}>
      <label className={styles.postEditor__label} htmlFor='file'></label>
      <input className={styles.postEditor__input} id='file' type='file' />
    </div>
  );
};

export default ImageAdd;

import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';

const Logo: React.FC = () => {
  return (
    <Link className={styles.headerLogo} to='/'>
      <div className={styles.headerLogo__Img}></div>
      <div className={styles.headerLogo__content}>
        <h1 className={styles.headerLogo__header}>Bender</h1>
        <h1 className={styles.headerLogo__header}>Chat</h1>
      </div>
    </Link>
  );
};
export default Logo;

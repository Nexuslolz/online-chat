import React from 'react';

import styles from './OwnerPage.module.scss';

import UserData from '../../components/UserData/UserData';

const OwnerPage: React.FC = () => {
  return (
    <div className={styles.ownerPage}>
      <UserData />
    </div>
  );
};

export default OwnerPage;

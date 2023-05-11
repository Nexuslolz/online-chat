import React from 'react';

import { useSelector } from 'react-redux';

import styles from './AuthButton.module.scss';

import { Auth } from '../../../../constants/titles';
import { getIsAuth } from '../../../../store/selectors/authSelector';
import Button from '../../../Button/Button';

interface IAuthButton {
  onClick(): void;
}

const AuthButton: React.FC<IAuthButton> = (props: IAuthButton) => {
  const isAuth = useSelector(getIsAuth);

  return (
    <div>
      <Button additionalClass={styles.header__btn} text={isAuth ? Auth.signOut : Auth.signIn} onClick={props.onClick} />
    </div>
  );
};

export default AuthButton;

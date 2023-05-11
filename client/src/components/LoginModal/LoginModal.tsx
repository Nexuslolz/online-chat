import React, { FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import styles from './LoginModal.module.scss';

import { Auth } from '../../constants/titles';
import { authSlice } from '../../store/slices/authSlice';

interface IModalProps {
  title?: string | Auth | null;
  children: React.ReactNode;
}

const LoginModal: React.FC<IModalProps> = ({ title, children }) => {
  const dispatch = useDispatch();

  const closeModal = (event: FormEvent) => {
    event.preventDefault();
    dispatch(authSlice.actions.setOpenModal(false));
  };

  return (
    <>
      <div className={styles.modal}>
        <span className={styles.modal__close} onClick={closeModal}></span>
        {title && <h3 className={styles.modal__title}>{title}</h3>}
        {children}
      </div>
      <div className={styles.overlay} onClick={closeModal} />
    </>
  );
};

export default LoginModal;

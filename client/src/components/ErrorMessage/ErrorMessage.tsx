import React from 'react';

import styles from './ErrorMessage.module.scss';

interface IErr {
  text: string;
  additionalClass?: string;
}

const ErrorMessage: React.FC<IErr> = (props: IErr) => {
  return <span className={`${styles.error} ${props.additionalClass}`}>{props.text}</span>;
};

export default ErrorMessage;

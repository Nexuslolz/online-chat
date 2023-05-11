import React, { FormEvent } from 'react';

import styles from './Button.module.scss';

interface IButton {
  text: string;
  onClick?(event?: FormEvent): void;
  additionalClass?: string;
}

const Button: React.FC<IButton> = (props: IButton) => {
  return (
    <button className={`${styles.btn} ${props.additionalClass}`} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;

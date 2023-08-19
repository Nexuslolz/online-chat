import React from 'react';

import { MyPage } from '../../../../constants/pages';
import styles from '../../UserData.module.scss';
import InputEdit from '../InputEdit/InputEdit';

interface IProfileField {
  className: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  edit: boolean;
}

const ProfileField: React.FC<IProfileField> = (props: IProfileField) => {
  return (
    <li className={props.className}>
      <h3 className={styles.userData__header}>{props.name}:</h3>
      {props.edit ? (
        <InputEdit
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          type={props.type}
          placeholder={props.placeholder}
        />
      ) : (
        <span>{props.value ? props.value.split('-').reverse().join('.') : MyPage.noValue}</span>
      )}
    </li>
  );
};

export default ProfileField;

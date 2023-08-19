import styles from './InputEdit.module.scss';

interface IInputEdit {
  type: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const InputEdit: React.FC<IInputEdit> = ({ type, placeholder, value, onChange, name }: IInputEdit) => {
  return (
    <input
      className={styles.inputEdit__input}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputEdit;

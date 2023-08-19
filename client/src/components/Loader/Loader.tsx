import styles from './Loader.module.scss';

import loader from '../../assets/loader/cardLoader.gif';

interface IBtn {
  additionalClass?: string;
}

const Loader: React.FC<IBtn> = (props: IBtn) => {
  return (
    <div className={`${styles.loader} ${props.additionalClass}`}>
      <img className={styles.loaderImg} src={loader} alt='loader' />
    </div>
  );
};

export default Loader;

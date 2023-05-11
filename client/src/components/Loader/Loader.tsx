import styles from './Loader.module.scss';

import loader from '../../assets/loader/cardLoader.gif';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <img className={styles.loaderImg} src={loader} alt='loader' />
    </div>
  );
};

export default Loader;

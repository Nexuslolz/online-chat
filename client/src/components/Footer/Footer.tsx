import styles from './Footer.module.scss';

import { Logo } from '../../constants/titles';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a target='_blank' href='https://github.com/Nexuslolz' className={styles.footer__production} rel='noreferrer'>
        <span></span>
      </a>
      <p className={styles.footer__description}>
        {`${Logo.name} ${Logo.service}`}
        <sup>{Logo.point}</sup> {Logo.year}
      </p>
    </footer>
  );
};

export default Footer;

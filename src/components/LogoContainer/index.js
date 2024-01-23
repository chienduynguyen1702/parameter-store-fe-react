import { Link } from 'react-router-dom';

import styles from './LogoContainer.module.sass';

import { Image } from '../';

function LogoContainer() {
  return (
    <div className={styles.logoContainer}>
      <Link className={styles.logo} to="/">
        <Image
          className={styles.pic}
          src="/images/clouding-logo.png"
          srcDark="/images/clouding-logo.png"
          alt="Core"
        />
      </Link>
      <div className={styles.subLogo}>
        <p>{process.env.REACT_APP_PROJECT_NAME?.split(' ')[0]}</p>
        <p>
          {process.env.REACT_APP_PROJECT_NAME?.split(' ').slice(1).join(' ')}
        </p>
      </div>
    </div>
  );
}

export default LogoContainer;

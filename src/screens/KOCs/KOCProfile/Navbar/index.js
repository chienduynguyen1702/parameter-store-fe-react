import { useNavigate, useParams } from 'react-router';

import cn from 'classnames';
import styles from './Navbar.module.sass';

import useNavItems from './useNavItems';

export default function Navbar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { navItems } = useNavItems();

  return (
    <div className={styles.nav}>
      {navItems?.map((item, index) => (
        <p
          className={cn(styles.link, 'text-nowrap cursor-pointer', {
            [styles.active]: item.active,
          })}
          onClick={() => {
            navigate(`/koc-profile/${id}/${item.url}`);
          }}
          key={index}
        >
          {item.title}
        </p>
      ))}
    </div>
  );
}

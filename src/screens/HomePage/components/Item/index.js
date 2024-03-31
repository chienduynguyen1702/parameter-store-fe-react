import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';

import styles from './Item.module.sass';

import { Icon } from '../../../components';

export default function Item({ icon, title, linkTo, permission }) {
  return (
    <Col className="p-3 p-md-4 mx-md-3">
      <Link
        to={linkTo}
        className="text-dark d-flex flex-column justify-content-center align-items-center"
      >
        <Icon className={styles.icon} name={icon} size={100} fill={'#ffffff'} />
        <p className="mt-2 fs-6 ">{title}</p>
      </Link>
    </Col>
  );
}

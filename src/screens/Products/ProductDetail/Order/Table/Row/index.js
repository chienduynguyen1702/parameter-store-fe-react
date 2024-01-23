import React from 'react';
import { Row as Brow } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

import cn from 'classnames';
import styles from './Row.module.sass';

const Row = ({ item }) => {
  return (
    <>
      <Brow className={cn(styles.row)}>
        {/* Name and time */}
        <Col xs={4} className={cn(styles.col, styles.user_col)}>
          <div className={cn(styles.item, styles.nameColOuter)}>
            <div className="d-inline-flex">
              <div className={cn(styles.user, 'pe-2')}>{item.order_name}</div>
            </div>

            <div className={cn(styles.phoneNumber)}>
              <div className={styles.phoneNumber}>
                {item.order_date.slice(0, 10)}
              </div>
            </div>
          </div>
        </Col>
        {/* City */}
        <Col xs={2} className={cn(styles.col)}>
          <div className={cn(styles.title)}>City</div>
          <div className={styles.titleInfo}>{item.city}</div>
        </Col>
        {/* Amount */}
        <Col xs={2} className={cn(styles.col)}>
          <div className={cn(styles.title)}>{item.amount}</div>
          <div className={cn(styles.left)}>
            <div>10</div>
          </div>
        </Col>
        {/* Price */}
        <Col xs={1} className={cn(styles.col)}>
          <div className={cn(styles.title)}>Price</div>
          <div className={cn(styles.left)}>
            <div>{item.total_price}k</div>
          </div>
        </Col>
        {/* KOC */}
        <Col xs={3} className={cn(styles.col)}>
          <div className={cn(styles.title)}>KOC</div>
          <div className={cn(styles.left)}>
            <div>@{item.koc_name}</div>
          </div>
        </Col>
      </Brow>
    </>
  );
};
export default Row;

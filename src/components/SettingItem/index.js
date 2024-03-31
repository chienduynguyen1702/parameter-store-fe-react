import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import cn from 'classnames';
import styles from './SettingItem.module.sass';

import Icon from './../Icon';

function SettingItem({
  title = 'Setting options',
  titleButton = 'Add settings',
  onAdd,
  onEdit,
  data,
  isLoading = false,
}) {
  return (
    <div className={cn('py-4', styles.container)}>
      <div className="mb-2 ps-1">
        <span className={cn('', styles.title)}>{title}</span>
      </div>
      {isLoading ? (
        <Skeleton height={25} count={4} className="my-1" />
      ) : (
        data?.map((item, index) => {
          return (
            <Row key={index} className={cn('p-1')}>
              <Col sm={10} xs={10}>
                <p
                  className={cn('status-green-white', styles.title)}
                  style={{ backgroundColor: item.color }}
                >
                  {item.name}
                </p>
              </Col>
              <Col
                sm={2}
                xs={2}
                onClick={() => {
                  onEdit(item);
                }}
              >
                <Icon
                  className={cn('ms-auto', styles.iconEdit)}
                  name="edit"
                  size="24"
                  fill="#6F767E"
                />
              </Col>
            </Row>
          );
        })
      )}
      <p className="button-xsmall button-grey mt-2" onClick={() => onAdd()}>
        <Icon name="plus" size="12" />
        {titleButton}
      </p>
    </div>
  );
}

export default SettingItem;

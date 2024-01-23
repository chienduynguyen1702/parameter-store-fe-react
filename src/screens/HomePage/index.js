import { Row } from 'react-bootstrap';

import cn from 'classnames';
import styles from './HomePage.module.sass';

import { Card } from '../../components';
import Item from './Item';

export default function HomePage() {
  return (
    <Card className={cn(styles.card, 'pb-5')}>
      <p className="color4 fs-2 text-center my-4">What do you want to do?</p>
      <Row className="mt-4 pb-5 row-cols-auto justify-content-center">
        {/* <Item
          permission={'dashboard'}
          icon={'dashboard-orange'}
          title="Dashboard"
          linkTo={'/dashboard/highlight'}
        /> */}
        <Item
          permission={'user'}
          icon={'product-purple'}
          title="Products"
          linkTo={'/products'}
        />
        {/* <Item
          permission={'user'}
          icon={'kocs-green'}
          title="KOCs"
          linkTo={'/kocs'}
        /> */}
        {/* <Item
          permission={'user'}
          icon={'order-blue'}
          title="Orders"
          linkTo={'/orders'}
        /> */}
        <Item
          permission={'content'}
          icon={'content-orange'}
          title="Contents"
          linkTo={'/content/tiktok'}
        />
        {/* <Item
          permission={'task'}
          icon={'task-red'}
          title="Tasks"
          linkTo={'/tasks/table-view'}
        /> */}
        <Item
          permission={'user'}
          icon={'pampering-purple'}
          title="Pampering"
          linkTo={'/pamperings/table-view?page=1&limit=10'}
        />
        {/* <Item
          permission={'liquidation'}
          icon={'liquidation-red'}
          title="Liquidation"
          linkTo={'/liquidation'}
        /> */}
      </Row>
    </Card>
  );
}

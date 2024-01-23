import { Col, Row, Stack } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import cn from 'classnames';
import styles from './Detail.module.sass';

import { Card } from '../../../../components';

import { getOrderById } from '../../../../services/api';

function Detail() {
  const { id } = useParams();

  const orderDetailQuery = useQuery({
    queryKey: ['order-detail', id],
    queryFn: () => getOrderById(id),
    staleTime: 10 * 1000,
  });

  return (
    <Card
      title={orderDetailQuery?.data?.data?.data[0].order_name}
      classTitle="title-black"
      className="mb-4"
    >
      <Row>
        <Col xs={12} md={5}>
          <Stack direction="horizontal" className="my-2 my-lg-4">
            <p className={cn('me-auto', styles.label)}>Phone number</p>
            <p className={cn('', styles.content)}>
              {orderDetailQuery?.data?.data?.data[0].phone_number}
            </p>
          </Stack>
          <Stack direction="horizontal" className="my-2 my-lg-4">
            <p className={cn('me-auto', styles.label)}>Address</p>
            <p className={cn('', styles.content, styles.overFlow)}>
              {orderDetailQuery?.data?.data?.data[0].address},
              {orderDetailQuery?.data?.data?.data[0].city}
            </p>
          </Stack>
          <Stack direction="horizontal" className="my-2 my-lg-4">
            <p className={cn('me-auto', styles.label)}>Order date</p>
            <p className={cn('', styles.content)}>
              {orderDetailQuery?.data?.data?.data[0].order_date.slice(0, 10)}
            </p>
          </Stack>
          <Stack direction="horizontal" className="my-2 my-lg-4">
            <p className={cn('me-auto', styles.label)}>Transport fee</p>
            <p className={cn('', styles.content)}>
              {orderDetailQuery?.data?.data?.data[0].transport_fee}
            </p>
          </Stack>
        </Col>
        <Col xs={12} md={{ span: 5, offset: 2 }}>
          <Stack direction="horizontal" className="my-2 my-lg-4">
            <p className={cn('me-auto', styles.label)}>Amount</p>
            <p className={cn('', styles.content)}>
              {orderDetailQuery?.data?.data?.data[0].amount}
            </p>
          </Stack>
          <Stack direction="horizontal" className="my-2 my-lg-4">
            <p className={cn('me-auto', styles.label)}>Status</p>
            <p className={cn(styles.status, styles.content)}>
              {orderDetailQuery?.data?.data?.data[0].status}
            </p>
          </Stack>
          <Stack direction="horizontal" className="my-2 my-lg-4">
            <p className={cn('me-auto', styles.label)}>Platform </p>
            <p className={cn(styles.platform, styles.content)}>
              {orderDetailQuery?.data?.data?.data[0].platform}
            </p>
          </Stack>
        </Col>
      </Row>
      <div className="borderTop row">
        <Col xs={12} md={5} className="ms-auto">
          <Stack
            direction="horizontal"
            className={cn(styles.total, 'd-flex mt-2')}
          >
            <p className={cn('me-auto', styles.label)}>Total (VND)</p>
            <p className={cn('', styles.label)}>
              {Number(
                orderDetailQuery?.data?.data?.data[0]?.total_price,
              )?.toLocaleString()}
            </p>
          </Stack>
        </Col>
      </div>
    </Card>
  );
}
export default Detail;

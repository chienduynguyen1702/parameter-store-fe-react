import { Card } from '../../../components';
import { Col, Row, Stack } from 'react-bootstrap';

import { ORGANIZATION } from '../../../hooks/mocks/organization';
const Overview = () => {
  const org = ORGANIZATION;

  return (
    <Card title={`${org.name}`} classTitle="title-blue" className="mb-5">
      <Row>
        <Stack direction="horizontal" gap={3} className="py-2">
          <div className="detail-item">
            <p className="me-auto">Description:</p>
            <p className="detail-content status-text">{org.description}</p>
          </div>
        </Stack>
      </Row>
      <Row className="borderBottom py-2 mb-2">
        <Col xs={12} md={5}>
          <Stack direction="horizontal" gap={3} className="py-2">
            <p className="me-auto">Total project:</p>
            <p className="status-text ">{org.project_count}</p>
          </Stack>
          <Stack direction="horizontal" gap={3} className="py-2">
            <p className="me-auto">Created date:</p>
            <p className="detail-content status-text">{org.created_at}</p>
          </Stack>
        </Col>
        <Col xs={12} md={{ span: 5, offset: 1 }}>
          <Stack direction="horizontal" gap={3} className="py-2">
            <p className="me-auto">Members: </p>
            <p className="detail-content status-text">{org.users_count}</p>
          </Stack>
          <Stack direction="horizontal" gap={3} className="py-2">
            <p className="me-auto">Address:</p>
            <p className="detail-content status-text">{org.address}</p>
          </Stack>
        </Col>
      </Row>
    </Card>
  );
};

export default Overview;

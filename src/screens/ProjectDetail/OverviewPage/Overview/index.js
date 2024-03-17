import { useContext } from 'react';

import { Card } from '../../../../components';
import { Col, Row, Stack } from 'react-bootstrap';

import { AuthContext } from '../../../../context/AuthContext';
import { useListProjects } from '../../../../hooks/data';
import { PROJECTS } from '../../../../hooks/mocks/projects';
const Overview = () => {
  const project = PROJECTS[0];

  return (
    <Card title={`${project.name}`} classTitle="title-purple" className="mb-5">
      <Row>
        {/* <Col xs={12} md={4}> */}
        <Stack direction="horizontal" gap={3} className="py-2">
          <div className="detail-item">
            <p className="me-auto">Description:</p>
            <p className="detail-content status-text">{project.description}</p>
          </div>
        </Stack>
        {/* </Col> */}
      </Row>

      <Row className="borderBottom py-2 mb-2">
        <Col xs={12} md={5}>
          <Stack direction="horizontal" gap={3} className="py-2">
            <p className="me-auto">Current sprint no:</p>
            <p className="status-text ">{project.currentSprint}</p>
          </Stack>
          <Stack direction="horizontal" gap={3} className="py-2">
            <p className="me-auto">Status:</p>
            <p className="detail-content status-text">{project.status}</p>
          </Stack>
          <Stack direction="horizontal" gap={3} className="py-2">
            <p className="me-auto">Start date:</p>
            <p className="detail-content status-text">{project.startDate}</p>
          </Stack>
        </Col>
        <Col xs={12} md={{ span: 5, offset: 1 }}>
          <Stack direction="horizontal" gap={3} className="py-2">
            <p className="me-auto">Members: </p>
            <p className="detail-content status-text">{project.users_count}</p>
          </Stack>
          <Stack direction="horizontal" gap={3} className="py-2">
            <p className="me-auto">Address:</p>
            <p className="detail-content status-text">{project.address}</p>
          </Stack>
        </Col>
      </Row>
    </Card>
  );
};

export default Overview;

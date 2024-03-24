import { Col, Row, Stack } from 'react-bootstrap';
import { useState } from 'react';

import { ButtonSetting, Card, Icon, Modal } from '../../../../components';
import { PROJECTS } from '../../../../hooks/mocks/projects';

import EditProjectForm from '../../../Projects/components/EditProjectForm';
import SettingsForm from './SettingsForm';

const Overview = () => {
  const project = PROJECTS[0];

  const [isEditMode, setIdEditMode] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  return (
    <>
      <Modal
        outerClassName={'outerModal'}
        visible={isEditMode}
        onClose={() => {
          setIdEditMode(false);
          setIsSetting(false);
        }}
      >
        <EditProjectForm />
      </Modal>
      <Modal
        visible={isSetting}
        onClose={() => {
          setIdEditMode(false);
          setIsSetting(false);
        }}
      >
        <SettingsForm />
      </Modal>
      <Card
        title={`Overview`}
        classTitle="title-blue"
        className="mb-5"
        head={
          <>
            <div
              className="cursor-pointer ms-auto"
              onClick={() => {
                setIdEditMode(true);
                console.log('x');
              }}
            >
              <Icon name="edit" size={24} />
            </div>
            <ButtonSetting
              titleButton="Config Stages and Environments"
              handleClickSetting={() => setIsSetting(true)}
            />
          </>
        }
      >
        <Row>
          {/* <Col xs={12} md={4}> */}
          <Stack direction="horizontal" gap={3} className="py-2">
            <div className="detail-item">
              <p className="me-auto">Description:</p>
              <p className="detail-content status-text">
                {project.description}
              </p>
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
              <p className="detail-content status-text">
                {project.users_count}
              </p>
            </Stack>
            <Stack direction="horizontal" gap={3} className="py-2">
              <p className="me-auto">Address:</p>
              <p className="detail-content status-text">{project.address}</p>
            </Stack>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Overview;

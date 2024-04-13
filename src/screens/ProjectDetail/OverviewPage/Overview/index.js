import { Col, Row, Stack } from 'react-bootstrap';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ButtonSetting, Card, Icon, Modal } from '../../../../components';
import EditProjectForm from './EditProjectForm';
import SettingsForm from './SettingsForm';
import moment from 'moment';

const Overview = ({ overview , usersList}) => {
  // const project = PROJECTS[0];
  // const { id } = useParams();
  // console.log("project id: ",id);
  // const {overview, usersList, isSuccess} = useProjectOverviewAndUserList(id);
  // console.log("overview: ",overview);
  const [isEditMode, setIdEditMode] = useState(false);
  // const [isSetting, setIsSetting] = useState(false);
  // if (!isSuccess) {
  //   // Handle loading state if needed
  //   return <p>Loading...</p>;
  // }
  // if (!overview) {
  //   // Handle case when organization data is not available
  //   return <p>No organization data available</p>;
  // }
  return (
    <>
      <Modal
        outerClassName={'outerModal'}
        visible={isEditMode}
        onClose={() => {
          setIdEditMode(false);
          // setIsSetting(false);
        }}
      >
        <EditProjectForm />
      </Modal>
      {/* <Modal
        visible={isSetting}
        onClose={() => {
          setIdEditMode(false);
          setIsSetting(false);
        }}
      >
        <SettingsForm />
      </Modal> */}
      <Card
        title=  {overview.name}
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
            {/* <ButtonSetting
              titleButton="Config Stages and Environments"
              handleClickSetting={() => setIsSetting(true)}
            /> */}
          </>
        }
      >
        <Row>
          {/* <Col xs={12} md={4}> */}
          <Stack direction="horizontal" gap={3} className="py-2">
            <div className="detail-item">
              <p className="me-auto">Description:</p>
              <p className="detail-content status-text">
                {/* {project.description} */}
                {overview.description}
              </p>
            </div>
          </Stack>
          {/* </Col> */}
        </Row>

        <Row className="borderBottom py-2 mb-2">
          <Col xs={12} md={5}>
            <Stack direction="horizontal" gap={3} className="py-2">
              <p className="me-auto">Current sprint no:</p>
              <p className="status-text ">{overview.current_sprint}</p>
            </Stack>
            <Stack direction="horizontal" gap={3} className="py-2">
              <p className="me-auto">Status:</p>
              <p className="detail-content status-text">{overview.status}</p>
            </Stack>
            <Stack direction="horizontal" gap={3} className="py-2">
              <p className="me-auto">Start date:</p>
              <p className="detail-content status-text">{moment(overview.start_at).format("DD/MM/YYYY")}</p>
            </Stack>
          </Col>
          <Col xs={12} md={{ span: 6, offset: 1 }}>
            <Stack direction="horizontal" gap={3} className="py-2">
              <p className="me-auto">Repository URL:</p>
              <p className="detail-content status-text">{overview.repo_url}</p>
            </Stack>
            <Stack direction="horizontal" gap={3} className="py-2">
              <p className="me-auto">Members: </p>
              <p className="detail-content status-text">
                {usersList.length}
              </p>
            </Stack>
            <Stack direction="horizontal" gap={3} className="py-2">
              <p className="me-auto">Address:</p>
              <p className="detail-content status-text">{overview.address}</p>
            </Stack>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Overview;

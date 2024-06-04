import { Col, Row, Stack } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { toast } from 'react-toastify';

import { Card, Icon, Modal } from '../../../../components';
import EditProjectForm from './EditProjectForm';
import moment from 'moment';

const Overview = ({ overview, usersList }) => {
  // const project = PROJECTS[0];
  const { id } = useParams();
  // console.log("project id: ",id);
  // const {overview, usersList, isSuccess} = useProjectOverviewAndUserList(id);
  // console.log("overview: ",overview);
  const { me } = useContext(AuthContext);
  const [editedItemId, setEditedItemId] = useState(undefined);
  const [isEditMode, setIdEditMode] = useState(false);
  const handleEditClick = (id) => {
    // if me is admin of projects include id and me is organization admin
    if (
      me.isOrganizationAdmin ||
      (Array.isArray(me.isAdminOfProjects) &&
        me.isAdminOfProjects.includes(Number(id)))
    ) {
      setIdEditMode(true);
      setEditedItemId(id);
    } else toast.error('You are not authorized to perform this action');
  };
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
        {typeof editedItemId !== 'undefined' && (
          <EditProjectForm
            editedItemId={editedItemId}
            onClose={() => {
              setEditedItemId(undefined);
              setIdEditMode(false);
            }}
          />
        )}
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
        title={'Project Overview'}
        classTitle="title-purple"
        className="mb-5"
        head={
          <>
            <div
              className="cursor-pointer ms-auto"
              onClick={() => {
                // setIdEditMode(true);
                // console.log('x');
                handleEditClick(overview.id);
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
                {overview?.description}
              </p>
            </div>
          </Stack>
          {/* </Col> */}
        </Row>

        <Row className="borderBottom py-2 mb-2">
          <Col xs={12} md={5}>
            <Stack direction="horizontal" gap={3} className="py-2">
              <p className="me-auto">Current sprint no:</p>
              <p className="status-text ">{overview?.current_sprint}</p>
            </Stack>
            <Stack direction="horizontal" gap={3} className="py-2">
              <p className="me-auto">Status:</p>
              <p className="detail-content status-text">{overview?.status}</p>
            </Stack>
            <Stack direction="horizontal" gap={3} className="py-2">
              <p className="me-auto">Start date:</p>
              <p className="detail-content status-text">
                {moment(overview?.start_at).format('DD-MM-YYYY')}
              </p>
            </Stack>
          </Col>
          <Col xs={12} md={{ span: 6, offset: 1 }}>
            <Stack direction="horizontal" gap={3} className="py-2">
              <p className="me-auto">Repository URL:</p>
              <a
                href={`https://${overview?.repo_url}`}
                target="_blank"
                rel="noopener noreferrer"
                // className="mb-1 text-dark d-block"
              >
                <p className="detail-content status-text">
                  {overview?.repo_url}
                </p>
              </a>
            </Stack>
            <Stack direction="horizontal" gap={3} className="py-2">
              <p className="me-auto">Members: </p>
              <p className="detail-content status-text">
                {usersList ? usersList.length : '0'}
              </p>
            </Stack>
            <Stack direction="horizontal" gap={3} className="py-2">
              <p className="me-auto">Address:</p>
              <p className="detail-content status-text">{overview?.address}</p>
            </Stack>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Overview;

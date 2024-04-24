import { useParams } from 'react-router-dom';

import Overview from './Overview';
import UsersPage from './Users';
import Stages from './Stages';
import useProjectOverviewAndUserList  from '../../../hooks/data/projects/useProjectOverviewAndUserListById';
import { Col, Row } from 'react-bootstrap';
import Environments from './Environments';
import WorkflowsPage from './Workflow';

const DashboardPage = () => {

  const { id } = useParams();
  const {overview, usersList, isSuccess, listWorkflows, pagination} = useProjectOverviewAndUserList(id);
  if (!isSuccess) {
    // Handle loading state if needed
    return <p>Loading...</p>;
  }
  if (!overview) {
    // Handle case when organization data is not available
    return <p>No organization data available</p>;
  }
  return (
    <>
      <Overview 
      overview = {overview}
      usersList = {usersList}/>
      <UsersPage />
      <WorkflowsPage
        listWorkflows={listWorkflows}
        // isListWorkflowsSuccess={isSuccess}
        // pagination={pagination}
      />
      <Row>
        <Col>
          <Stages />
        </Col>
        <Col>
          <Environments />
        </Col>
      </Row>
    </>
  );
};
export default DashboardPage;

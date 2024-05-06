import React from 'react';

import { Card } from '../../../../components';

import Table from './Table';

const WorkflowsPage = ({}) => {
  return (
    <>
      <Card
        title={`Workflows In GitHub`}
        classTitle="title-red"
        className={'mb-5'}
      >
        <Table />
      </Card>
    </>
  );
};

export default WorkflowsPage;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Card,
} from '../../../../components';

import Table from './Table';
import {  } from '../../../../hooks/data';

const WorkflowsPage = ({listWorkflows}) => {
  console.log('listWorkflows', listWorkflows);
  return (
    <>
      <Card
        title={`${listWorkflows?.length} Workflows`}
        classTitle="title-red"
        className={'mb-5'}
      >
        <Table
          listWorkflows={listWorkflows}
          // totalPage={pagination?.totalPage}
        />
      </Card>
    </>
  );
};

export default WorkflowsPage;
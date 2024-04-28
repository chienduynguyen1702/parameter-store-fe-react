import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Card,
} from '../../../../components';

import Table from './Table';
import {  } from '../../../../hooks/data';

const WorkflowsPage = ({}) => {
  return (
    <>
      <Card
        title={`Workflows In GitHub`}
        classTitle="title-red"
        className={'mb-5'}
      >
        <Table/>
      </Card>
    </>
  );
};

export default WorkflowsPage;

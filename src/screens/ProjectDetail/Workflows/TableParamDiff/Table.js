import React from 'react';
import style from './Table.module.sass';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

import Row from './Row/Row';
import { NoData } from '../../../../components';
const TableParamDiffInStage = ({ stage }) => {
  return (
    <>
      <div className={style.title}>Stage : {stage.name}</div>
      <div style={{ height: '650px' }} className={'tableOuter'}>
        <div className="tableContainer">
          <div className="tableHead">
            <div className="tableCell pb-4">Name</div>
            <div className="tableCell">Previous Value</div>
            <div className="tableCell">New Value</div>
          </div>
          {stage?.parameters?.map((item) => (
            <Row key={item.id} item={item} />
          ))}
        </div>
        {stage?.parameters?.length === 0 && <NoData />}
      </div>
    </>
  );
};

export default TableParamDiffInStage;

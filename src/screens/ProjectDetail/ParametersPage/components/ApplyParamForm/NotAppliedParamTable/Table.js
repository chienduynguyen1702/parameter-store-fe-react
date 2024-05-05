import React from 'react';

import Row from './Row/Row';
import { NoData, Pagination } from '../../../../../../components';

const NotAppliedParamTable = ({ listNotAppliedParameters, totalPage }) => {
  return (
    <>
      <div className="tableOuter">
        <div className="tableContainer">
          <div className="tableHead">
            <div className="tableCell pb-4">Name</div>
            <div className="tableCell">Value</div>
            <div className="tableCell">Stage</div>
            <div className="tableCell">Environment</div>
            <div className="tableCell">Updated at</div>
            <div className="tableCell">Is Applied</div>
          </div>
          {
            // isSuccess &&
            listNotAppliedParameters.map((item) => (
              <Row key={item.id} item={item} />
            ))
          }
        </div>
        {listNotAppliedParameters.length === 0 && <NoData />}
      </div>
      {listNotAppliedParameters.length !== 0 && (
        <Pagination pageCount={listNotAppliedParameters.length} />
      )}
    </>
  );
};

export default NotAppliedParamTable;

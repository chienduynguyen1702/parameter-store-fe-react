import React from 'react';
import style from './Table.module.sass';
import cn from 'classnames';

import Row from './Row/Row';
import { NoData, Pagination } from '../../../../../components';

const Table = ({
  listParameters,
  isSuccess,
  isLoading,
  totalPage,
  setEditedItemId,
  archiveMutation,
  isArchivedSuccess,
}) => {
  // console.log('listParameters', listParameters);
  // console.log('totalPage', totalPage);

  return (
    <>
      <div className={cn(style.head, 'tableOuter')}>
        <div className="tableContainer">
          <div className="tableHead">
            <div className="tableCell pb-4">Name</div>
            <div className="tableCell">Value</div>
            <div className="tableCell">Stage</div>
            <div className="tableCell">Environment</div>
            {/* <div className="tableCell">Created at</div> */}
            <div className="tableCell">Updated at</div>
            <div className="tableCell">Is Applied</div>
            {/* <div className="tableCell">Expired at</div> */}
            <div className="tableCell"></div>
          </div>
          {isSuccess &&
            listParameters?.map((item) => (
              <Row
                key={item.id}
                item={item}
                setEditedItemId={setEditedItemId}
                archiveMutation={archiveMutation}
                isArchivedSuccess={isArchivedSuccess}
              />
            ))}
        </div>
        {isSuccess && listParameters?.length === 0 && <NoData />}
      </div>
      {((isSuccess && listParameters?.length !== 0) || isLoading) && (
        <Pagination pageCount={totalPage || 5} />
      )}
    </>
  );
};

export default Table;

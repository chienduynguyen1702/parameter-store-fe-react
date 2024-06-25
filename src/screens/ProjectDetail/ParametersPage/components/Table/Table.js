import React from 'react';
import style from './Table.module.sass';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

import Row from './Row/Row';
import { NoData, Pagination } from '../../../../../components';
import { useListParameters } from '../../../../../hooks/data';
const Table = ({
  // listParameters,
  isSuccess,
  isLoading,
  totalPage,
  setEditedItemId,
  archiveMutation,
  isArchivedSuccess,
  roleRequired,
}) => {
  const { id } = useParams();
  const { listParameters } = useListParameters(id);
  // console.log('listParameters', listParameters);
  // console.log('listParameters table totalPage', totalPage);

  return (
    <>
      <div style={{ height: '650px' }} className={'tableOuter'}>
        <div className="tableContainer">
          <div className="tableHead">
            <div className="tableCell pb-4">Name</div>
            <div className="tableCell">Value</div>
            <div className="tableCell">Environment</div>
            <div className="tableCell">Stage</div>
            {/* <div className="tableCell">Created at</div> */}
            <div className="tableCell">Edited At</div>
            <div className="tableCell">Is Applied</div>
            <div className="tableCell">Is Used At</div>
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
                roleRequired={roleRequired}
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

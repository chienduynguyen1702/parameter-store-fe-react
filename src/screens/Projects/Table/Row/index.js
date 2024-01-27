import React from 'react';
import PopoverEditProject from './PopoverEditProject';

const Row = ({ item }) => {
  return (
    <>
      <div className="d-sm-table-row d-none tableRow">
        <div className="d-table-cell tableCell py-3 roundedLeft">
          <div className="colorN4">{item.id}</div>
        </div>
        <p className="d-table-cell tableCell">{item.name}</p>
        <p className="d-table-cell tableCell">{item.description}</p>
        <p className="d-table-cell tableCell">{item.createdAt}</p>
        <p className="d-table-cell tableCell">{item.updatedAt}</p>
        <div className="d-table-cell tableCell roundedRight">
          <PopoverEditProject item={item} />
        </div>
      </div>
    </>
  );
};

export default Row;

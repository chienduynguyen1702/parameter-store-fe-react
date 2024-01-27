import React from 'react';
import PopoverEditSecret from './PopoverEditSecret';

const Row = ({ item }) => {
  return (
    <>
      <div className="d-sm-table-row d-none tableRow">
        <div className="d-table-cell tableCell py-3 roundedLeft">
          <div className="colorN4">{item.id}</div>
        </div>
        <p className="d-table-cell tableCell">{item.name}</p>
        <p className="d-table-cell tableCell">{item.value}</p>
        <p className="d-table-cell tableCell">{item.projectName}</p>
        <p className="d-table-cell tableCell">{item.description}</p>
        <p className="d-table-cell tableCell">{item.createdAt}</p>
        <p className="d-table-cell tableCell">{item.updatedAt}</p>
        <div className="d-table-cell tableCell roundedRight">
          <PopoverEditSecret item={item} />
        </div>
      </div>
    </>
  );
};

export default Row;

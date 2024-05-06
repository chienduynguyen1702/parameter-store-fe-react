import React from 'react';

const Row = ({ item, setEditedItemId, archiveMutation }) => {
  // console.log('item', item);
  return (
    <div className="tableRow">
      <div className="tableCell py-3 ps-2 roundedLeft">
        <p>{item.name}</p>
      </div>
      <p className="tableCell">{item.value}</p>
      <div className="tableCell">
        <p
          className="status-default"
          style={{ backgroundColor: item.stage.color }}
        >
          {item.stage.name}
        </p>
      </div>
      <div className="tableCell">
        <p
          className="status-default"
          style={{ backgroundColor: item.environment.color }}
        >
          {item.environment.name}
        </p>
      </div>
      <p className="tableCell">{item.updatedAt}</p>
      <p className="tableCell">{item.isApplied.toString()}</p>
    </div>
  );
};

export default Row;

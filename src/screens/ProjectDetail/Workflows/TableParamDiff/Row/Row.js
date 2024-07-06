import React from 'react';

const Row = ({ item }) => {
  // console.log('item', item);

  return (
    <div className="tableRow">
      <div className="tableCell py-3 ps-2 roundedLeft">
        <p>{item.name}</p>
      </div>
      <p className="tableCell">{item.previous_value}</p>
      <div className="tableCell roundedRight">
        <p
          className="status-default"
          style={{
            backgroundColor:
              item.current_value !== item.previous_value ? 'yellow' : '#f5f5f5',
          }}
        >
          {item.current_value}
        </p>
      </div>
    </div>
  );
};

export default Row;

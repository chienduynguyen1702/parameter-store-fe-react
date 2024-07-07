import React from 'react';

const Row = ({ item }) => {
  // console.log('item', item);
  let defaultPreviousParamColor = '#f5f5f5';
  let defaultCurrentParamColor = '#f5f5f5';
  if (item.current_value === '') {
    // Add a condition to check if the current value is null, meaning it has been deleted
    defaultPreviousParamColor = 'red';
  } else if (item.previous_value === '') {
    // Add a condition to check if the previous value is null, meaning it has been added
    defaultCurrentParamColor = 'green';
  } else if (item.current_value !== item.previous_value) {
    // Add a condition to check if the current value is different from the previous value
    defaultCurrentParamColor = 'yellow';
  }

  return (
    <div className="tableRow">
      <div className="tableCell py-3 ps-2 roundedLeft">
        <p>{item.name}</p>
      </div>
      <div className="tableCell">
        <p
          className="status-default"
          style={{
            backgroundColor: defaultPreviousParamColor,
          }}
        >
          {item.previous_value}
        </p>
      </div>
      <div className="tableCell roundedRight">
        <p
          className="status-default"
          style={{
            backgroundColor: defaultCurrentParamColor,
          }}
        >
          {item.current_value}
        </p>
      </div>
    </div>
  );
};

export default Row;

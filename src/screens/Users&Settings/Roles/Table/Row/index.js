import React from 'react';

import PopoverEditRole from './PopoverEditRole';

const Row = ({ item }) => {
  return (
    <>
      <div className="d-sm-table-row d-none tableRow">
        <div className="tableCell py-3 roundedLeft">
          <div className="status-default">{item.name}</div>
        </div>
        <div className="tableCell">
          <div className="font14 colorN4">{item.usersCount} users</div>
        </div>

        {/* <div className="tableCell">
          {item?.permissions.slice(0, 6)?.map((permission, index) => (
            <div key={index} className="role d-inline">
              {permission.description}
            </div>
          ))}
          {item?.permissions.length > 5 && (
            <div className="role d-inline">+{item?.permissions.length - 5}</div>
          )}
        </div> */}

        {/* <div className={'tableCell text-end roundedRight'}>
          <PopoverEditRole item={item} />
        </div> */}
      </div>
    </>
  );
};

export default Row;

import React from 'react';

import AvatarAndInfo from './AvatarAndInfo';

import PopoverEditUser from './PopoverEditUser';

const Row = ({ item }) => {
  return (
    <>
      <div className="tableRow">
        <div className="tableCell py-3 ps-2 roundedLeft">
          <AvatarAndInfo
            itemId={item.id}
            avatarUrl={item.avatarUrl}
            username={item.username}
            phone={item.phone}
          />
        </div>
        <div className="tableCell">
          <div className="colorN4">{item.email}</div>
        </div>
        <div className="tableCell">
          <div className="status-green-dark ">{item.permissionsCount}</div>
        </div>
        <div className="tableCell">{item.roles}</div>
        <div className="tableCell">{item.lastSignIn}</div>
        <div className="tableCell roundedRight">
          <PopoverEditUser itemId={item} />
        </div>
      </div>
    </>
  );
};

export default Row;

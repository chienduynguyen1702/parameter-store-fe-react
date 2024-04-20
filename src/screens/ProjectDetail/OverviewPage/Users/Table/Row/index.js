import React from 'react';

import cn from 'classnames';
import AvatarAndInfo from './AvatarAndInfo';
import { PopoverEditAndRemove } from '../../../../../../components';

const Row = ({ item, setEditedItemId, setRemovedItemId, handleRemoveUser }) => {
  return (
<div className="tableRow">
      <div className="tableCell py-3 ps-2 roundedLeft">
        <AvatarAndInfo
          itemId={item?.id}
          avatarUrl={item?.avatarUrl}
          username={item?.username}
          // phone={item?.phone}
        />
      </div>
      <div className="tableCell">{item.email}</div>
      <div className="tableCell">{item.role}</div>
      {/* <div className="tableCell">{item.phone}</div> */}
      <div className="tableCell roundedRight">
        <PopoverEditAndRemove
          itemId={item?.id}
          name="user"
          setEditedItemId={setEditedItemId}
          handleRemove={handleRemoveUser}
        />
      </div>
    </div>
  );
};

export default Row;

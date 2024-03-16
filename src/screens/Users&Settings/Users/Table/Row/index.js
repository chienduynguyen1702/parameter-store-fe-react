import React from 'react';

import cn from 'classnames';
import AvatarAndInfo from './AvatarAndInfo';
import { PopoverEditAndArchive } from '../../../../../components';

const Row = ({ item, setEditedItemId, archiveMutation }) => {
  return (
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
        {item.projects.map((item) => (
          <div className="d-flex mb-1 justify-content">
            {item.name}
          </div>
        ))}
      </div>
      <div className="tableCell">
        <div className="  ">{item.permissionsCount}</div>
      </div>
      <div className="tableCell">
        {item.roles.map((item) => (
          <div className={cn(
            "status-"+item.color,
            "mb-1 justify-content",
            )}
            >
            {item.name}
          </div>
        ))}
      </div>
      <div className="tableCell">{item.lastSignIn}</div>
      <div className="tableCell roundedRight">
        <PopoverEditAndArchive
          itemId={item.id}
          name="user"
          setEditedItemId={setEditedItemId}
          archiveMutation={archiveMutation}
        />
      </div>
    </div>
  );
};

export default Row;

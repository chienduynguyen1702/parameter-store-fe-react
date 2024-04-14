import React from 'react';
// import { Icon } from '../../../../../components';
import { useNavigate } from 'react-router';
// import cn from 'classnames';
import { PopoverEditAndArchive } from '../../../../../components';

const Row = ({ item, setEditedItemId, archiveMutation }) => {
  const navigate = useNavigate();
  return (
    <div
      className="tableRow"
      >
      <div className="tableCell py-4 ps-2 roundedLeft"
      onClick={() => navigate(`/project-detail/${item.id}`)}
      
      >
        <div className="status-default" style={{ backgroundColor: item.color }}>
          {item.name}
        </div>
      </div>
      <div className="tableCell">
        <div className="status-green-dark">{item.usersCount}</div>
      </div>
      <div className="tableCell cursor-pointer roundedRight">
        {/* <Icon name="arrow-right" size={24} /> */}

      <PopoverEditAndArchive
          itemId={item?.id}
          name="user"
          setEditedItemId={setEditedItemId}
          archiveMutation={archiveMutation}
          />
          </div>
    </div>
  );
};

export default Row;

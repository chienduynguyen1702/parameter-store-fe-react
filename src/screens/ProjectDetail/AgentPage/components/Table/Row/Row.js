import React from 'react';
import { PopoverEditAndArchive } from '../../../../../../components';

const Row = ({ item, setEditedItemId, archiveMutation }) => {
  return (
    <div className="tableRow">
      <div className="tableCell py-3 ps-2 roundedLeft">
        <p>{item.name}</p>
      </div>
      <div className="tableCell">
        <p>{item.description}</p>
      </div>
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
      <p className="tableCell">{item.last_used}</p>
      <div className="tableCell roundedRight">
        <PopoverEditAndArchive
          itemId={item.id}
          name="parameter"
          setEditedItemId={setEditedItemId}
          archiveMutation={archiveMutation}
        />
      </div>
    </div>
  );
};

export default Row;
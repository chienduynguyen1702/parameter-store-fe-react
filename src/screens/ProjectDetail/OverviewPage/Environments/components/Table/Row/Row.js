import React from 'react';
import { PopoverEditAndArchive } from '../../../../../../../components';

const Row = ({ item, setEditedItemId, archiveMutation }) => {
  return (
    <div className="tableRow">
      <div className="tableCell py-3 ps-3 roundedLeft">
        <p>{item?.name}</p>
      </div>
      <div className="tableCell">
        <p>{item?.description}</p>
      </div>
      <div className="tableCell roundedRight">
        <PopoverEditAndArchive
          itemId={item.id}
          name="environment"
          setEditedItemId={setEditedItemId}
          archiveMutation={archiveMutation}
          roleRequired="Admin"
        />
      </div>
    </div>
  );
};

export default Row;

import React from 'react';
import { PopoverEditAndArchive } from '../../../../../../components';
import moment from 'moment';

const Row = ({ item, setEditedItemId, archiveMutation }) => {
  return (
    <div className="tableRow">
      <div className="tableCell py-3 ps-2 roundedLeft">
        <p>{item?.name}</p>
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
      <div className="tableCell">
        <p>{item.workflow_name}</p>
      </div>
      <div className="tableCell">
        <p>{item.description}</p>
      </div>
      <p className="tableCell">
        {moment(item.last_used_at).format('YYYY/MM/DD HH:mm:ss')}
      </p>
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

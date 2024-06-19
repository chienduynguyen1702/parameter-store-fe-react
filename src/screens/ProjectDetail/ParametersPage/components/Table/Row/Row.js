import React from 'react';
import { PopoverEditAndArchive } from '../../../../../../components';
import moment from 'moment';

const Row = ({
  item,
  setEditedItemId,
  archiveMutation,
  isArchivedSuccess,
  roleRequired,
}) => {
  // console.log('item', item);
  // console.log('item.updatedAt', item.updatedAt);
  // console.log(
  //   'item.updatedAt moment',
  //   moment(item.updatedAt).format('yyyy/MM/DD h:mm:ss a'),
  // );
  return (
    <div className="tableRow">
      <div className="tableCell py-3 ps-2 roundedLeft">
        <p>{item.name}</p>
      </div>
      <p className="tableCell">{item.value}</p>
      <div className="tableCell">
        <p
          className="status-default"
          style={{ backgroundColor: item.environment.color }}
        >
          {item.environment.name}
        </p>
      </div>
      <div className="tableCell">
        <p
          className="status-default"
          style={{ backgroundColor: item.stage.color }}
        >
          {item.stage.name}
        </p>
      </div>
      {/* <p className="tableCell">{item.createdAt}</p> */}
      <p className="tableCell">{item.updatedAt}</p>
      <p className="tableCell">{item.isApplied.toString()}</p>
      <div className="tableCell roundedRight">
        <PopoverEditAndArchive
          itemId={item.id}
          name="parameter"
          setEditedItemId={setEditedItemId}
          archiveMutation={archiveMutation}
          isArchivedSuccess={isArchivedSuccess}
          roleRequired={roleRequired}
        />
      </div>
    </div>
  );
};

export default Row;

import React from 'react';

import cn from 'classnames';
import AvatarAndInfo from './AvatarAndInfo';
import { PopoverEditAndRemove } from '../../../../../../components';

const Row = ({ item }) => {
  return (
    <div className="tableRow ">
      <div className="tableCell py-3 ps-3 roundedLeft">{item.id}</div>
      <div className="tableCell ">{item.workflow_name}</div>
      <div className="tableCell">
        <a
          href={`${item.url_path}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.path}
        </a>
      </div>
      <div className="tableCell roundedRight">{item.state}</div>
    </div>
  );
};

export default Row;

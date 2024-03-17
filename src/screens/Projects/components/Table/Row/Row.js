import React from 'react';
import { Icon } from '../../../../../components';
import { useNavigate } from 'react-router';

const Row = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className="tableRow"
      onClick={() => navigate(`/project-detail/${item.id}`)}
    >
      <div className="tableCell py-4 ps-2 roundedLeft">
        <div className="status-default" style={{ backgroundColor: item.color }}>
          {item.name}
        </div>
      </div>
      <div className="tableCell">
        <div className="status-green-dark">{item.usersCount}</div>
      </div>
      <div className="tableCell cursor-pointer roundedRight">
        <Icon name="arrow-right" size={24} />
      </div>
    </div>
  );
};

export default Row;

import React from 'react';
import { useNavigate } from 'react-router';

import { ImageCustom } from '../../../../../../../components';

import { handleLongNumber } from '../../../../../../../utils/helpers';

const Row = ({ item }) => {
  const navigate = useNavigate();

  const handleNavigateProduct = () => {
    navigate(`/product-detail/${item.skuCode}`);
  };

  return (
    <>
      {/* Desktop */}
      <div className="tableRow" key={`row-pc-${item?.id}`}>
        <div
          className="d-table-cell tableCell py-4 roundedLeft cursor-pointer"
          onClick={handleNavigateProduct}
        >
          <div className="d-flex align-items-center">
            <ImageCustom className="me-2" width={'80px'} src={item.imageUrl} />
            <div className="textOverFlow">{item.title}</div>
          </div>
        </div>

        <div className="d-table-cell tableCell align-middle">
          <div className="d-flex align-items-center">
            <p className="status-default">
              {handleLongNumber(item.livestream)}
            </p>
          </div>
        </div>
        <div className="d-table-cell tableCell align-middle">
          <p className="status-default">{handleLongNumber(item.tiktokShow)}</p>
        </div>
        <div className="d-table-cell tableCell align-middle">
          <p className="status-default">{handleLongNumber(item.video)}</p>
        </div>
        <div className="d-table-cell tableCell align-middle roundedRight">
          <p className="status-default">{handleLongNumber(item.ecomobi)}</p>
        </div>
      </div>
      {/* Mobile */}
      {/* <div className="d-block d-sm-none pb-4 mt-3 borderBottom">
        <div>
          <div className="d-flex justify-content-between my-1 cursor-pointer">
            <p
              className="d-table-cell tableCell textOverFlow p-0"
              onClick={handleNavigateProduct}
            >
              hi
            </p>
          </div>
          <div className="d-flex justify-content-between my-1">
            <p>Hi</p>
            <p>Hi</p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Row;

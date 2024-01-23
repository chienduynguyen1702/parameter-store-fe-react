import React from 'react';

const Row = ({ item }) => {
  return (
    <div className="tableRow w-100">
      <div className="d-table-cell py-3 ps-3 pe-4 roundedLeft">
        <div className="d-flex flex-column">
          <p className="text-dark">{item?.order_name}</p>
          <p className="colorN4 fs-7">{item?.order_date}</p>
        </div>
      </div>
      {/* Delivery code */}
      <p className="d-table-cell pe-4">{item?.delivery_code}</p>
      {/* City */}
      <div className="d-table-cell pe-4">
        <p className="">{item?.city}</p>
        <p className="fs-7 fw-normal">{item?.address}</p>
      </div>
      {/* Amount */}
      <p className="d-table-cell pe-4 fw-normal">
        {item?.amount?.toLocaleString('en-US')}
      </p>
      {/* Price */}
      <p className="d-table-cell pe-4 fw-normal">
        {item?.total_price?.toLocaleString('en-US')}
      </p>
      {/* KOC */}
      <p className="d-table-cell pe-4">@{item?.koc_name}</p>
      {/* Type */}
      <div className="d-table-cell tableCell pe-4">
        {item?.type && (
          <p
            style={{
              backgroundColor:
                item?.type === 'Livestream'
                  ? '#B5E4CA'
                  : item?.type === 'show'
                  ? '#7FD3ED'
                  : '#A965C0',
              padding: '0 8px',
              borderRadius: '6px',
              color: 'white',
              fontWeight: 600,
              width: 'fit-content',
            }}
          >
            {item?.type}
          </p>
        )}
      </div>
      {/* Platform */}
      <div className="d-table-cell pe-4">
        <p
          style={{
            backgroundColor:
              item.platform === 'TikTokShop' ? '#000000' : 'rgb(255, 106, 85)',
            padding: '0 8px',
            borderRadius: '6px',
            color: 'white',
            fontWeight: 600,
            width: 'fit-content',
          }}
        >
          {item.platform}
        </p>
      </div>
    </div>
  );
};

export default Row;

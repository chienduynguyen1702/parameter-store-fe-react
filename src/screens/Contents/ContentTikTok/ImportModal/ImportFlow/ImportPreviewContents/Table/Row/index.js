import React from 'react';

const Row = ({ item }) => {
  return (
    <>
      <div className="tableRow" key={`row-pc-${item.id}`}>
        <p className="tableCell py-3 ps-3 roundedLeft">{item.video_id}</p>
        <p className="tableCell">{item.product_sku}</p>
        <p className="tableCell">{item.product_name}</p>
        {/* <p className="tableCell">{item.product_impressions}</p> */}
        {/* <p className="tableCell">{item.product_clicks}</p> */}
        {/* <p className="tableCell">{item.ctr}</p> */}
        <p className="tableCell">{item.video_revenue}</p>
        <p className="tableCell">{item.unit_sales}</p>
        <p className="tableCell">{item.orders}</p>
        <p className="tableCell">{item.buyers}</p>
        <p className="tableCell">{item.est_commission}</p>
        <p className="tableCell">{item.refunds}</p>
        <p className="tableCell">{item.product_refunds}</p>
        {/* <p className="tableCell">{item.co_rate}</p> */}
        {/* <p className="tableCell">{item.vv}</p> */}
        <div
          className="tableCell align-middle roundedRight"
          style={{ color: 'red', maxWidth: '600px' }}
        >
          {item?.errorMessages?.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Row;

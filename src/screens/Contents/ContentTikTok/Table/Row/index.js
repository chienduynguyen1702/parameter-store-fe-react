import React from 'react';
import { useNavigate } from 'react-router';

import { ContentInfo, Icon, Popover } from '../../../../../components';
import ReactTooltip from 'react-tooltip';
import { HiDotsHorizontal } from 'react-icons/hi';

const Row = ({
  item,
  onlyFailed,
  setVisibleModalPreview,
  setVideoModalPreview,
  onArchive,
}) => {
  const navigate = useNavigate();

  const openPreviewModal = () => {
    setVisibleModalPreview(true);
    setVideoModalPreview(item?.embedHtml);
  };

  const navigateToKOCProfile = () => {
    navigate(`/koc-profile/${item?.ownerId}/tiktok`);
  };
  return (
    <>
      <ReactTooltip multiline={true} data-html={true} insecure={true} />
      <div className="tableRow" key={`row-pc-${item.id}`}>
        {onlyFailed === 'false' && (
          <ContentInfo
            item={item}
            platform="TikTok"
            openPreviewModal={openPreviewModal}
            navigateToKOCProfile={navigateToKOCProfile}
          />
        )}
        {onlyFailed === 'true' && (
          <>
            <div className="tableCell align-middle  py-sm-3 ps-sm-3">
              <a
                className="status-default cursor-pointer"
                href={item?.embedLink}
                target="_blank"
                rel="noreferrer"
              >
                {item.onPlatformId}
              </a>
            </div>
            <div className="tableCell align-middle">Video ID Not Found</div>
          </>
        )}
        {onlyFailed === 'false' && (
          <>
            <div className="tableCell align-middle">
              <p
                className="status-default"
                data-tip={`Last update ${item.updatedAt}`}
                data-place={'right'}
                style={{ backgroundColor: '#bbe4ca' }}
              >
                {item.viewCount}
              </p>
            </div>
            <div className="tableCell align-middle">
              <p
                className="status-default"
                style={{ backgroundColor: '#bbe4ca' }}
              >
                {item.likeCount}
              </p>
            </div>
            <div className="tableCell align-middle">
              <p
                className="status-default"
                style={{ backgroundColor: '#bbe4ca' }}
              >
                {item.commentCount}
              </p>
            </div>
            <div className="tableCell align-middle">
              <p
                className="status-default"
                style={{ backgroundColor: '#bbe4ca' }}
              >
                {item.saveCount}
              </p>
            </div>
            <div className="tableCell align-middle">
              <p
                className="status-default"
                style={{ backgroundColor: '#bbe4ca' }}
              >
                {item.shareCount}
              </p>
            </div>
          </>
        )}
        <div className="tableCell align-middle">
          <p className="status-default" style={{ backgroundColor: '#fbd78c' }}>
            {item.revenue}
          </p>
        </div>
        <div className="tableCell align-middle">
          <p className="status-default" style={{ backgroundColor: '#fbd78c' }}>
            {item.unitSales}
          </p>
        </div>
        <div className="tableCell align-middle">
          <p className="status-default" style={{ backgroundColor: '#fbd78c' }}>
            {item.ordersCount}
          </p>
        </div>
        <div className="tableCell align-middle">
          <p className="status-default" style={{ backgroundColor: '#fbd78c' }}>
            {item.buyersCount}
          </p>
        </div>
        <div className="tableCell align-middle">
          <p className="status-default" style={{ backgroundColor: '#fbd78c' }}>
            {item.estCommissions}
          </p>
        </div>
        <div className="tableCell align-middle">
          <p className="status-default" style={{ backgroundColor: '#fbd78c' }}>
            {item.refunds}
          </p>
        </div>
        <div className="tableCell align-middle">
          <p className="status-default" style={{ backgroundColor: '#fbd78c' }}>
            {item.productRefunds}
          </p>
        </div>
        <div
          className="tableCell align-middle pe-4 roundedRight"
          key={`row-pc-dot-${item.id}`}
        >
          <Popover
            contents={[
              {
                component: (
                  <span>
                    <Icon name="trash" size={20} fill="#6f767e" />
                    <span className="font15 ms-3">Delete</span>
                  </span>
                ),
                onClick: () => {
                  onArchive(item.id);
                },
              },
            ]}
          >
            <HiDotsHorizontal />
          </Popover>
        </div>
        {/* <div className="tableCell align-middle">
          <p className="status-default" style={{ backgroundColor: '#fbd78c' }}>
            {item.coRate}
          </p>
        </div>
        <div className="tableCell align-middle">
          <p className="status-default" style={{ backgroundColor: '#fbd78c' }}>
            {item.vv}
          </p>
        </div>
        <div className="tableCell align-middle">
          <p className="status-default" style={{ backgroundColor: '#fbd78c' }}>
            {item.productImpressions}
          </p>
        </div>
        <div className="tableCell align-middle">
          <p className="status-default" style={{ backgroundColor: '#fbd78c' }}>
            {item.productClicks}
          </p>
        </div>
        <div className="tableCell align-middle">
          <p className="status-default" style={{ backgroundColor: '#fbd78c' }}>
            {item.ctr}
          </p>
        </div> */}
      </div>
      <div
        className="d-sm-none pb-4 mt-3 borderBottom"
        key={`row-mobile-${item.id}`}
      >
        {onlyFailed === 'false' && (
          <ContentInfo
            item={item}
            platform="TikTok"
            openPreviewModal={openPreviewModal}
            navigateToKOCProfile={navigateToKOCProfile}
          />
        )}
        {onlyFailed === 'true' && (
          <div className="d-flex justify-content-between my-2">
            <p className="color4">Video ID</p>
            <p className="status-default">{item.onPlatformId}</p>
          </div>
        )}
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Views</p>
          <p className="status-default">{item.viewCount}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Likes</p>
          <p className="status-default">{item.likeCount}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Comments</p>
          <p className="status-default">{item.commentCount}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Saves</p>
          <p className="status-default">{item.saveCount}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Shares</p>
          <p className="status-default">{item.shareCount}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Revenue</p>
          <p className="status-default">{item.revenue}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Units Sales</p>
          <p className="status-default">{item.unitSales}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Orders</p>
          <p className="status-default">{item.ordersCount}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Buyers</p>
          <p className="status-default">{item.buyersCount}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Est. Commissions</p>
          <p className="status-default">{item.estCommissions}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Refunds</p>
          <p className="status-default">{item.refunds}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Product Refunds</p>
          <p className="status-default">{item.productRefunds}</p>
        </div>
        {/* <div className="d-flex justify-content-between my-2">
          <p className="color4">CO Rate</p>
          <p className="status-default">{item.coRate}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">VV</p>
          <p className="status-default">{item.vv}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Product Impressions</p>
          <p className="status-default">{item.productImpressions}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Product Clicks</p>
          <p className="status-default">{item.productClicks}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">CTR</p>
          <p className="status-default">{item.ctr}</p>
        </div> */}
      </div>
    </>
  );
};

export default Row;

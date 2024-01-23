import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Row from './Row';

import {
  Pagination,
  ModalPreview,
  NoData,
  SkeletonTableContent,
  SkeletonTable,
  Modal,
  ConfirmContent,
  SortingHeader,
} from '../../../../components';

import { useQueryString } from '../../../../hooks';

const Table = ({
  listContents,
  isLoading,
  isSuccess,
  isError,
  limit,
  totalPage,
  pagination,
  deleteContentMutation,
}) => {
  const { queryString } = useQueryString();
  const { onlyFailed } = queryString;

  // Handle modal preview
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);
  const [videoModalPreview, setVideoModalPreview] = useState(null);

  const [archivingContentId, setArchivingContentId] = useState(null);

  const handleClickArchive = (id) => {
    setArchivingContentId(id);
  };

  const handleCloseConfirmArchive = () => {
    setArchivingContentId(null);
  };

  const handleArchive = async () => {
    try {
      await deleteContentMutation.mutateAsync(archivingContentId);
      toast.success('Content marked as unrelevant successfully');
    } catch (err) {
      toast.error('Marking content failed');
    }
    handleCloseConfirmArchive();
  };

  return (
    <div>
      <div className="tableOuter">
        <div className="tableContainer">
          <div className="tableHead">
            {onlyFailed === 'false' && (
              <SortingHeader
                className="ps-3 pb-3"
                title="Post"
                orderParam="create_time"
                titleTooltip="Sort by post date"
              />
            )}
            {onlyFailed === 'true' && (
              <>
                <SortingHeader
                  className=" ps-3 pb-3"
                  title="Video ID"
                  orderParam="on_platform_id"
                />
                <div className="tableCell">Error Message</div>
              </>
            )}
            {onlyFailed === 'false' && (
              <>
                <SortingHeader title="Views" orderParam="view_count" />
                <SortingHeader title="Likes" orderParam="like_count" />
                <SortingHeader title="Comments" orderParam="comment_count" />
                <SortingHeader title="Saves" orderParam="save_count" />
                <SortingHeader title="Shares" orderParam="share_count" />
              </>
            )}
            <SortingHeader title="Revenue" orderParam="revenue" />
            <SortingHeader title="Unit Sales" orderParam="unit_sales" />
            <SortingHeader title="Orders" orderParam="orders_count" />
            <SortingHeader title="Buyers" orderParam="buyers_count" />
            <SortingHeader
              title="Est. Commissions"
              orderParam="est_commission"
            />
            <SortingHeader title="Refunds" orderParam="refunds" />
            <SortingHeader
              title="Product refunds"
              orderParam="product_refunds"
            />
            {/* <div className="tableCell">CO Rate</div>
            <div className="tableCell">VV</div>
            <div className="tableCell">Product Impresssions</div>
            <div className="tableCell">Product Clicks</div>
            <div className="tableCell">CTR</div> */}
          </div>
          {isLoading && onlyFailed === 'false' && (
            <SkeletonTableContent numberCol={13} limit={limit} />
          )}
          {isLoading && onlyFailed === 'true' && (
            <SkeletonTable colsDesktop={10} limit={limit} />
          )}
          {isSuccess &&
            listContents?.map((content) => (
              <Row
                key={content.id}
                item={content}
                onlyFailed={onlyFailed}
                setVisibleModalPreview={setVisibleModalPreview}
                setVideoModalPreview={setVideoModalPreview}
                onArchive={handleClickArchive}
              />
            ))}
        </div>
        {isSuccess && listContents.length === 0 && <NoData />}
        {isError && <NoData />}
      </div>

      {((isSuccess && listContents.length !== 0) || isLoading) && (
        <Pagination pageCount={totalPage || 5} />
      )}

      <ModalPreview
        visible={visibleModalPreview}
        onClose={() => setVisibleModalPreview(false)}
        video={videoModalPreview}
        title="Preview TikTok"
      />

      <Modal visible={archivingContentId} onClose={handleCloseConfirmArchive}>
        <ConfirmContent
          title="Delete content"
          content="Are you sure you want to delete this TikTok content?"
          contentBtnSubmit="Delete"
          contentBtnCancel="Cancel"
          onClose={handleCloseConfirmArchive}
          handleSubmit={handleArchive}
          isLoading={deleteContentMutation.isLoading}
        />
      </Modal>
    </div>
  );
};

export default Table;

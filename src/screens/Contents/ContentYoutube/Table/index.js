import React, { useState, useEffect } from 'react';

import Row from './Row';
import {
  NoData,
  Pagination,
  ModalPreview,
  ContentTableHead,
  SkeletonTableContent,
} from '../../../../components';

import useListContents from '../../../../hooks/Data/useListContents';
import useSortYoutube from './useSortYoutube';

const Table = ({ className, setStatistics, setVideoCount }) => {
  // Handle modal preview
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);
  const [videoModalPreview, setVideoModalPreview] = useState(null);

  // Handle data content youtube
  const {
    listContents,
    isLoading,
    isSuccess,
    isError,
    limit,
    totalPage,
    pagination,
    statistics,
  } = useListContents('youtube');

  // When data is loaded, set statistics and video count
  useEffect(() => {
    if (isSuccess) {
      setStatistics(statistics);
      setVideoCount(pagination.total);
    } else {
      setStatistics(null);
      setVideoCount(0);
    }
  }, [isSuccess, setStatistics, statistics, pagination, setVideoCount]);

  // Handle sort
  const { summaryField, displayIcon, handleSort } = useSortYoutube();

  return (
    <div className={className}>
      <div className="tableOuter">
        <div className="tableContainer">
          <ContentTableHead
            summaryField={summaryField}
            displayIcon={displayIcon}
            handleSort={handleSort}
          />
          {isLoading && <SkeletonTableContent numberCol={3} limit={limit} />}
          {isSuccess &&
            listContents.map((content, index) => (
              <Row
                key={index}
                item={content}
                setVisibleModalPreview={setVisibleModalPreview}
                setVideoModalPreview={setVideoModalPreview}
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
        title="Preview Youtube"
      >
        <iframe
          width="80%"
          height="500"
          src={videoModalPreview}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </ModalPreview>
    </div>
  );
};

export default Table;

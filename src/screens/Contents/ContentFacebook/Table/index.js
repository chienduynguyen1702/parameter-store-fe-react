import React, { useState, useEffect } from 'react';

import Row from './Row';
import ModalPreview from '../../../../components/ModalPreview';
import {
  NoData,
  Pagination,
  ContentTableHead,
  SkeletonTableContent,
} from '../../../../components';

import useListContents from '../../../../hooks/Data/useListContents';

import useSortFacebook from './useSortFacebook';

const Table = ({ className, setStatistics, setStoriesCount }) => {
  // Handle modal preview
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);
  const [videoModalPreview, setVideoModalPreview] = useState(null);

  // Handle data content facebook
  const {
    listContents,
    isLoading,
    isSuccess,
    isError,
    limit,
    totalPage,
    statistics,
    pagination,
  } = useListContents('facebook');

  // When data is loaded, set statistics and video count
  useEffect(() => {
    if (isSuccess) {
      setStatistics(statistics);
      setStoriesCount(pagination.total);
    } else {
      setStatistics(null);
      setStoriesCount(0);
    }
  }, [isSuccess, setStatistics, statistics, pagination, setStoriesCount]);

  // Handle sort
  const { summaryField, displayIcon, handleSort } = useSortFacebook();

  return (
    <div className={className}>
      <div className="tableOuter">
        <div className="tableContainer">
          <ContentTableHead
            summaryField={summaryField}
            handleSort={handleSort}
            displayIcon={displayIcon}
          />
          {isLoading && <SkeletonTableContent numberCol={2} limit={limit} />}
          {isSuccess &&
            listContents?.map((content, index) => (
              <Row
                key={index}
                item={content}
                setVisibleModalPreview={setVisibleModalPreview}
                setVideoModalPreview={setVideoModalPreview}
              />
            ))}
        </div>
        {isSuccess && listContents.length === 0 && <NoData />}
        {isError && listContents.length === 0 && <NoData />}
      </div>

      {((isSuccess && listContents.length !== 0) || isLoading) && (
        <Pagination pageCount={totalPage || 5} />
      )}

      <ModalPreview
        visible={visibleModalPreview}
        onClose={() => setVisibleModalPreview(false)}
        video={videoModalPreview}
        title="Preview Facebook"
      >
        <img src={videoModalPreview} alt="img instagram"></img>
      </ModalPreview>
    </div>
  );
};

export default Table;

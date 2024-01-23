import React, { useState, useEffect } from 'react';

import Row from './Row';
import {
  Pagination,
  ModalPreview,
  NoData,
  ContentTableHead,
  SkeletonTableContent,
} from '../../../../components';

import useListOtherContents from '../../../../hooks/Data/useListOtherContents';
import useSortOtherContent from './useSortOtherContent';

const Table = ({ className, setStatistics, setVideoCount }) => {
  // Handle modal preview
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);
  const [videoModalPreview, setVideoModalPreview] = useState(null);

  // Handle data other content
  const {
    listContents,
    isLoading,
    isSuccess,
    isError,
    limit,
    totalPage,
    pagination,
    statistics,
  } = useListOtherContents();

  // When data is loaded, set statistics and video count
  useEffect(() => {
    if (isSuccess) {
      setStatistics(statistics);
      setVideoCount(pagination.total);
    }
  }, [isSuccess, setStatistics, statistics, pagination, setVideoCount]);

  // Handle sort
  const { displayIcon, handleSort, summaryField } = useSortOtherContent();

  return (
    <div className={className}>
      <div className="tableOuter">
        <div className="tableContainer">
          <ContentTableHead
            summaryField={summaryField}
            handleSort={handleSort}
            displayIcon={displayIcon}
          />
          {isLoading && <SkeletonTableContent numberCol={4} limit={limit} />}
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
        title="Preview Evidence"
      >
        <img className="h-100" src={videoModalPreview} alt="img evidence"></img>
      </ModalPreview>
    </div>
  );
};

export default Table;

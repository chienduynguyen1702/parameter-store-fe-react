import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { ContentInfo, ContentData } from '../../../../../components';

const Row = ({ item, setVisibleModalPreview, setVideoModalPreview }) => {
  // Default column to display in table row
  const summaryField = useMemo(() => {
    return [
      { name: 'viewCount', label: 'Views', color: '#bbe4ca' },
      { name: 'likeCount', label: 'Likes', color: '#c9beff' },
      { name: 'commentCount', label: 'Comments', color: '#f9bb98' },
    ];
  }, []);

  const navigate = useNavigate();

  const openPreviewModal = () => {
    setVisibleModalPreview(true);
    setVideoModalPreview(item?.embedHtml);
  };

  const navigateToKOCProfile = () => {
    navigate(`/koc-profile/${item?.ownerId}/youtube`);
  };

  return (
    <div className="tableRow d-block d-sm-table-row w-100 pb-4 pt-3 pb-sm-0 pt-sm-0">
      <ContentInfo
        item={item}
        platform="Youtube"
        openPreviewModal={openPreviewModal}
        navigateToKOCProfile={navigateToKOCProfile}
      />
      <ContentData summaryField={summaryField} item={item} />
    </div>
  );
};

export default Row;

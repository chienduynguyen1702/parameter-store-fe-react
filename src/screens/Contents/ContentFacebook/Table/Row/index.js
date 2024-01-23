import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { ContentInfo, ContentData } from '../../../../../components';

const Row = ({ item, setVisibleModalPreview, setVideoModalPreview }) => {
  const summaryField = useMemo(() => {
    return [
      { name: 'likeCount', label: 'Likes', color: '#bbe4ca' },
      { name: 'commentCount', label: 'Comments', color: '#c9beff' },
    ];
  }, []);

  const navigate = useNavigate();

  const openPreviewModal = () => {
    setVisibleModalPreview(true);
    setVideoModalPreview(item?.embedHtml);
  };

  const navigateToKOCProfile = () => {
    navigate(`/koc-profile/${item?.ownerId}/facebook`);
  };
  return (
    <div className="tableRow d-block d-sm-table-row w-100 pb-4 pt-3 pb-sm-0 pt-sm-0">
      <ContentInfo
        item={item}
        platform="Facebook"
        openPreviewModal={openPreviewModal}
        navigateToKOCProfile={navigateToKOCProfile}
      />

      <ContentData summaryField={summaryField} item={item} />
    </div>
  );
};

export default Row;

import React, { useState } from 'react';
import { useParams } from 'react-router';

import SkeletonKOCProfile from './Skeleton';
import {
  Decentralization,
  ModalPreview,
  ContentTikTok,
  NoData,
  Pagination,
} from '../../../../../components';

import { useListContentByKOC } from '../../../../../hooks/Data';

export default function KOCTiktok() {
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);

  const [videoModalPreview, setVideoModalPreview] = useState();

  const { id } = useParams();

  const { listContents, isSuccess, isLoading, limit, totalPage } =
    useListContentByKOC(id, 'tiktok');

  return (
    <>
      <Decentralization
        permissions={
          id === 'me' ? ['me-content-tiktok-list'] : ['content-koc-tiktok-list']
        }
      >
        {isLoading && (
          <SkeletonKOCProfile className="row gx-4 gy-5 mb-4" limit={limit} />
        )}
        {isSuccess && (
          <>
            {listContents.length ? (
              <div className="row gx-4 gy-5 mb-4">
                {listContents.map((x, index) => (
                  <ContentTikTok
                    item={x}
                    key={index}
                    withoutCheckbox
                    setVisibleModalPreview={setVisibleModalPreview}
                    setVideoModalPreview={setVideoModalPreview}
                  />
                ))}
              </div>
            ) : (
              <NoData />
            )}
            <ModalPreview
              visible={visibleModalPreview}
              onClose={() => setVisibleModalPreview(false)}
              video={videoModalPreview}
              title="Preview TikTok"
            />
          </>
        )}

        <Pagination pageCount={totalPage || 1} />
      </Decentralization>
    </>
  );
}

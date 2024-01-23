import React, { useState } from 'react';
import { useParams } from 'react-router';

import SkeletonKOCProfile from './Skeleton';
import {
  Decentralization,
  NoData,
  Pagination,
  ModalPreview,
  ContentFacebook,
} from '../../../../../components';

import { useListContentByKOC } from '../../../../../hooks/Data';

export default function KOCFacebook() {
  // const {setTiktokCount} = useContext(SocialCountContext)
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);

  const [videoModalPreview, setVideoModalPreview] = useState();

  const { id } = useParams();

  const { listContents, isSuccess, isLoading, limit, totalPage } =
    useListContentByKOC(id, 'facebook');

  return (
    <>
      <Decentralization
        permissions={
          id === 'me'
            ? ['me-content-instagram-list']
            : ['content-koc-instagram-list']
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
                  <ContentFacebook
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
              title="Preview Facebook"
            />
          </>
        )}

        <Pagination pageCount={totalPage || 1} />
      </Decentralization>
    </>
  );
}

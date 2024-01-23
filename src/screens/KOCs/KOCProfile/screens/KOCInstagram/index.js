import React, { useState } from 'react';
import { useParams } from 'react-router';

import SkeletonKOCProfile from './Skeleton';
import {
  Decentralization,
  NoData,
  Pagination,
  ModalPreview,
  ContentInstagram,
} from '../../../../../components';

import { useListContentByKOC } from '../../../../../hooks/Data';

export default function KOCInstagram() {
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);

  const [videoModalPreview, setVideoModalPreview] = useState();

  const { id } = useParams();

  const { listContents, isSuccess, isLoading, limit, totalPage } =
    useListContentByKOC(id, 'instagram');

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
          <SkeletonKOCProfile
            className="row gx-2 gy-5 mb-4"
            height={210}
            limit={limit}
          />
        )}
        {isSuccess && (
          <>
            {listContents.length ? (
              <div className="row gx-2 gy-5 mb-4">
                {listContents.map((x, index) => (
                  <ContentInstagram
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
              title="Preview Instagram"
            >
              <img src={videoModalPreview} alt="img instagram"></img>
            </ModalPreview>
          </>
        )}

        <Pagination pageCount={totalPage} />
      </Decentralization>
    </>
  );
}

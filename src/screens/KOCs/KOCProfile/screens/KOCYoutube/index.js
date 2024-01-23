import { useParams } from 'react-router';
import { useState } from 'react';

import SkeletonKOCProfile from './Skeleton';
import {
  Decentralization,
  NoData,
  Pagination,
  ModalPreview,
  ContentYoutube,
} from '../../../../../components';

import { useListContentByKOC } from '../../../../../hooks/Data';

export default function KOCYoutube() {
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);
  const [videoModalPreview, setVideoModalPreview] = useState();

  const { id } = useParams();

  const { listContents, isSuccess, isLoading, limit, totalPage } =
    useListContentByKOC(id, 'youtube');

  return (
    <>
      <Decentralization
        permissions={
          id === 'me'
            ? ['me-content-youtube-list']
            : ['content-koc-youtube-list']
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
            {listContents?.length ? (
              <div className="row gx-2 gy-5 mb-4">
                {listContents?.map((x, index) => (
                  <ContentYoutube
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
          </>
        )}
        <Pagination pageCount={totalPage || 1} />
      </Decentralization>
    </>
  );
}

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router';
import { useState } from 'react';

import cn from 'classnames';
import styles from './Youtube.module.sass';

import ModalPreview from '../../../../components/ModalPreview';
import ContentYoutube from '../../../../components/Content/ContentYoutube';
import Skeleton from '../SkeletonProductDetail';
import Decentralization from '../../../../components/Decentralization';

import { useContentsBySKU } from '../../../../hooks/Data';

export default function Youtube() {
  const [visibleModalPreview, setVisibleModalPreview] = useState(false);
  const [videoModalPreview, setVideoModalPreview] = useState();

  const { id } = useParams();

  const {
    listContents,
    isSuccess,
    isLoading,
    page,
    limit,
    totalPage,
    handlePageChange,
  } = useContentsBySKU(id, 'youtube');

  return (
    <Decentralization permissions={['product-content-youtube-list']} exact>
      <div className="px-4">
        {isLoading && (
          <Skeleton className="row gx-2 gy-5 mb-4" height={210} limit={limit} />
        )}
        {isSuccess && (
          <>
            {listContents.length ? (
              <div className="row gx-2 gy-5 mb-4">
                {listContents.map((x, index) => (
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
              <div className="d-flex justify-content-center flex-column align-items-center">
                <img
                  className={styles.imgEmpty}
                  src="https://d1j8r0kxyu9tj8.cloudfront.net/files/fXQanWaoXJtqJLvMcGICP4OSqH5m9xzfO7TLn8r6.png"
                  alt="empty"
                ></img>
                <div className="mt-3">No data</div>
              </div>
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
        <div className={styles.foot}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxSizing: 'border-box',
              width: '100%',
              height: '100%',
            }}
          >
            <ReactPaginate
              activeClassName={cn('paginate-activeClassName')}
              breakClassName={cn('paginate-breakClassName')}
              breakLabel={'...'}
              marginPagesDisplayed={2}
              paddingPagesDisplayed={2}
              pageRangeDisplayed={2}
              containerClassName={cn('paginate-containerClassName')}
              disabledClassName={cn('paginate-disabledClassName')}
              nextClassName={cn('paginate-nextClassName')}
              nextLabel={<IoIosArrowForward />}
              onPageChange={handlePageChange}
              pageCount={totalPage || 1}
              forcePage={page - 1 || 0}
              pageClassName={cn('paginate-pageClassName')}
              previousClassName={cn('paginate-previousClassName')}
              previousLabel={<IoIosArrowBack />}
            />
          </div>
        </div>
      </div>
    </Decentralization>
  );
}

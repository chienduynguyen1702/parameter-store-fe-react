import React, { useState } from 'react';
import { useParams } from 'react-router';
import ReactPaginate from 'react-paginate';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import cn from 'classnames';
import styles from './TikTok.module.sass';

import ModalPreview from '../../../../components/ModalPreview';
import Decentralization from '../../../../components/Decentralization';
import Content from '../Content';
import Skeleton from '../SkeletonProductDetail';

import { useContentsBySKU } from '../../../../hooks/Data';

export default function TikTok() {
  // const {setTiktokCount} = useContext(SocialCountContext)
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
  } = useContentsBySKU(id, 'tiktok');

  return (
    <Decentralization permissions={['product-content-tiktok-list']} exact>
      <div className="px-4">
        {isLoading && <Skeleton className="row gx-4 gy-5 mb-4" limit={limit} />}
        {isSuccess && (
          <>
            {listContents.length ? (
              <div className="row gx-4 gy-5 mb-4">
                {listContents.map((x, index) => (
                  <Content
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
              title="Preview TikTok"
            />
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
              disabledClassName={cn('paginate-item paginate-disabled')}
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

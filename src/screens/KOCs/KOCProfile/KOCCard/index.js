import React from 'react';

import cn from 'classnames';
import styles from './Profile.module.sass';

import Tag from './Tag';
import Hashtag from './Hashtag';
import { Avatar } from '../../../../components';
import Skeleton from 'react-loading-skeleton';

export default function KOCCard({ KOC }) {
  return (
    <>
      {KOC ? (
        <div className={cn(styles.profile, 'row d-flex')}>
          <div
            className={cn(styles.details, 'col-12 col-sm-5 col-lg-5 col-xxl-6')}
          >
            <div className={styles.avatar}>
              <Avatar image={KOC.avatar_url} />
            </div>
            <div className={'d-flex flex-column justify-content-start'}>
              <div className={cn('d-flex align-items-center', styles.man)}>
                <p className={cn('h4 textOverFlow', styles.nameKOC)}>
                  {KOC.username}
                </p>
                <p className={cn('ms-3 px-2 text-white', styles.btnNew)}>New</p>
              </div>
              <p className="my-1 color4">
                {KOC.email || 'Email of user goes here'}
              </p>
              <div className="color4 mb-1 d-flex">
                <p className="me-2">Bio:</p>
                {KOC.bio || 'Bio of user goes here'}
              </div>
              <Hashtag data={KOC} />
            </div>
          </div>
          <Tag data={KOC} />
        </div>
      ) : (
        <div className="d-flex justify-content-between mb-4 pb-4">
          <div className="d-flex">
            <Skeleton
              containerClassName="me-3"
              circle={true}
              width={'80px'}
              height={'80px'}
            />
            <div className="d-flex flex-column gap-2">
              <Skeleton width={'320px'} height={'32px'} />
              <Skeleton width={'240px'} height={'24px'} />
              <Skeleton width={'400px'} height={'24px'} />
            </div>
          </div>
          <div className="d-flex">
            <Skeleton
              containerClassName="me-1"
              width={'142px'}
              height={'40px'}
            />
            <Skeleton
              containerClassName="me-1"
              width={'142px'}
              height={'40px'}
            />
            <Skeleton
              containerClassName="me-1"
              width={'142px'}
              height={'40px'}
            />
            <Skeleton
              containerClassName="me-1"
              width={'142px'}
              height={'40px'}
            />
          </div>
        </div>
      )}
    </>
  );
}

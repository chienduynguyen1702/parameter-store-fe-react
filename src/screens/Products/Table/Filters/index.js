import React, { useState, useCallback, useMemo } from 'react';
import { useMatch } from 'react-router-dom';

import cn from 'classnames';
import styles from './Filters.module.sass';

import FormFilterKocs from './FormFilterKocs';
import FormFilterCalendar from './FormFilterCalendar';
import FormFilterOrder from './FormFilterOrder';
import FormFilterTiktok from './FormFilterTiktok';
import FormFilterDefault from './FormFilterDefault';

import Icon from '../../../../components/Icon';
import { ModalWithoutPortal } from '../../../../components';

const Filters = ({ className, title }) => {
  const [visible, setVisible] = useState(false);
  const invisible = useCallback((vis) => setVisible(vis), []);

  const overviewMatch = useMatch(`/product-detail/:id/overview`);
  const isOverviewMode = useMemo(() => overviewMatch !== null, [overviewMatch]);
  const tiktokMatch = useMatch(`/product-detail/:id/tiktok`);
  const isTiktokMode = useMemo(() => tiktokMatch !== null, [tiktokMatch]);
  const youtubeMatch = useMatch(`/product-detail/:id/youtube`);
  const isYoutubeMode = useMemo(() => youtubeMatch !== null, [youtubeMatch]);
  const facebookMatch = useMatch(`/product-detail/:id/facebook`);
  const isFacebookMode = useMemo(() => facebookMatch !== null, [facebookMatch]);
  const instagramMatch = useMatch(`/product-detail/:id/instagram`);
  const isInstagramMode = useMemo(
    () => instagramMatch !== null,
    [instagramMatch],
  );
  const kocsMatch = useMatch(`/product-detail/:id/kocs`);
  const isKocsMode = useMemo(() => kocsMatch !== null, [kocsMatch]);
  const contentTimelineMatch = useMatch(`/product-detail/:id/content-timeline`);
  const isContentTimelineMode = useMemo(
    () => contentTimelineMatch !== null,
    [contentTimelineMatch],
  );
  const orderMatch = useMatch(`/product-detail/:id/order`);
  const isOrderMode = useMemo(() => orderMatch !== null, [orderMatch]);
  const defaultMatch = useMatch(`/products`);
  const isDefaultMode = useMemo(() => defaultMatch !== null, [defaultMatch]);

  return (
    <div
      className={cn(styles.filters, className, { [styles.active]: visible })}
    >
      <button
        className={cn('button-square-stroke button-small', styles.head)}
        onClick={() => setVisible(true)}
      >
        <Icon name="filter" size="24" />
      </button>

      {/* Filter modal  */}
      <ModalWithoutPortal
        modalClassName="d-block"
        visible={visible}
        onClose={() => {
          invisible(false);
        }}
      >
        <div
          className={cn(styles.filters, className, {
            [styles.active]: visible,
          })}
        >
          <div>
            <div>
              <div className="mb-3">
                <div className={cn('title-red', styles.title)}>{title}</div>
              </div>
              {isKocsMode && <FormFilterKocs parentFc={invisible} />}
              {isContentTimelineMode && (
                <FormFilterCalendar parentFc={invisible} />
              )}
              {isOrderMode && <FormFilterOrder parentFc={invisible} />}
              {isTiktokMode && <FormFilterTiktok parentFc={invisible} />}
              {isYoutubeMode && <FormFilterTiktok parentFc={invisible} />}
              {isFacebookMode && <FormFilterTiktok parentFc={invisible} />}
              {isInstagramMode && <FormFilterTiktok parentFc={invisible} />}
              {isOverviewMode && <FormFilterOrder parentFc={invisible} />}
              {isDefaultMode && <FormFilterDefault parentFc={invisible} />}
            </div>
          </div>
        </div>
      </ModalWithoutPortal>
    </div>
  );
};

export default Filters;

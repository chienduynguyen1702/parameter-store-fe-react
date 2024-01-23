import React, { useState } from 'react';
import cn from 'classnames';
import styles from './Content.module.sass';
import Control from './Control';
import Checkbox from '../../Checkbox';

const ContentTikTok = ({
  item,
  value,
  onChange,
  withoutCheckbox,
  setVisibleModalPreview,
  setVideoModalPreview,
}) => {
  const [visible, setVisible] = useState(false);
  const handleClick = () => {
    onChange();
    setVisible(!visible);
  };

  const getUrlVideo = (url) => {
    setVideoModalPreview(url);
    setVisibleModalPreview(true);
  };

  return (
    <>
      <div
        className={cn(styles.product, 'col-lg-3 col-sm-6 col-12', {
          [styles.active]: visible,
        })}
      >
        <div
          className={cn(styles.preview, 'cursor-pointer')}
          onClick={() => getUrlVideo(item.embedHtml)}
        >
          {!withoutCheckbox && (
            <Checkbox
              className={styles.checkbox}
              classCheckboxTick={styles.checkboxTick}
              value={value}
              onChange={() => handleClick()}
            />
          )}
          <Control
            className={cn(styles.textAlignCenter, styles.control)}
            item={item}
          />
          <img
            src={item.coverImageUrl}
            alt="Product"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/content/not-found-image.jpg';
            }}
          />
        </div>
        <div className={styles.line}>
          <div className={styles.title}>{item.description}</div>
        </div>
        <div className="d-flex">
          <div className={cn(styles.date, 'm-0 text-nowrap')}>
            {item.timeToNow}
          </div>
          <a href={item.embedLink} target="_blank" rel="noreferrer">
            <div className={cn('cursor-pointer mt-0 text-nowrap', styles.date)}>
              ・View on TikTok{' '}
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default ContentTikTok;

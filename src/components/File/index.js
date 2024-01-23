import React from 'react';
import cn from 'classnames';
import styles from './File.module.sass';
import Icon from '../Icon';
import Tooltip from '../Tooltip';

const File = ({
  className,
  label,
  imgUrl,
  tooltip,
  setImage,
  title,
  setValue,
}) => {
  return (
    <div className={cn(styles.file, className)}>
      {label && (
        <div className={styles.label}>
          {label}{' '}
          {tooltip && (
            <Tooltip
              className={styles.tooltip}
              title={tooltip}
              icon="info"
              place="right"
            />
          )}
        </div>
      )}
      <div className={styles.wrap}>
        {imgUrl ? (
          <div className="w-100">
            <img
              className="w-100"
              src={imgUrl}
              alt="Avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-avatar.jpg';
              }}
            />
          </div>
        ) : (
          <div className={styles.box}>
            <Icon name="upload" size="24" />
            {title}
          </div>
        )}
        <input
          className={styles.input}
          type="file"
          onChange={(e) => {
            if (e.target.files[0] && setImage) {
              const file = e.target.files[0];
              const imageUrl = URL.createObjectURL(file);
              setImage(imageUrl);
            }
            setValue(e.target.files[0]);
          }}
        />
      </div>
    </div>
  );
};

export default File;

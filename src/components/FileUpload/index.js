import React from 'react';
import cn from 'classnames';
import styles from './File.module.sass';
import Icon from '../Icon';

const FileUpload = ({ className, title, setValue }) => {
  return (
    <div className={cn(styles.file, className)}>
      <label className={styles.box}>
        <Icon name="upload" size="24" />
        {title}
        <input
          className={styles.input}
          type="file"
          onChange={(e) => {
            if (e.target.files[0]) {
              const file = e.target.files[0];
              setValue(file);
            }
          }}
        />
      </label>
    </div>
  );
};

export default FileUpload;

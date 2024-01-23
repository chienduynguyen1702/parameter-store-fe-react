import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './RHFImage.module.sass';

import Avatar from '../../Avatar';
import Icon from '../../Icon';

RHFImage.propTypes = {
  name: PropTypes.string,
};

// classError, classLabel, classInput, className
function RHFImage({
  name,
  label,
  tooltip,
  defaultValue,
  setDefaultAva,
  place = 'right',
  classError,
  ...others
}) {
  const { control } = useFormContext();
  const [imageUrl, setImageUrl] = useState(null);
  const handleImage = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImageUrl(URL.createObjectURL(file));
      return file;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <>
            <div className={styles.profile}>
              <div className={styles.avatar}>
                <Avatar image={imageUrl || defaultValue} {...others} />
                {/* <button className={styles.remove}>
                  <Icon name="close" />
                </button> */}
              </div>
              <div className="d-flex row g-0">
                <div
                  className={cn(
                    styles.file,
                    'col-12 col-sm- my-1 p-0 w-auto cursor-pointer',
                  )}
                >
                  <input
                    type="file"
                    onChange={(e) => onChange(handleImage(e))}
                  />

                  <p className={cn('button me-1', styles.button)} type="button">
                    <Icon name="add" size="24" />
                    <span>Upload new picture</span>
                  </p>
                </div>
                <div className="w-auto my-1 p-0">
                  <div
                    onClick={() => {
                      setDefaultAva('');
                      setImageUrl(null);
                      onChange('');
                    }}
                    className={cn(
                      'button-white-grey-border w-auto',
                      styles.button,
                    )}
                  >
                    Remove
                  </div>
                </div>
              </div>
            </div>
            {error ? (
              <p className={cn(styles.redLine, classError)}>{error.message}</p>
            ) : (
              <p className={cn(styles.hidden, styles.redLine, classError)}>.</p>
            )}
          </>
        );
      }}
    />
  );
}

export default RHFImage;

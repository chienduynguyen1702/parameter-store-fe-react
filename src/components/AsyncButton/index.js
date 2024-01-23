import React from 'react';
import cn from 'classnames';
import styles from './AsyncButton.module.sass';
import { ThreeDots } from 'react-loader-spinner';

function AsyncButton({
  className,
  loading,
  value,
  threeDotsWidth = '40',
  threeDotsHeight = '20',
  notMaxWidth = false,
  ...others
}) {
  return (
    <>
      <button
        className={cn(
          'button',
          loading && 'disabled',
          !notMaxWidth && styles.button,
          className,
        )}
        {...others}
      >
        {loading ? (
          <ThreeDots
            width={threeDotsWidth}
            height={threeDotsHeight}
            radius="10"
          />
        ) : (
          <span>{value}</span>
        )}
      </button>
    </>
  );
}

export default AsyncButton;

import React, { useState } from 'react';
import cn from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

import styles from './Dropdown.module.sass';

import Tooltip from '../../../../../../components/Tooltip';

const DropdownCustom = ({
  className,
  classDropdownHead,
  classDropdownBody,
  classDropdownLabel,
  value,
  setValue,
  data,
  label,
  tooltip,
  small,
  upBody,
  invisibleLabel,
  disabled = false,
  ...others
}) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (option) => {
    setValue(option);
    setVisible(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      {label && (
        <div className={cn(styles.label, invisibleLabel, classDropdownLabel)}>
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
      <div
        className={cn(
          styles.dropdown,
          className,
          { [styles.small]: small },
          {
            [styles.active]: visible,
          },
        )}
      >
        <div
          className={cn(styles.head, classDropdownHead)}
          onClick={() => setVisible(!visible && !disabled)}
        >
          <div className={styles.selection}>{value.title || value}</div>
        </div>
        <div
          className={cn(styles.body, classDropdownBody, {
            [styles.bodyUp]: upBody,
          })}
        >
          {data.length > 0 ? (
            data?.map((option, index) => (
              <div
                className={cn(
                  styles.option,
                  {
                    [styles.selectioned]:
                      option.title === value.title && option.id === value.id,
                  },
                  'd-flex align-items-center',
                )}
                onClick={() => handleClick(option, index)}
                key={index}
              >
                <img
                  className="px-2 rounded-3"
                  src={option.cover_image_url}
                  alt="Cover"
                  width={50}
                />
                <p>{option.title}</p>
              </div>
            ))
          ) : (
            <p className="text-center fs-6">No data</p>
          )}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default DropdownCustom;

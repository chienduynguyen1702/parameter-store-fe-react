import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';

import cn from 'classnames';
import styles from './ColorInput.module.sass';

import { Tooltip } from '..';

function ColorInput({
  value,
  setValue,
  onBlur,
  label,
  tooltip,
  className,
  classHeader,
  classButton,
  ...others
}) {
  const [colorModal, setColorModal] = useState(false);
  const [btnColor, setBtnColor] = useState('#fff');

  const handleChange = (color) => {
    setBtnColor(color.hex);
    setColorModal(false);
    if (value !== color.hex) setValue(color.hex);
  };

  const buttonColorStyle = {
    backgroundColor: btnColor,
    cursor: 'pointer',
    height: '30px',
    width: '30px',
    borderRadius: '50%',
  };

  useEffect(() => {
    if (value) setBtnColor(value);
  }, [value]);

  return (
    <div className={className}>
      <div className={cn(styles.head, classHeader)}>
        <div className={cn('ml-1 mb-2', styles.label)}>
          {label}{' '}
          <Tooltip
            className={styles.tooltip}
            title={tooltip}
            icon="info"
            place="right"
          />
        </div>
      </div>
      <div className={cn('mb-3', classButton)}>
        <div
          style={buttonColorStyle}
          className={cn('rounded-circle border')}
          onClick={() => setColorModal(true)}
        />
        {colorModal && (
          <CirclePicker
            className="pt-3 mb-3"
            colors={[
              '#2A85FF',
              '#83BF6E',
              '#FF6A55',
              '#8E59FF',
              '#FFBC99',
              '#CABDFF',
              '#B1E5FC',
              '#B5E4CA',
              '#FFD88D',
              '#FFFFFF',
              '#FCFCFC',
              '#F4F4F4',
              '#EFEFEF',
              '#6F767E',
              '#33383F',
              '#272B30',
              '#1A1D1F',
              '#111315',
            ]}
            onChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}

export default ColorInput;

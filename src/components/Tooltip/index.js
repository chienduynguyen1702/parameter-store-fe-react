import React from 'react';
import ReactTooltip from 'react-tooltip';

import cn from 'classnames';
import styles from './Tooltip.module.sass';

import Icon from '../Icon';

const Tooltip = ({ className, title, icon, place, error }) => {
  return (
    <div className={cn(styles.tooltip, className)}>
      <span data-tip={title} data-place={place ? place : 'right'}>
        <Icon name={icon} />
      </span>
      <ReactTooltip />
    </div>
  );
};

export default Tooltip;

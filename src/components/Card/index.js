import React from 'react';
import cn from 'classnames';
import styles from './Card.module.sass';

const Card = ({
  className,
  title,
  classTitle,
  classCardHead,
  head,
  children,
}) => {
  return (
    <div className={cn(styles.card, className)}>
      {title && (
        <div
          className={cn(
            styles.head,
            'd-flex flex-wrap flex-row flex-lg-col gap-3',
            classCardHead,
          )}
        >
          <div className={cn(classTitle, styles.title, 'text-nowrap')}>
            {title}
          </div>
          {head && head}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;

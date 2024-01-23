import React from 'react';
import cn from 'classnames';

export default function Avatar({ image, className }) {
  return (
    <>
      {image ? (
        <img
          className={cn('img-fluid', className)}
          src={image}
          alt="Avatar"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/default-avatar.jpg';
          }}
        />
      ) : (
        <img
          src="/default-avatar.jpg"
          className={cn('img-fluid', className)}
          alt="Avatar"
        />
      )}
    </>
  );
}

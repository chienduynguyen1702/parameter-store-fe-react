import React from 'react';

export default function Image({
  src,
  className,
  onClick,
  alt,
  srcOnError = '/images/content/not-found-image.jpg',
  ...others
}) {
  const onError = (e) => {
    e.target.src = srcOnError;
  };

  return (
    <img
      onClick={onClick}
      className={className}
      src={src}
      onError={onError}
      alt={alt}
      {...others}
    />
  );
}

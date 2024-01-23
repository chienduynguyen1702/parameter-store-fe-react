import React, { useEffect, useState, useRef } from 'react';

import cn from 'classnames';
import styles from './Row.module.sass';

import { Row as Brow } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

const Row = ({ item, setRowIsError }) => {
  const [imageLoaded, setImageLoaded] = useState(true);
  const rowErrorRef = useRef(false); // Ref to keep track of whether the Row is in an error state

  const isNumber = (value) => {
    return Number(value) && !isNaN(value);
  };

  const handleLongNumber = (value) => {
    return isNumber(value) ? value.toLocaleString('en-US') : value;
  };

  const formatPrice = (price) => {
    if (isNumber(price)) {
      return handleLongNumber(Number(price));
    }
    return <span className={cn(styles.dataError)}>{price}</span>;
  };

  useEffect(() => {
    const isError =
      !isNumber(item?.full_price) ||
      !isNumber(item?.current_price) ||
      !imageLoaded;
    if (isError && !rowErrorRef.current) {
      // Check if the Row is in an error state and the error flag is not set
      rowErrorRef.current = true; // Set the error flag in the ref to true
      setRowIsError(true); // Set the error flag in the parent component
    } else if (!isError && rowErrorRef.current) {
      // Check if the Row is not in an error state and the error flag is set
      rowErrorRef.current = false; // Set the error flag in the ref to false
      setRowIsError(false); // Set the error flag in the parent component
    }
  }, [item, imageLoaded]);

  const onErrorImage = () => {
    // Image failed to load
    setImageLoaded(false);
  };

  return (
    <>
      <Brow className={cn(styles.row)}>
        {/* Ava and title */}
        <Col className={cn(styles.col, styles.user_col)}>
          <div className={styles.item}>
            <div
              className={cn(
                styles.imagePro,
                !imageLoaded ? styles.imageError : '',
              )}
            >
              <img
                src={
                  imageLoaded
                    ? item?.image_url
                    : '/images/content/not-found-image.jpg'
                }
                onError={onErrorImage}
                alt={item?.title}
              />
              {/* <ImageCustom src={item?.image_url} /> */}
            </div>
            <div className={styles.details}>
              <div className="d-inline-flex">
                <div className={cn(styles.user, 'pe-2')}>{item?.title}</div>
              </div>
            </div>
          </div>
        </Col>
        {/* Code */}
        <Col className={cn(styles.col)}>
          <div className={cn(styles.title)}>Code</div>
          <div className={cn(styles.mail)}>
            <div className={styles.email}>{item?.sku_code}</div>
          </div>
        </Col>
        {/* Category */}
        <Col className={cn(styles.col)}>
          <div className={cn(styles.title)}>Category</div>
          <div className={cn(styles.left, styles.tier)}>
            <div
              className={cn(styles.text_white, styles.colKoc)}
              style={{
                backgroundColor: `${item?.category?.color}`,
              }}
            >
              {item?.category?.name}
            </div>
          </div>
        </Col>
        {/* Type */}
        <Col className={cn(styles.col)}>
          <div className={cn(styles.title)}>Type</div>
          <div className={cn(styles.left, styles.platform)}>
            <div
              className={cn(styles.text_white, styles.colKoc, styles.btnPlat)}
              style={{
                backgroundColor: `${item?.type?.color}`,
              }}
            >
              {item?.type?.name}
            </div>
          </div>
        </Col>
        {/* Full price */}
        <Col className={cn(styles.col)}>
          <div className={cn(styles.title)}>Full price</div>
          <div className={cn(styles.left)}>{formatPrice(item?.full_price)}</div>
        </Col>
        {/* Current Price */}
        <Col className={cn(styles.col)}>
          <div className={cn(styles.title)}>Current Price</div>
          <div className={cn(styles.mail)}>
            <div className={styles.email}>
              {formatPrice(item?.current_price)}
            </div>
          </div>
        </Col>
        {/* Discounted Price */}
        <Col className={cn(styles.col)}>
          <div className={cn(styles.title)}>Discounted Price</div>
          <div className={cn(styles.mail)}>
            <div className={styles.email}>{item?.discounted_rate}</div>
          </div>
        </Col>
      </Brow>
    </>
  );
};

export default Row;

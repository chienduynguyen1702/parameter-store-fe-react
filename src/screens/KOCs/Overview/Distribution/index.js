import React, { useMemo } from 'react';

import cn from 'classnames';
import styles from './Distribution.module.sass';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Row as Brow } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

export default function Distribution({ data }) {
  const total = useMemo(() => {
    return data.reduce((acc, { count }) => {
      return acc + Number(count);
    }, 0);
  }, [data]);

  const sortedData = useMemo(() => {
    const dataExp = [...data];
    return dataExp.sort((a, b) => b.count - a.count);
  }, [data]);

  const convertToPercent = (value) => {
    return Math.round(value * 100);
  };

  return (
    <>
      <div className=" d-flex justify-content-around">
        {sortedData.map(({ name, color, count }, index) => {
          return (
            <OverlayTrigger
              key={index}
              delay={{ hide: 100, show: 50 }}
              overlay={
                <Tooltip place="auto" show="true">
                  <p className="text-start">{name}</p>
                  <div className="d-inline-flex align-items-center my-2 font12">
                    <div
                      className={cn(styles.square)}
                      style={{
                        backgroundColor: color,
                      }}
                    ></div>
                    <p>{`${count} (${convertToPercent(count / total)}%)`}</p>
                  </div>
                </Tooltip>
              }
            >
              <div
                className={cn(styles.bigSquare)}
                style={{
                  backgroundColor: color,
                  width: `${convertToPercent(count / total)}%`,
                }}
                key={index}
              ></div>
            </OverlayTrigger>
          );
        })}
      </div>

      <Brow className="py-1 m-0">
        {sortedData
          .map(({ name, color }, index) => {
            return (
              <Col
                className={cn(
                  styles.titleOuter,
                  'd-inline-flex justify-content-start align-items-center p-0',
                )}
                key={index}
                xs={6}
              >
                <div
                  className={styles.square}
                  style={{
                    backgroundColor: color,
                  }}
                ></div>
                <span className={cn(styles.title)}>{name}</span>
              </Col>
            );
          })
          .splice(0, 4)}
      </Brow>
    </>
  );
}

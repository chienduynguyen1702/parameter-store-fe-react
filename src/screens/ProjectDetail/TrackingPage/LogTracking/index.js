import React, { useEffect, useState } from 'react';
import styles from './Products.module.sass';
import cn from 'classnames';
import { Card, Dropdown } from '../../../../components';
import TableLog from './TableLog';
import useQueryString from '../../../../hooks/useQueryString';

// data
import { market } from '../../../../mocks/market';

// const navigation = ['All', 'Success', 'Error'];

const LogTracking = () => {
  const { queryString, setQueryString } = useQueryString();

  // useEffect(() => {
  //   if (activeTab === 'All') {
  //     const { typeTabLog, ...rest } = queryString;
  //     setQueryString(rest);
  //   } else if (activeTab === 'Success') {
  //     setQueryString({
  //       ...queryString,
  //       typeTabLog: 'success',
  //     });
  //   } else if (activeTab === 'Error') {
  //     setQueryString({
  //       ...queryString,
  //       typeTabLog: 'error',
  //     });
  //   }
  // }, [activeTab]);

  // useEffect(() => {
  //   if (!queryString.typeTabLog) {
  //     setActiveTab('All');
  //   } else {
  //     setActiveTab(queryString.typeTabLog === 'success' ? 'Success' : 'Error');
  //   }
  // }, []);

  return (
    <Card
      className={styles.card}
      title="Log Tracking"
      classTitle={cn('title-purple', styles.title)}
      classCardHead={styles.head}
      head={
        <>
          <div className={styles.control}>
            <button className={cn('button-stroke button-small', styles.button)}>
              Deleted
            </button>
            <button className={cn('button-stroke button-small', styles.button)}>
              Set status
            </button>
            <div className={styles.counter}>3 selected</div>
          </div>
          {/* <div className={cn(styles.nav, 'tablet-hide')}>
            {navigation.map((x, index) => (
              <button
                className={cn(styles.link, {
                  [styles.active]: x === activeTab,
                })}
                onClick={() => setActiveTab(x)}
                key={index}
              >
                {x}
              </button>
            ))}
          </div> */}
          {/* <div className={cn(styles.dropdown, 'tablet-show')}>
            <Dropdown
              classDropdownHead={styles.dropdownHead}
              value={activeTab}
              setValue={setActiveTab}
              options={navigation}
              small
            />
          </div> */}
        </>
      }
    >
      <div className={styles.products}>
        <div className={styles.wrapper}>
          <TableLog items={market} />
        </div>
      </div>
    </Card>
  );
};

export default LogTracking;

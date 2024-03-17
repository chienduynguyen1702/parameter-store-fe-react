import React, { useState, useEffect } from 'react';
import styles from './TableLog.module.sass';
// import cn from "classnames";
import { Icon, Pagination } from '../../../../../components';
import Filters from '../Filters';
import Row from './Row';
import Checkbox from '../Checkbox';
import useListLogger from '../../../../../hooks/useListLogger';
import { ThreeDots } from 'react-loader-spinner';
import useQueryString from '../../../../../hooks/useQueryString';
import SkeletonTable from './Skeleton';

const statusAlias = ['2xx', '3xx', '4xx', '5xx'];
const sortByTime = ['asc', 'desc'];

const TableLog = ({ items }) => {
  const { queryString, setQueryString } = useQueryString();

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [visible, setVisible] = useState(false);
  const [indexSort, setIndexSort] = useState(1);

  const { listLoggers, isSuccess, isLoading, totalPage } = useListLogger();

  const checkSelected = (id) => {
    return selectedFilters.includes(id);
  };

  useEffect(() => {
    if (queryString?.responseStatus) {
      const responseStatus = queryString.responseStatus.map((x) =>
        statusAlias.indexOf(x),
      );
      setSelectedFilters(responseStatus);
    }
    if (queryString?.sortByTime) {
      setIndexSort(sortByTime.indexOf(queryString.sortByTime));
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setVisible(false);
    }
  }, [isSuccess]);

  const handleChange = (id) => {
    if (checkSelected(id)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== id));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, id]);
    }
  };

  const handleTableFilter = () => {
    console.log(queryString.responseStatus);
    if (queryString.responseStatus) {
      console.log('params', [queryString.responseStatus]);
      delete queryString.responseStatus;
    }
    if (selectedFilters.length !== 0) {
      console.log('selected filters', selectedFilters, selectedFilters.length);
      const responseStatus = selectedFilters?.map((x) => statusAlias[x]);
      setQueryString({
        ...queryString,
        responseStatus,
      });
    } else setQueryString(queryString);
  };

  const handleSortByTime = () => {
    setIndexSort(indexSort === 0 ? 1 : 0);
    setQueryString({ ...queryString, sortByTime: sortByTime[indexSort] });
  };

  return (
    <div className={styles.market}>
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.col}>
            Time
            <div
              className={styles.icon_container}
              onClick={() => handleSortByTime()}
            >
              <Icon name="arrows-up-down" size="16" fill="#6F767E" />
            </div>
          </div>
          <div className={styles.col}>User</div>
          <div className={styles.col}>Screen</div>
          <div className={styles.col}>Endpoint</div>
          <div className={styles.col}>Method</div>
          <div className={styles.col}>
            Response Status
            <div className={styles.icon_container}>
              {/* <Icon name="filter" size="16" fill="#6F767E" /> */}
              <Filters
                className={styles.filters}
                visible={visible}
                setVisible={setVisible}
              >
                {statusAlias.map((x, index) => (
                  <Checkbox
                    className={styles.checkbox}
                    value={checkSelected(index)}
                    onChange={() => handleChange(index)}
                    content={x}
                    isTickSpace={true}
                    key={index}
                  />
                ))}
                <button
                  className="button"
                  style={{ width: '100%', height: '30px' }}
                  onClick={() => handleTableFilter()}
                >
                  {isLoading ? (
                    <ThreeDots width={50} height={32} />
                  ) : (
                    <span>OK</span>
                  )}
                </button>
              </Filters>
            </div>
          </div>
          <div className={styles.col}>Latency</div>
        </div>
        {isLoading && <SkeletonTable />}

        {listLoggers?.map((x, index) => (
          <Row
            item={x}
            key={index}
            up={items.length - index <= 2}
            value={selectedFilters.includes(x.id)}
            onChange={() => handleChange(x.id)}
          />
        ))}
      </div>
      {/* {isSuccess && listLoggers.length === 0 && <NoData />} */}
      {((isSuccess && listLoggers.length !== 0) || isLoading) && (
        <Pagination pageCount={totalPage || 5} />
      )}
    </div>
  );
};

export default TableLog;

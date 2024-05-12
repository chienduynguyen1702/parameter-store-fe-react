import React from 'react';
import styles from './TrackingAnalytics.module.sass';
import LogTracking from './LogTracking';
import FormFilter from './FormFilter';
import TrackingFilter from './TrackingFilter';

const TrackingPage = () => {
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  return (
    <>
      <div className={styles.filter}>
        <TrackingFilter>
          <FormFilter />
        </TrackingFilter>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <LogTracking />
        </div>
      </div>
    </>
  );
};

export default TrackingPage;

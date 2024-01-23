import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';

import cn from 'classnames';
import styles from './Overview.module.sass';

import Card from '../../../components/Card';
import Icon from '../../../components/Icon';
import Tooltip from '../../../components/Tooltip';
import Balance from '../../../components/Balance';

import Distribution from './Distribution';

import { getKOCSummary } from '../../../services/api';

const Overview = ({ className }) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['koc-summary'],
    queryFn: getKOCSummary,
    select: (data) => data.data.data,
  });

  const items = useMemo(() => {
    return [
      {
        title: 'Total KOCs',
        counter: isSuccess ? data.totalUsers : 0,
        icon: 'profile-circle',
        color: '#B1E5FC',
        tooltip: 'Number of total KOCs registered',
        value: 32,
      },
      {
        title: 'Tier Distribution',
        counter: null,
        icon: 'star-fill',
        color: '#B5E4CA',
        tooltip: 'Ratio of KOCs across Tier',
        data: isSuccess ? data.tierStats : [],
      },
      {
        title: 'Platform Distribution',
        counter: null,
        icon: 'cast',
        color: '#CABDFF',
        tooltip: 'Ratio of KOCs across Platform',
        data: isSuccess ? data.platformStats : [],
      },
      {
        title: 'Category Distribution',
        counter: null,
        icon: 'messages',
        color: '#FFBC99',
        tooltip: 'Ratio of KOCs across Category',
        data: isSuccess ? data.categoryStats : [],
      },
    ];
  }, [
    data?.categoryStats,
    data?.platformStats,
    data?.tierStats,
    data?.totalUsers,
    isSuccess,
  ]);

  return (
    <>
      <Card
        className={cn(styles.card, className, 'px-0 h-100')}
        classTitle="title-red"
      >
        <div className={cn(styles.list)}>
          <div className={cn(styles.outer)}>
            {items.map((x, index) => (
              <div className={cn(styles.item)} key={index}>
                <div
                  className={styles.icon}
                  style={{ backgroundColor: x.color }}
                >
                  <Icon
                    className={cn(styles.iconInner)}
                    name={x.icon}
                    size="24"
                  />
                </div>
                <div className={styles.details}>
                  <div className={styles.label}>
                    {x.title}
                    <Tooltip
                      className={styles.tooltip}
                      title={x.tooltip}
                      icon="info"
                      place="top"
                    />
                  </div>
                  {x.counter ? (
                    <>
                      {isLoading && <Skeleton width={100} height={30} />}
                      {isSuccess && (
                        <>
                          <div className={styles.counter}>{x.counter}</div>
                          {/* <div className={styles.indicator}>
                            <Balance
                              className={styles.balance}
                              value={x.value}
                            />
                            <span>this week</span>
                          </div> */}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {isLoading && <Skeleton width={100} height={30} />}
                      {isSuccess && <Distribution data={x.data || []} />}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
};

export default Overview;

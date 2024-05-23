import moment from 'moment';
import { Card, SummaryCardCustom } from '../../../components';

import cn from 'classnames';
import styles from './SummaryCard.module.sass';

import useQueryString from '../../../hooks/useQueryString';

const splitItems = (items) => {
  const mid = Math.ceil(items.length / 2);
  const firstRow = items.slice(0, mid);
  const secondRow = items.slice(mid);
  return { firstRow, secondRow };
};
export default function SummaryCard({ counters }) {
  // console.log('counters', counters);
  const { queryString } = useQueryString();
  const { from, to } = queryString;

  const dateFrom = moment(from).format('DD/MM/YYYY');
  const dateTo = moment(to).format('DD/MM/YYYY');

  const items = counters?.map((x) => {
    return {
      icon: x?.icon,
      title: x?.title,
      tooltip: x?.tooltip,
      // value : x?.value,
    };
  });
  const { firstRow, secondRow } = splitItems(items);
  return (
    <Card
      title={`Summary Information`}
      classTitle="title-blue"
      className={cn('mb-5', styles.card)}
    >
      <div className="d-flex justify-content-around">
        {firstRow.map((x, index) => (
          <div
            key={index}
            className={cn(
              'col-12 col-sm-6 col-md-2.5 col-lg-2dot4',
              styles.item,
            )}
          >
            <SummaryCardCustom
              data={x}
              counter={counters[index].value}
              index={index}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-around">
        {secondRow.map((x, index) => (
          <div
            key={index + firstRow.length}
            className={cn(
              'col-12 col-sm-6 col-md-2.5 col-lg-2dot4',
              styles.item,
            )}
          >
            <SummaryCardCustom
              data={x}
              counter={counters[index + firstRow.length].value}
              index={index + firstRow.length}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}

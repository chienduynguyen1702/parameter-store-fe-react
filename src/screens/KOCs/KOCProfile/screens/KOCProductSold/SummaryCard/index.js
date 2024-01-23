import { SummaryCardCustom } from '../../../../../../components';

import cn from 'classnames';
import styles from './SummaryCard.module.sass';

export default function SummaryCard({ counters }) {
  const items = [
    {
      icon: 'dashboard-live-purple',
      title: 'TikTok Shop Livestream',
      tooltip: `TikTok Shop Livestream`,
    },
    {
      icon: 'dashboard-storage-bag-orange',
      title: 'TikTok Shop Show',
      tooltip: `TikTok Shop Show`,
    },
    {
      icon: 'dashboard-camera-blue',
      title: 'TikTok Shop Video',
      tooltip: `TikTok Shop Video`,
    },

    {
      icon: 'store-orange',
      title: 'Ecomobi',
      tooltip: `Ecomobi`,
    },
  ];

  return (
    <>
      <div className="row my-3">
        {items.map((x, index) => (
          <div className={cn('col-12 col-sm-6 col-lg-3', styles.item)}>
            <SummaryCardCustom
              data={x}
              counter={counters?.[index]}
              index={index}
            />
          </div>
        ))}
      </div>
    </>
  );
}

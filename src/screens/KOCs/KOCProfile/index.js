import React from 'react';
import { Outlet } from 'react-router';

import styles from './KOCProfile.module.sass';

import KOCCard from './KOCCard';
import { Card } from '../../../components';
import Navbar from './Navbar';
import FormFilter from './FormFilter';

import { Decentralization, FiltersCustom } from '../../../components';

import useKOCInfo from './useKOCInfo';

export default function KOCProfile() {
  const { id, data, enabledFilter } = useKOCInfo();

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <img src="/images/content/bg-shop.jpg" alt="Background" />
      </div>
      <Decentralization
        permissions={id === 'me' ? ['me-one'] : ['content-koc-tiktok-list']}
      >
        <Card className={styles.card}>
          <KOCCard KOC={data} />
          <div className={styles.nav}>
            <Navbar />
            {enabledFilter && (
              <FiltersCustom>
                <FormFilter />
              </FiltersCustom>
            )}
          </div>

          <Outlet />
        </Card>
      </Decentralization>
    </div>
  );
}

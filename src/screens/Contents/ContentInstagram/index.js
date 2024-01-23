import React, { useState } from 'react';

import {
  ButtonExport,
  Card,
  Decentralization,
  FiltersCustom,
  FormSearch,
} from '../../../components';
import Table from './Table';
import Overview from '../components/Overview';
import Filter from '../components/Filter';

import useExport from '../../../hooks/Export/useExport';

export default function ContentInstagram() {
  // Statistics Data to display in Overview component
  const [statistics, setStatistics] = useState(null);

  // Videos count to display in Card component
  const [videosCount, setVideoCount] = useState(0);

  const { handleClickExport, isLoadingExport } = useExport({
    exportedObject: 'instagramContents',
  });

  return (
    <Decentralization
      permissions={['content-instagram-list', 'content-instagram-export']}
    >
      <Card
        title={videosCount + ' Videos'}
        classTitle="title-purple"
        classCardHead="d-flex flex-wrap gap-3"
        head={
          <>
            <FormSearch placeholder="Search by description" />
            <div className="d-flex">
              <FiltersCustom className="me-2">
                <Filter />
              </FiltersCustom>
              <Decentralization permissions={['content-tiktok-export']}>
                <ButtonExport
                  isLoading={isLoadingExport}
                  handleClickExport={handleClickExport}
                />
              </Decentralization>
            </div>
          </>
        }
      >
        <Decentralization permissions={['content-instagram-list']}>
          <Overview statistics={statistics} />
          <Table setStatistics={setStatistics} setVideoCount={setVideoCount} />
        </Decentralization>
      </Card>
    </Decentralization>
  );
}

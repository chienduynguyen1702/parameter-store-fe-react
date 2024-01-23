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

import useExportOtherContent from '../../../hooks/Export/useExportOtherContent';

export default function OtherContent() {
  // Statistics Data to display in Overview component
  const [statistics, setStatistics] = useState(null);

  // Videos count to display in Card component
  const [videosCount, setVideoCount] = useState(0);

  const { handleClickExport, isLoadingExport } = useExportOtherContent();

  return (
    <Decentralization permissions={['content-other-list']}>
      <Card
        title={videosCount + ' Videos'}
        classTitle="title-purple"
        classCardHead="d-flex flex-wrap gap-3"
        head={
          <>
            <FormSearch placeholder="Search by hashtag or description" />
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
        <Decentralization permissions={['content-other-list']}>
          <Overview statistics={statistics} />
          <Table setStatistics={setStatistics} setVideoCount={setVideoCount} />
        </Decentralization>
      </Card>
    </Decentralization>
  );
}

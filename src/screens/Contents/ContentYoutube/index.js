import React, { useState } from 'react';

import {
  Card,
  Decentralization,
  FormSearch,
  FiltersCustom,
  ButtonExport,
} from '../../../components';

import Table from './Table';
import Overview from '../components/Overview';

import Filter from '../components/Filter';
import useExport from '../../../hooks/Export/useExport';

export default function ContentYoutube() {
  const [statistics, setStatistics] = useState(null);

  const [videosCount, setVideoCount] = useState(0);

  const { handleClickExport, isLoadingExport } = useExport({
    exportedObject: 'youtubeContents',
  });

  return (
    <Decentralization
      permissions={['content-youtube-list', 'content-youtube-export']}
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
        <Decentralization permissions={['content-youtube-list']}>
          <Overview statistics={statistics} />
          <Table setStatistics={setStatistics} setVideoCount={setVideoCount} />
        </Decentralization>
      </Card>
    </Decentralization>
  );
}

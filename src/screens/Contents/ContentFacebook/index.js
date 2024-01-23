import React, { useState } from 'react';

import {
  Card,
  Decentralization,
  FormSearch,
  FiltersCustom,
  ButtonExport,
} from '../../../components';

import Table from './Table';
import Filter from '../components/Filter';
import Overview from '../components/Overview';

import useExport from '../../../hooks/Export/useExport';

export default function ContentFacebook() {
  // Statistics Data to display in Overview component
  const [statistics, setStatistics] = useState(null);

  // Videos count to display in Card component
  const [storiesCount, setStoriesCount] = useState(0);

  const { handleClickExport, isLoadingExport } = useExport({
    exportedObject: 'facebookContents',
  });

  return (
    <Decentralization
      permissions={['content-facebook-list', 'content-facebook-export']}
    >
      <Card
        title={storiesCount + ' Videos'}
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
                  handleClickExport={handleClickExport}
                  isLoading={isLoadingExport}
                />
              </Decentralization>
            </div>
          </>
        }
      >
        <Decentralization permissions={['content-facebook-list']}>
          <Overview statistics={statistics} />
          <Table
            setStatistics={setStatistics}
            setStoriesCount={setStoriesCount}
          />
        </Decentralization>
      </Card>
    </Decentralization>
  );
}

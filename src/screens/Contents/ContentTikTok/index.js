import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

import styles from './ContentTiktok.module.sass';
import cn from 'classnames';

import {
  Card,
  FiltersCustom,
  FormSearch,
  Decentralization,
  ButtonExport,
} from '../../../components';

import Overview from '../components/Overview';
import Filter from '../components/Filter';

import { ImportModal } from './ImportModal';
import Table from './Table';
import ButtonSwitchContentsAndFailedContents from './ButtonSwitchContentsAndFailedContents';
import ForceUpdateButton from './ForceUpdateButton';

import useExport from '../../../hooks/Export/useExport';
import { useQueryString } from '../../../hooks';
import {
  useContentsSummary,
  useForceUpdateContent,
  useListContents,
} from '../../../hooks/Data';

export default function ContentTikTok() {
  const { queryString } = useQueryString();
  const { onlyFailed } = queryString;

  const [progress, setProgress] = useState(0);

  const { handleClickExport, isLoadingExport } = useExport({
    exportedObject:
      onlyFailed === 'false' ? 'tiktokContents' : 'failedTiktokContents',
  });

  const {
    forceUpdateContentOfBrandMutation,
    isUpdatingContent,
    lastTimeUpdate,
    cancelForceUpdateContentOfBrandMutation,
    forceUpdateProgress,
  } = useForceUpdateContent();

  useEffect(() => {
    if (forceUpdateProgress) setProgress(forceUpdateProgress);
  }, [forceUpdateProgress]);

  const handleUpdate = async () => {
    try {
      await forceUpdateContentOfBrandMutation.mutateAsync();
      toast.info('Updating...');
    } catch {
      toast.error('Force update failed');
    }
  };

  const handleCancelForceUpdate = () => {
    cancelForceUpdateContentOfBrandMutation.mutate(null, {
      onSuccess: () => {
        toast.info('Cancelled Updating Content.');
      },
    });
  };

  const { data: dataOverview } = useContentsSummary('tiktok');

  const {
    listContents,
    isLoading,
    isSuccess,
    isError,
    limit,
    totalPage,
    pagination,
    deleteContentMutation,
  } = useListContents('tiktok');

  return (
    <>
      <div className={cn('d-flex flex-column mb-4')}>
        <div className="d-flex gap-2 justify-content-between align-items-center">
          <h3 className={cn('h3', styles.title)}>TikTok</h3>

          <div>
            <div className={cn(styles.timestamp)}>
              <div>Last updated:</div>
              <span>
                {lastTimeUpdate ? moment(lastTimeUpdate).format('LLLL') : '--'}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-between align-items-center">
          <div className="d-flex gap-2">
            <ImportModal />
          </div>

          <div className="d-flex gap-2">
            <ForceUpdateButton
              isUpdatingContent={isUpdatingContent}
              progress={progress}
              handleCancelForceUpdate={handleCancelForceUpdate}
              handleUpdate={handleUpdate}
            />
          </div>
        </div>
      </div>

      <Decentralization
        permissions={['content-tiktok-list', 'content-tiktok-export']}
      >
        <Card
          title={
            (pagination?.total
              ? pagination?.total?.toLocaleString('en-US')
              : 0) + ' Videos'
          }
          classTitle="title-purple"
          classCardHead="d-flex flex-wrap gap-3"
          head={
            <>
              {onlyFailed === 'false' ? (
                <FormSearch placeholder="Search by description" />
              ) : (
                <div className="me-auto"></div>
              )}
              <div className="d-flex">
                {onlyFailed === 'false' && (
                  <FiltersCustom className="me-2">
                    <Filter />
                  </FiltersCustom>
                )}
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
          <Decentralization permissions={['content-tiktok-list']}>
            <ButtonSwitchContentsAndFailedContents />
            {onlyFailed === 'false' && <Overview statistics={dataOverview} />}
            <Table
              listContents={listContents}
              isLoading={isLoading}
              isSuccess={isSuccess}
              isError={isError}
              limit={limit}
              totalPage={totalPage}
              pagination={pagination}
              deleteContentMutation={deleteContentMutation}
            />
          </Decentralization>
        </Card>
      </Decentralization>
    </>
  );
}

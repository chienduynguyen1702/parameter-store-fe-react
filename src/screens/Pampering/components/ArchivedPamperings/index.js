import React from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { ThreeDots } from 'react-loader-spinner';

import cn from 'classnames';
import styles from './ArchivedPamperings.module.sass';

import { Avatar, Form } from '../../../../components';
import Popover from '../../../../components/Popover';

import SkeletonArchivedPamperings from './Skeleton';

import { fromNow } from '../../../../utils/helpers';

import { useArchivedPampering } from '../../../../hooks/Archived';

export default function ArchivedPamperings() {
  // ArchivedPamperings Query
  const {
    archivedPamperings,
    isSuccess,
    isLoading,
    search,
    handleSearch,
    unarchivePamperingMutation,
  } = useArchivedPampering();

  const handleUnarchivePampering = (id) => {
    unarchivePamperingMutation.mutate(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {/* Search Archived Pamperings */}
      <Form
        value={search}
        setValue={handleSearch}
        className={cn(styles.form, styles.archived_kocs)}
        placeholder="Search archived pamperings"
        type="text"
        name="search"
        icon="search"
        onSubmit={handleSubmit}
      />
      {/* Archived Pamperings */}
      <div className={cn(styles.scroll)}>
        {isLoading && <SkeletonArchivedPamperings limit={8} />}
        {isSuccess &&
          archivedPamperings.map((item) => (
            <div className={styles.item} key={item.id}>
              <div className={styles.details}>
                <div className={styles.avatar}>
                  <Avatar image={item.evidenceUrl} />
                </div>
                <div>
                  <div className={styles.koc}>{item.name}</div>
                  <div className={styles.information}>{`Archived by ${
                    item.archiverName
                  } ${fromNow(item.archivedAt)}`}</div>
                </div>
              </div>
              <div className={styles.actions}>
                <Popover
                  contents={[
                    {
                      component: (
                        <div
                          className={cn({
                            [styles.threeDots]:
                              unarchivePamperingMutation.isLoading,
                          })}
                          onClick={() => handleUnarchivePampering(item.id)}
                        >
                          {unarchivePamperingMutation.isLoading && (
                            <ThreeDots width="40" height="20" radius="10" />
                          )}
                          {!unarchivePamperingMutation.isLoading && (
                            <>
                              <AiOutlineReload size={18} />
                              <span className={cn(styles.font15, ' ms-3')}>
                                Unarchive
                              </span>
                            </>
                          )}
                        </div>
                      ),
                      sleepTime: '500',
                    },
                  ]}
                >
                  <BsChevronDown className={styles.btn} />
                </Popover>
              </div>
            </div>
          ))}
        {isSuccess && archivedPamperings.length === 0 && (
          <div className={styles.archivedList}>No Archived Pamperings</div>
        )}
      </div>
    </>
  );
}

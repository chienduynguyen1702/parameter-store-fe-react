import React, { useState } from 'react';
import Icon from '../Icon';
import { BiArchiveIn } from 'react-icons/bi';
import Skeleton from 'react-loading-skeleton';

import cn from 'classnames';
import styles from './Archived.module.sass';

import Form from '../Form';
import ArchivedItem from './ArchivedItem';
import NoDataArchived from './NoDataArchived';

const Archived = ({
  className,
  classNameBtn,
  title,
  name,
  archivedList,
  isSuccess,
  isLoading,
  search,
  handleSearch,
  unarchiveMutation,
}) => {
  const [visible, setVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={cn(styles.archived, className, { [styles.active]: visible })}
    >
      <button
        className={cn(styles.btnArchive, classNameBtn)}
        onClick={() => setVisible(true)}
      >
        <span className="me-1">Archived</span>
        <BiArchiveIn className="mb-0" size={20} />
      </button>
      <div className={styles.body}>
        <div className={styles.top}>
          <div className={cn('title-red', styles.title)}>{title}</div>
          <button className={styles.close} onClick={() => setVisible(false)}>
            <Icon name="close" size="20" />
          </button>
        </div>
        {visible && (
          <>
            <Form
              value={search}
              setValue={handleSearch}
              onSubmit={handleSubmit}
              className="archiverSearch"
              placeholder={`Search archived ${name}`}
            />
            <div className="archiverScroll">
              {isLoading && <Skeleton height={60} count={6} className="mb-2" />}
              {isSuccess &&
                (archivedList?.length > 0 ? (
                  archivedList?.map((item, index) => (
                    <ArchivedItem
                      key={index}
                      item={item}
                      havingImage
                      handleUnarchive={(id) => unarchiveMutation.mutate(id)}
                      isLoading={unarchiveMutation.isLoading}
                    />
                  ))
                ) : (
                  <NoDataArchived />
                ))}
            </div>
          </>
        )}
      </div>
      <div className={styles.overlay} onClick={() => setVisible(false)}></div>
    </div>
  );
};

export default Archived;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import styles from './Row.module.sass';

import {
  ConfirmContent,
  Modal,
  PopoverEditPlatform,
  PopoverEditSetting,
  Avatar,
} from '../../../../components';

import useRow from './useRow';
import PopoverEditItem from './PopoverEditItem';

const Row = ({ item, platformList, categoryList, tierList }) => {
  const [isConfirmMode, setIsConfirmMode] = useState(false);

  const { isLoadingArchive, handleArchiveUser, handleUpdateTPC } = useRow({
    item,
  });

  return (
    <>
      <Modal
        visible={isConfirmMode}
        onClose={() => setIsConfirmMode(false)}
        key={`row-pc-modal-${item.id}`}
      >
        <ConfirmContent
          title="Confirm"
          content="Are you sure you want to archive this user?"
          contentBtnSubmit="Archive"
          contentBtnCancel="Cancel"
          isLoading={isLoadingArchive}
          onClose={() => setIsConfirmMode(false)}
          handleSubmit={() => handleArchiveUser(item.id)}
        />
      </Modal>
      {/* PC */}
      <div className="tableRow" key={`row-pc-${item.id}`}>
        {/* Name */}
        <div className={cn('d-table-cell tableCell py-3 ps-3 roundedLeft')}>
          <div className="d-flex">
            <Link
              to={`/koc-profile/${item.id}`}
              target="_blank"
              className={cn(styles.avatar)}
            >
              <Avatar image={item.avatarUrl} />
            </Link>
            <div className="lh-lg overFlowHidden flex-grow-1 pe-4 d-flex flex-column justify-content-center">
              <div className="d-flex ">
                <Link
                  to={`/koc-profile/${item.id}`}
                  target="_blank"
                  className="text-dark textOverFlow me-2"
                >
                  {item.username}
                </Link>
                {item?.isNew && <div className="status-new">New</div>}
              </div>
              <a className={styles.phoneNumber} href={`tel:+${item.phone}`}>
                {item.phone}
              </a>
            </div>
          </div>
        </div>
        {/* Mail */}
        {/* <div className="d-table-cell tableCell textOverFlow">{item.email}</div> */}
        <div className="tableCell">
          <p className="status-default">{item.totalFollowers}</p>
        </div>
        <div className="tableCell">
          <p className="status-default">{item.totalVideos}</p>
        </div>
        <div className="tableCell">
          <p className="status-default">{item.totalLikesOfVideos}</p>
        </div>
        {/* Tier */}
        <div className="d-table-cell tableCell">
          <PopoverEditSetting
            handleUpdate={handleUpdateTPC}
            name="user-tier"
            setting={item?.tier}
            listSettings={tierList?.data}
          />
        </div>
        {/* Platform */}
        <div className="d-table-cell tableCell">
          <PopoverEditPlatform
            name="user-platform"
            platforms={item?.platforms}
            listPlatforms={platformList?.data}
            handleUpdate={handleUpdateTPC}
          />
        </div>
        {/* Category */}
        <div className="d-table-cell tableCell">
          <PopoverEditSetting
            name="user-category"
            setting={item?.category}
            listSettings={categoryList?.data}
            handleUpdate={handleUpdateTPC}
          />
        </div>
        {/* Three dot */}
        <div
          className="d-table-cell tableCell pe-3 roundedRight"
          key={`row-pc-dot-${item.id}`}
        >
          <PopoverEditItem id={item.id} setIsArchiveMode={setIsConfirmMode} />
        </div>
      </div>
      {/* Mobile  */}
      <div
        className="d-sm-none pb-4 mt-3 borderBottom"
        key={`row-mobile-${item.id}`}
      >
        <div className="d-flex justify-content-between mb-4">
          <div className="d-flex">
            <div className={cn(styles.avatar, 'me-2')}>
              <Avatar image={item.avatarUrl} className="imgCover" />
            </div>
            <div>
              <div className="d-flex">
                <Link
                  to={`/koc-profile/${item.id}/tiktok`}
                  className="textOverFlow me-2 text-dark"
                >
                  {item.username}
                </Link>
                {item?.isNew && <div className="status-new">New</div>}
              </div>
              <div className="color4 my-1">{item.phone}</div>
              {/* Tier */}
              <PopoverEditSetting
                handleUpdate={handleUpdateTPC}
                name="user-tier"
                setting={item?.tier}
                listSettings={tierList?.data}
              />
            </div>
          </div>
          <div>
            <PopoverEditItem id={item.id} setIsArchiveMode={setIsConfirmMode} />
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Email</p>
          <p>{item.email}</p>
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4 me-4">Platform</p>
          <PopoverEditPlatform
            name="user-platform"
            platforms={item?.platforms}
            listPlatforms={platformList?.data}
            handleUpdate={handleUpdateTPC}
          />
        </div>
        <div className="d-flex justify-content-between my-2">
          <p className="color4">Category</p>
          <p>
            <PopoverEditSetting
              name="user-category"
              setting={item?.category}
              listSettings={categoryList?.data}
              handleUpdate={handleUpdateTPC}
            />
          </p>
        </div>
      </div>
    </>
  );
};

export default Row;

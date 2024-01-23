import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiFillEdit } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';

import cn from 'classnames';
import styles from './Row.module.sass';

import { dateToUrl } from '../../../../../../utils/helpers';

import Popover from '../../../../../../components/Popover';
import {
  ConfirmContent,
  Modal,
  PopoverEditSetting,
  Decentralization,
  Avatar,
} from '../../../../../../components';

import { editOtherContents } from '../../../../../../services/api';

import { handleLongNumber } from '../../../../../../utils/helpers';

export default function Row({
  item,
  archiveOtherContentMutation,
  deleteOtherContentMutation,
  platformList,
  typeList,
  onVisibleOtherContentView,
  setIdItem,
  setVisibleModalPreview,
  setVideoModalPreview,
}) {
  const queryClient = useQueryClient();
  const getUrlImage = (url) => {
    setVideoModalPreview(url);
    setVisibleModalPreview(true);
  };
  // Handle Confirm Modal
  const [isConfirmMode, setIsConfirmMode] = useState(false);

  const [isConfirmDeleteMode, setIsConfirmDeleteMode] = useState(false);
  // Archived OtherContent
  const handleArchiveOtherContent = (id) => {
    setIsConfirmMode(false);
    archiveOtherContentMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['otherContents'],
        });
        toast.success('OtherContent archived successfully');
      },
    });
  };

  //delete OtherContent
  const handleDeleteOtherContent = (id) => {
    setIsConfirmDeleteMode(false);
    deleteOtherContentMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['otherContents'],
        });
        toast.success('OtherContent delete successfully');
      },
    });
  };

  // Edit OtherContent
  const editOtherContentMutation = useMutation(({ id, data }) => {
    return editOtherContents(id, data);
  });

  // Update KOC (Tier, Category) Mutation
  const handleUpdateTPC = (newSetting, type) => {
    const body = {
      setting_type: item?.type?.name,
      setting_platform: item?.platforms?.name,
    };

    if (type === 'user-type') {
      if (item?.type?.name === newSetting) {
        body['setting_type'] = null;
      } else body['setting_type'] = newSetting;
    } else if (type === 'user-platform') {
      if (item?.platforms?.name === newSetting) {
        body['setting_platform'] = null;
      } else body['setting_platform'] = newSetting;
    }

    return editOtherContentMutation.mutate(
      { id: item.id, data: body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['otherContents'],
          });
          toast.success('Edit OtherContent successfully');
        },
        onError: (error) => {
          toast.error(error.response.data.message, {
            autoClose: 5000,
          });
        },
      },
    );
  };

  return (
    <>
      {/* Modal  */}
      <Modal visible={isConfirmMode} onClose={() => setIsConfirmMode(false)}>
        <ConfirmContent
          title="Confirm"
          content="Are you sure you want to archive this otherContent?"
          contentBtnSubmit="Archive"
          contentBtnCancel="Cancel"
          isLoading={archiveOtherContentMutation.isLoading}
          onClose={() => setIsConfirmMode(false)}
          handleSubmit={() => handleArchiveOtherContent(item.id)}
        />
      </Modal>
      <Modal
        visible={isConfirmDeleteMode}
        onClose={() => setIsConfirmDeleteMode(false)}
      >
        <ConfirmContent
          title="Confirm"
          content="Are you sure you want to delete this otherContent?"
          contentBtnSubmit="Delete"
          contentBtnCancel="Cancel"
          isLoading={deleteOtherContentMutation.isLoading}
          onClose={() => setIsConfirmDeleteMode(false)}
          handleSubmit={() => handleDeleteOtherContent(item.id)}
        />
      </Modal>
      <div
        className="tableRow d-none d-sm-table-row w-100"
        key={`row-pc-${item.id}`}
      >
        {/* Ava */}
        <div className="d-table-cell tableCell align-middle roundedLeft cursor-pointer py-4">
          <div
            className={cn(styles.avatar, 'cursor-pointer')}
            onClick={() => getUrlImage(item.evidenceUrl)}
          >
            <Avatar image={item.evidenceUrl} />
          </div>
        </div>
        {/* Mail */}
        <div className="d-table-cell tableCell align-middle">
          <p>{item.title}</p>
        </div>
        {/* Type */}
        <div className="d-table-cell tableCell align-middle">
          <PopoverEditSetting
            name="user-type"
            setting={item?.type}
            listSettings={typeList?.data}
            handleUpdate={handleUpdateTPC}
          />
        </div>
        {/* Platform */}
        <div className="d-table-cell tableCell align-middle">
          <PopoverEditSetting
            name="user-platform"
            setting={item?.platform}
            listSettings={platformList?.data}
            handleUpdate={handleUpdateTPC}
          />
        </div>
        {/* Created at */}
        <div className="d-table-cell tableCell align-middle">
          <p className={cn(styles.createdAt, 'px-2')}>
            {dateToUrl(item?.createTime)}
          </p>
        </div>

        {/* Extracted Data */}
        <div className="d-table-cell tableCell align-middle color4 fs-7">
          <p>View: {handleLongNumber(item.viewCount)}</p>
          <p>Like: {handleLongNumber(item.likeCount)}</p>
          <p>Comment: {handleLongNumber(item.commentCount)}</p>
          <p>Share: {handleLongNumber(item.shareCount)}</p>
        </div>
        {/* Three dot */}
        <div className="d-table-cell tableCell align-middle roundedRight cursor-pointer">
          <Popover
            contents={[
              {
                component: (
                  <Decentralization permissions={['user-update']}>
                    <div>
                      <AiFillEdit size={18} />
                      <span className="font15 ms-3">Edit</span>
                    </div>
                  </Decentralization>
                ),
                onClick: () => {
                  setIdItem(item.id);
                  onVisibleOtherContentView(true);
                },
              },
              {
                component: (
                  <div onClick={() => setIsConfirmMode(true)}>
                    <>
                      <Decentralization
                        permissions={['user-archivist-archive']}
                      >
                        <BiArchiveIn size={18} />
                        <span className="ms-3 font15">Archive</span>
                      </Decentralization>
                    </>
                  </div>
                ),
                onClick: () => {
                  setIsConfirmMode(true);
                },
              },
              {
                component: (
                  <div onClick={() => setIsConfirmDeleteMode(true)}>
                    <>
                      <Decentralization
                        permissions={['user-archivist-archive']}
                      >
                        <RiDeleteBinLine size={18} />
                        <span className="ms-3 font15">Delete</span>
                      </Decentralization>
                    </>
                  </div>
                ),
                onClick: () => {
                  setIsConfirmDeleteMode(true);
                },
              },
            ]}
          >
            <HiDotsHorizontal />
          </Popover>
        </div>
      </div>

      <div className="d-sm-none pb-4 mt-3 w-100 g-0 borderBottomCard">
        <div className="d-flex mb-4 justify-content-between">
          <div className="d-flex">
            <div
              className={cn('cursor-pointer', styles.imageMobie)}
              onClick={() => getUrlImage(item.coverImageUrl)}
            >
              <Avatar className="imgCover" image={item.coverImageUrl} />
            </div>
            {/* Mail */}
            <div
              className={cn('d-flex align-items-center align-middle w-75 me-1')}
            >
              <div className={cn(styles.titleMobie)}>{item.title}</div>
            </div>
          </div>
          <div>
            <Popover
              contents={[
                {
                  component: (
                    <Decentralization permissions={['user-update']}>
                      <div>
                        <AiFillEdit size={18} />
                        <span className="font15 ms-3">Edit</span>
                      </div>
                    </Decentralization>
                  ),
                  onClick: () => {
                    setIdItem(item.id);
                    onVisibleOtherContentView(true);
                  },
                },
                {
                  component: (
                    <div onClick={() => setIsConfirmMode(true)}>
                      <>
                        <Decentralization
                          permissions={['user-archivist-archive']}
                        >
                          <BiArchiveIn size={18} />
                          <span className="ms-3 font15">Archive</span>
                        </Decentralization>
                      </>
                    </div>
                  ),
                  onClick: () => {
                    setIsConfirmMode(true);
                  },
                },
                {
                  component: (
                    <div onClick={() => setIsConfirmDeleteMode(true)}>
                      <>
                        <Decentralization
                          permissions={['user-archivist-archive']}
                        >
                          <RiDeleteBinLine size={18} />
                          <span className="ms-3 font15">Delete</span>
                        </Decentralization>
                      </>
                    </div>
                  ),
                  onClick: () => {
                    setIsConfirmDeleteMode(true);
                  },
                },
              ]}
            >
              <HiDotsHorizontal />
            </Popover>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between my-3">
            <div>Type</div>
            <div>
              <PopoverEditSetting
                name="user-type"
                setting={item?.type}
                listSettings={typeList?.data}
                handleUpdate={handleUpdateTPC}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between my-3">
            <div>Platform</div>
            <div>
              <PopoverEditSetting
                name="user-platform"
                setting={item?.platform}
                listSettings={platformList?.data}
                handleUpdate={handleUpdateTPC}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between my-3">
            <div>Create at</div>
            <div>
              <p className={cn(styles.createdAt, 'px-2')}>
                {dateToUrl(new Date(item.createdAt))}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between my-3">
            <div>Extracted Data</div>
            <div className="text-end color4 fs-7">
              <p>View: {handleLongNumber(item.viewCount)}</p>
              <p>Like: {handleLongNumber(item.likeCount)}</p>
              <p>Comment: {handleLongNumber(item.commentCount)}</p>
              <p>Share: {handleLongNumber(item.shareCount)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

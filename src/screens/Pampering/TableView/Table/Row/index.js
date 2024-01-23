import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiFillEdit } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import { ThreeDots } from 'react-loader-spinner';

import cn from 'classnames';
import styles from './Row.module.sass';

import {
  Decentralization,
  Icon,
  Modal,
  ConfirmContent,
} from '../../../../../components';
import Popover from '../../../../../components/Popover';

import useQueryString from '../../../../../hooks/useQueryString';

import { editPampering } from '../../../../../services/api';
import { handleLongNumber } from '../../../../../utils/helpers';

const Row = ({
  item,
  archivePamperingMutation,
  listCategories,
  listPIC,
  listStatus,
  key,
}) => {
  const navigate = useNavigate();

  const { queryString, parseQueryString } = useQueryString();

  const queryClient = useQueryClient();

  // Archived Task
  const { isLoading } = archivePamperingMutation;
  const handleArchiveTask = (id) => {
    archivePamperingMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('pamperings');
        toast.success('Pampering archived successfully');
      },
    });
  };

  // Edit Task Mutation
  const editPamperingsMutation = useMutation(({ id, data }) => {
    return editPampering(id, data);
  });

  // Edit Pampering
  const handleUpdateSetting = (data) => {
    const body = {
      category: item.category.name,
      pic: item.pic.name,
      status: item.status.name,
    };
    const type =
      data.type === 'pampering-category'
        ? 'category'
        : data.type === 'pampering-pic'
        ? 'pic'
        : 'status';

    body[type] = data.name;

    return editPamperingsMutation.mutate(
      {
        id: item.id,
        data: body,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('pamperings');
          toast.success('Pampering updated successfully');
        },
        onError: (error) => {
          toast.error(error.response.data.message, {
            autoClose: 5000,
          });
        },
      },
    );
  };

  // const utcDate = new Date(item.airingDay);
  // const vietnamDate = new Date(utcDate.getTime() + 7 * 3600 * 1000);

  // Handle Confirm Modal
  const [isConfirmMode, setIsConfirmMode] = useState(false);

  return (
    <>
      <div
        className="d-table-row d-none d-sm-table-row tableRow w-100"
        key={key}
      >
        <Modal visible={isConfirmMode} onClose={() => setIsConfirmMode(false)}>
          <ConfirmContent
            title="Confirm"
            content="Are you sure you want to archive this user?"
            contentBtnSubmit="Archive"
            contentBtnCancel="Cancel"
            isLoading={isLoading}
            onClose={() => setIsConfirmMode(false)}
            handleSubmit={() => handleArchiveTask(item.id)}
          />
        </Modal>
        {/* Date */}
        <div className="d-table-cell tableCell align-middle py-3 ps-2 roundedLeft">
          {item?.start}
        </div>
        {/* Name */}
        <div className="d-table-cell tableCell align-middle textOverFlow py-4">
          {item?.title}
        </div>
        {/* Category */}
        <div className="d-table-cell tableCell align-middle">
          {item?.category && (
            <Popover
              contents={listCategories?.data?.map((category) => ({
                component: (
                  <Decentralization permissions={['user-update']} exact>
                    <span className="fs-6">{category.name}</span>
                  </Decentralization>
                ),
                onClick: () => {
                  handleUpdateSetting(category);
                },
                color: item.category?.name === category?.name && {
                  bgColor: category?.color,
                  textColor: 'white',
                },
                icon: true,
              }))}
            >
              <div
                style={{ backgroundColor: item.category.color }}
                className={styles.status}
              >
                {item?.category?.name}
              </div>
            </Popover>
          )}
        </div>
        {/* cost */}
        <div className="d-table-cell tableCell align-middle">
          {handleLongNumber(item.cost)}
        </div>
        {/* P.I.C */}
        <div className="d-table-cell tableCell align-middle">
          {item.pic && (
            <Popover
              contents={listPIC?.data?.map((pic) => ({
                component: (
                  <Decentralization permissions={['user-update']} exact>
                    <span className="fs-6">{pic.name}</span>
                  </Decentralization>
                ),
                onClick: () => {
                  handleUpdateSetting(pic);
                },
                color: item.pic?.name === pic?.name && {
                  bgColor: pic?.color,
                  textColor: 'white',
                },
                icon: true,
              }))}
            >
              <div
                style={{ backgroundColor: item.pic.color }}
                className={styles.status}
              >
                {item.pic.name}
              </div>
            </Popover>
          )}
        </div>
        {/* Status */}
        <div className="d-table-cell tableCell align-middle">
          {item.status && (
            <Popover
              contents={listStatus?.data?.map((status) => ({
                component: (
                  <Decentralization permissions={['user-update']} exact>
                    <span className="fs-6">{status.name}</span>
                  </Decentralization>
                ),
                onClick: () => {
                  handleUpdateSetting(status);
                },
                color: item.status?.name === status?.name && {
                  bgColor: status?.color,
                  textColor: 'white',
                },
                icon: true,
              }))}
            >
              <div
                style={{ backgroundColor: item.status.color }}
                className={styles.status}
              >
                {item.status.name}
              </div>
            </Popover>
          )}
        </div>
        {/* Evidence */}
        <div className="d-table-cell tableCell align-middle">
          {!item.evidence ? (
            <div
              className="button-small button-white-grey-border"
              onClick={() =>
                navigate({
                  pathname: `/pamperings/table-view/select-evidence/${item.id}`,
                  search: `?${parseQueryString(queryString)}`,
                })
              }
            >
              Upload
              <Icon className="ms-1" name="upload" />
            </div>
          ) : (
            <div
              className={cn(styles.center, styles.evidenceImage)}
              onClick={() => {
                navigate({
                  pathname: `/pamperings/table-view/select-evidence/${item.id}`,
                  search: `?${parseQueryString(queryString)}`,
                });
              }}
            >
              <img
                className={cn(styles.evidenceImage)}
                src={item.evidence}
                alt="Evi"
                width="60"
              />
            </div>
          )}
        </div>
        {/* Last edited */}
        <div className="d-table-cell tableCell align-middle">
          <div className="colorN4">
            {item?.lastUpdate}
            <div></div>
          </div>
        </div>

        {/* Three dot */}
        <div className="d-table-cell tableCell align-middle px-3 roundedRight">
          <Popover
            contents={[
              {
                component: (
                  <Decentralization permissions={['user-update']}>
                    <div>
                      <AiFillEdit size={20} />
                      <span className="ms-3 font15">Edit</span>
                    </div>
                  </Decentralization>
                ),
                onClick: () =>
                  navigate({
                    pathname: `/pamperings/table-view/edit-pampering/${item.id}`,
                    search: `?${parseQueryString(queryString)}`,
                  }),
              },
              {
                component: (
                  <div>
                    {isLoading && (
                      <ThreeDots width="40" height="20" radius="10" />
                    )}
                    {!isLoading && (
                      <>
                        <Decentralization
                          permissions={['user-archivist-archive']}
                        >
                          <BiArchiveIn size={20} />
                          <span className="ms-3 font15">Archive</span>
                        </Decentralization>
                      </>
                    )}
                  </div>
                ),
                onClick: () => setIsConfirmMode(true),
              },
            ]}
          >
            <HiDotsHorizontal />
          </Popover>
        </div>
      </div>
      {/* <div
        className={cn('d-sm-none pb-4 mt-3 w-100 g-0', styles.borderBottomCard)}
      >
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div className="avatar">
              <img
                src={item.owner.avatarUrl}
                className="imgCover"
                width={60}
                height={60}
                alt="avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-avatar.jpg';
                }}
              />
            </div>
            <div>
              <div className={'mb-1'}>{item.owner.username}</div>
              <a className="colorN4 font13" href={`tel:+${item.owner.phone}`}>
                {item.owner.phone}
              </a>
              <div>
                {item.status && (
                  <Popover
                    contents={listStatus?.data?.map((status) => ({
                      component: (
                        <Decentralization permissions={['user-update']} exact>
                          <span className="fs-6">{status.name}</span>
                        </Decentralization>
                      ),
                      // onClick: () => {
                      //   handleUpdateSetting(status);
                      // },
                      color: item.status?.name === status?.name && {
                        bgColor: status?.color,
                        textColor: 'white',
                      },
                      icon: true,
                    }))}
                  >
                    <div
                      style={{ backgroundColor: item.status.color }}
                      className={styles.status}
                    >
                      {item.status.name}
                    </div>
                  </Popover>
                )}
              </div>
            </div>
          </div>
          <div>
            <Popover
              contents={[
                {
                  component: (
                    <Decentralization permissions={['user-update']}>
                      <div>
                        <AiFillEye size={18} />
                        <span className="ms-3 fs-6">View</span>
                      </div>
                    </Decentralization>
                  ),
                  onClick: () =>
                    navigate({
                      pathname: `/tasks/table-view/view-task/${item.id}`,
                      search: `?${parseQueryString(queryString)}`,
                    }),
                },
                {
                  component: (
                    <Decentralization permissions={['user-update']}>
                      <div>
                        <AiFillEdit size={18} />
                        <span className="ms-3 fs-6">Edit</span>
                      </div>
                    </Decentralization>
                  ),
                  onClick: () =>
                    navigate({
                      pathname: `/tasks/table-view/edit-task/${item.id}`,
                      search: `?${parseQueryString(queryString)}`,
                    }),
                },
                {
                  component: (
                    <div>
                      {isLoading && (
                        <ThreeDots width="40" height="20" radius="10" />
                      )}
                      {!isLoading && (
                        <>
                          <Decentralization
                            permissions={['user-archivist-archive']}
                          >
                            <BiArchiveIn size={18} />
                            <span className="ms-3 fs-6">Archive</span>
                          </Decentralization>
                        </>
                      )}
                    </div>
                  ),
                  onClick: () => setIsConfirmMode(true),
                },
              ]}
            >
              <HiDotsHorizontal className={'colorN4'} size="20" />
            </Popover>
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Title</div>
          <div>
            <p>{item.task_name}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Platform</div>
          <div>
            {item.platform && (
              <Popover
                contents={platformsQuery?.data?.map((platform) => ({
                  component: (
                    <Decentralization permissions={['user-update']} exact>
                      <span className="fs-6">{platform.name}</span>
                    </Decentralization>
                  ),
                  // onClick: () => {
                  //   handleUpdateSetting(platform);
                  // },
                  color: item.platform?.name === platform?.name && {
                    bgColor: platform?.color,
                    textColor: 'white',
                  },
                  icon: true,
                }))}
              >
                <div
                  style={{ backgroundColor: item.platform.color }}
                  className={styles.status}
                >
                  {item.platform.name}
                </div>
              </Popover>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Type</div>
          <div>
            {item.type && (
              <Popover
                contents={typesQuery?.data?.map((type) => ({
                  component: (
                    <Decentralization permissions={['user-update']} exact>
                      <span className="fs-6">{type.name}</span>
                    </Decentralization>
                  ),
                  // onClick: () => {
                  //   handleUpdateSetting(type);
                  // },
                  color: item.type?.name === type?.name && {
                    bgColor: type?.color,
                    textColor: 'white',
                  },
                  icon: true,
                }))}
              >
                <div
                  style={{ backgroundColor: item.type.color }}
                  className={styles.status}
                >
                  {item.type.name}
                </div>
              </Popover>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between my-2">
          <div className="color4">Evidence</div>
          <div>
            {!item.content ? (
              <div
                className="button-small button-white-grey-border"
                onClick={() =>
                  navigate({
                    pathname: `/tasks/table-view/select-evidence/${item.id}_${item.kocId}_${item.platform?.name}_${item.type?.name}`,
                    search: `?${parseQueryString(queryString)}`,
                  })
                }
              >
                Upload
                <Icon className="ms-1" name="upload" />
              </div>
            ) : (
              <div
                className={cn(styles.center, styles.evidenceImage)}
                onClick={() => {
                  navigate({
                    pathname: `/tasks/table-view/select-evidence/${item.id}_${item.kocId}_${item.platform?.name}_${item.type?.name}_${item.content.id}`,
                    search: `?${parseQueryString(queryString)}`,
                  });
                }}
              >
                <img
                  className={cn(styles.evidenceImage)}
                  src={item.content.cover_image_url}
                  alt="Evi"
                  width="60"
                />
              </div>
            )}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Row;

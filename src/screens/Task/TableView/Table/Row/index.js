import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiFillEdit, AiFillEye } from 'react-icons/ai';
import { BiArchiveIn } from 'react-icons/bi';
import { ThreeDots } from 'react-loader-spinner';

import cn from 'classnames';
import styles from './Row.module.sass';

import {
  Decentralization,
  Avatar,
  Icon,
  Modal,
  ConfirmContent,
} from '../../../../../components';
import Popover from '../../../../../components/Popover';

import useQueryString from '../../../../../hooks/useQueryString';

import { editTask } from '../../../../../services/api';

const Row = ({
  item,
  archiveTaskMutation,
  platformsQuery,
  typesQuery,
  statusQuery,
  key,
}) => {
  const navigate = useNavigate();

  const { queryString, parseQueryString } = useQueryString();

  const queryClient = useQueryClient();

  // Archived Task
  const { isLoading } = archiveTaskMutation;
  const handleArchiveTask = (id) => {
    archiveTaskMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
        toast.success('Task archived successfully');
      },
    });
  };

  // Edit Task Mutation
  const editTasksMutation = useMutation(({ id, data }) => {
    return editTask(id, data);
  });

  // Edit Task
  const handleUpdateSetting = (data) => {
    const body = {
      platform: item.platform.name,
      type: item.type.name,
      status: item.status.name,
    };

    const type =
      data.type === 'user-platform'
        ? 'platform'
        : data.type === 'task-type'
        ? 'type'
        : 'status';

    body[type] = data.name;

    return editTasksMutation.mutate(
      {
        id: item.id,
        data: body,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('tasks');
          toast.success('Task updated successfully');
        },
        onError: (error) => {
          toast.error(error.response.data.message, {
            autoClose: 5000,
          });
        },
      },
    );
  };

  const utcDate = new Date(item.airingDay);
  const vietnamDate = new Date(utcDate.getTime() + 7 * 3600 * 1000);

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
        {/* Avatar */}
        <div className="d-table-cell tableCell align-middle py-3 ps-2">
          <div
            className={'d-flex align-items-center'}
            onClick={() => {
              navigate(`/koc-profile/${item.id}/tiktok`, {
                state: queryString,
              });
            }}
          >
            <div className="avatar">
              <Avatar image={item.owner.avatarUrl} className="imgCover" />
            </div>
            <div className="overflow-hidden">
              <div className={cn('mb-1 textOverFlow', styles.userName)}>
                {item.owner.username}
              </div>
              <a className="colorN4 font13" href={`tel:+${item.owner.phone}`}>
                {item.owner.phone}
              </a>
            </div>
          </div>
        </div>
        {/* Title */}
        <div className="d-table-cell tableCell align-middle textOverFlow">
          {item.task_name}
        </div>
        {/* Platform */}
        <div className="d-table-cell tableCell align-middle">
          {item.platform && (
            <Popover
              contents={platformsQuery?.data?.map((platform) => ({
                component: (
                  <Decentralization permissions={['user-update']} exact>
                    <span className="fs-6">{platform.name}</span>
                  </Decentralization>
                ),
                onClick: () => {
                  handleUpdateSetting(platform);
                },
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
        {/* Type */}
        <div className="d-table-cell tableCell align-middle">
          {item.type && (
            <Popover
              contents={typesQuery?.data?.map((type) => ({
                component: (
                  <Decentralization permissions={['user-update']} exact>
                    <span className="fs-6">{type.name}</span>
                  </Decentralization>
                ),
                onClick: () => {
                  handleUpdateSetting(type);
                },
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
        {/* Status */}
        <div className="d-table-cell tableCell align-middle">
          {item.status && (
            <Popover
              contents={statusQuery?.data?.map((status) => ({
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
        {/* Deadline */}
        <div className="d-table-cell tableCell align-middle">
          <div className="colorN4">
            <div>
              {vietnamDate.toISOString().substring(11, 16)}
              <br />
              {vietnamDate.toISOString().substring(0, 10)}
            </div>
            <div></div>
          </div>
        </div>

        {/* Three dot */}
        <div className="d-table-cell tableCell align-middle px-3">
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
      <div
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
                    contents={statusQuery?.data?.map((status) => ({
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
                  onClick: () => {
                    handleUpdateSetting(platform);
                  },
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
                  onClick: () => {
                    handleUpdateSetting(type);
                  },
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
      </div>
    </>
  );
};

export default Row;

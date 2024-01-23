import React from 'react';

import styles from './Row.module.sass';
import cn from 'classnames';

import {
  ConfirmContent,
  Decentralization,
  Modal,
  Popover,
} from '../../../../components';
import { AiFillEdit } from 'react-icons/ai';
import { HiDotsHorizontal } from 'react-icons/hi';
import { BiArchiveIn } from 'react-icons/bi';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { archiveProduct } from '../../../../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Row = ({ item, setVisibleProductView }) => {
  const [isConfirmMode, setIsConfirmMode] = useState(false);

  //handle archive
  const queryClient = useQueryClient();

  const archiveProductMutation = useMutation((id) => {
    return archiveProduct(id);
  });

  const handleArchiveProduct = (id) => {
    archiveProductMutation.mutate(id, {
      onSuccess: () => {
        setIsConfirmMode(false);
        toast.success('Product archived successfully');
        queryClient.invalidateQueries({
          queryKey: ['list-products-sku'],
        });
      },
    });
  };

  return (
    <>
      {/* Modal  */}
      <Modal
        visible={isConfirmMode}
        onClose={() => setIsConfirmMode(false)}
        key={`row-pc-modal-${item.id}`}
      >
        <ConfirmContent
          title="Confirm"
          content="Are you sure you want to archive this product?"
          contentBtnSubmit="Archive"
          contentBtnCancel="Cancel"
          isLoading={archiveProductMutation?.isLoading}
          onClose={() => setIsConfirmMode(false)}
          handleSubmit={() => handleArchiveProduct(item.id)}
        />
      </Modal>
      <div className={cn('d-none d-lg-table-row tableRow g-0')}>
        <Link
          className="tableCell py-3 cursor-pointer text-dark"
          to={`/product-detail/${item.skuCode}`}
          target="_blank"
        >
          <div className="d-flex justify-content-start align-items-center py-2">
            {/* <img
              src={item?.imageUrl}
              width={80}
              height={80}
              alt="Product"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/content/not-found-image.jpg';
              }}
            /> */}
            <div className="mb-1 textOverFlow">{item?.title}</div>
          </div>
        </Link>
        <p className="tableCell align-middle roundedLeft">{item?.skuCode}</p>

        {/* Code */}
        {/* <div className="tableCell align-middle">
          <p
            className={styles.status}
            style={{
              backgroundColor:
                item?.shop === 'TikTokShop' ? '#111315' : '#FF6A55',
            }}
          >
            {item?.shop}
          </p>
        </div>
        <div className="tableCell align-middle">
          <p
            className={styles.status}
            style={{
              backgroundColor: `${item?.category?.color}`,
            }}
          >
            {item?.category?.name}
          </p>
        </div>
        <div className="tableCell align-middle">
          <p
            className={styles.status}
            style={{
              backgroundColor: `${item?.type?.color}`,
            }}
          >
            {item?.type?.name}
          </p>
        </div>
        <p className="tableCell align-middle">{item?.full_price}</p>
        <p className="tableCell align-middle">{item?.current_price}</p>
        <p className="tableCell align-middle">{item?.discounted_rate}</p>
         */}
        <div className="tableCell align-middle roundedRight">
          <Popover
            contents={[
              {
                component: (
                  <div>
                    <AiFillEdit size={18} />
                    <span className={cn(styles.font15, 'ms-3')}>Edit</span>
                  </div>
                ),
                onClick: () => {
                  setVisibleProductView(item.id);
                },
              },
              {
                component: (
                  <span>
                    <BiArchiveIn size={20} />
                    <span className="font15 ms-3">Archive</span>
                  </span>
                ),
                onClick: () => {
                  setIsConfirmMode(true);
                },
              },
            ]}
          >
            <HiDotsHorizontal />
          </Popover>
        </div>
      </div>
      <div
        className={cn('d-lg-none pb-4 mt-3 w-100 g-0', styles.borderBottomCard)}
      >
        <div className="d-flex w-100">
          {/* <div className="me-3">
            <img
              src={item?.imageUrl}
              width={70}
              height={80}
              alt="Product"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/content/not-found-image.jpg';
              }}
            />
          </div> */}
          <div className="d-flex justify-content-between flex-fill">
            <div>
              <div className={cn(styles.cardTitle, 'textOverFlow')}>
                {item?.title}
              </div>
              <div className="color4">{item?.skuCode}</div>
              <div>
                <p
                  className={styles.status}
                  style={{
                    backgroundColor:
                      item?.shop === 'TikTokShop' ? '#111315' : '#FF6A55',
                  }}
                >
                  {item?.shop}
                </p>
              </div>
            </div>
            <div className="align-middle">
              <Popover
                contents={[
                  {
                    component: (
                      // <Decentralization permissions={['user-update']}>
                      <div>
                        <AiFillEdit size={18} />
                        <span className={cn(styles.font15, 'ms-3')}>Edit</span>
                      </div>
                      // </Decentralization>
                    ),
                    onClick: () => {
                      setVisibleProductView(item.id);
                    },
                  },
                  {
                    component: (
                      <Decentralization
                        permissions={['product-archivist-archive']}
                      >
                        <span>
                          <BiArchiveIn size={20} />
                          <span className="font15 ms-3">Archive</span>
                        </span>
                      </Decentralization>
                    ),
                    onClick: () => {
                      setIsConfirmMode(true);
                    },
                  },
                ]}
              >
                <HiDotsHorizontal />
              </Popover>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between my-2 ">
            <div className="color4">Category</div>
            <div>
              <p
                className={styles.status}
                style={{
                  backgroundColor: `${item?.category?.color}`,
                }}
              >
                {item?.category?.name}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between my-2 ">
            <div className="color4">Type</div>
            <div>
              <p
                className={styles.status}
                style={{
                  backgroundColor: `${item?.type?.color}`,
                }}
              >
                {item?.type?.name}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between my-2 ">
            <div className="color4">Full Price</div>
            <div>{item?.full_price?.toLocaleString('en-US')}</div>
          </div>
          <div className="d-flex justify-content-between my-2 ">
            <div className="color4">Current Price</div>
            <div>{item?.current_price?.toLocaleString('en-US')}</div>
          </div>
          <div className="d-flex justify-content-between my-2 ">
            <div className="color4">Discount Rate</div>
            <div>{item?.discounted_rate}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Row;

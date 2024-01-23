import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiArchiveIn } from 'react-icons/bi';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import styles from './Row.module.sass';

import {
  ConfirmContent,
  Decentralization,
  Modal,
} from '../../../../components';

import Popover from '../../../../components/Popover';

const Row = ({ item, archiveOrderMutation }) => {
  const queryClient = useQueryClient();

  // Handle Confirm Modal
  const [isConfirmMode, setIsConfirmMode] = useState(false);

  // Archived Order
  const { isLoading } = archiveOrderMutation;
  const handleArchiveOrder = (id) => {
    archiveOrderMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['orders'],
        });
        queryClient.invalidateQueries({
          queryKey: ['archived-orders'],
        });
        toast.success('Orders archived successfully');
      },
    });
  };

  return (
    <>
      {/* Modal  */}
      <Modal visible={isConfirmMode} onClose={() => setIsConfirmMode(false)}>
        <ConfirmContent
          title="Confirm"
          content="Are you sure you want to archive this order?"
          contentBtnSubmit="Archive"
          contentBtnCancel="Cancel"
          onClose={() => setIsConfirmMode(false)}
          handleSubmit={() => {
            handleArchiveOrder(item.id);
            setIsConfirmMode(false);
          }}
        />
      </Modal>
      {/* PC */}
      <div className="tableRow" key={`row-pc-${item.id}`}>
        {/* Name */}
        <Link
          to={`/order-detail/${item.id}`}
          className="d-table-cell tableCell py-3 ps-3 pe-4 roundedLeft"
        >
          <div className="d-flex flex-column">
            <p className="text-dark textOverFlow">{item.order_name}</p>
            <p className="colorN4 fs-7">{item.order_date.slice(0, 10)}</p>
          </div>
        </Link>
        {/* Delivery code */}
        <Link
          to={`/order-detail/${item.id}`}
          className="d-table-cell tableCell pe-4 text-dark textOverFlow"
        >
          {item.delivery_code}
        </Link>
        {/* City */}
        <div className="d-table-cell tableCell pe-4">
          <p className="">{item.city}</p>
          <p className="fs-7 fw-normal">{item.address}</p>
        </div>
        {/* Amount */}
        <p className="d-table-cell tableCell pe-4">
          {item.amount?.toLocaleString('en-US')}
        </p>
        {/* Price */}
        <p className="d-table-cell tableCell pe-4">
          {item.total_price?.toLocaleString('en-US')} VND
        </p>
        {/* KOC */}
        <Link
          to={`/koc-profile/4`}
          className="d-table-cell tableCell pe-4 text-dark"
        >
          @{item.koc_name}
        </Link>
        {/* Type */}
        <div className="d-table-cell tableCell pe-4">
          {item?.type && (
            <p
              style={{
                backgroundColor:
                  item?.type === 'Livestream'
                    ? '#B5E4CA'
                    : item?.type === 'show'
                    ? '#7FD3ED'
                    : '#A965C0',
                padding: '0 8px',
                borderRadius: '6px',
                color: 'white',
                fontWeight: 600,
                width: 'fit-content',
              }}
            >
              {item?.type}
            </p>
          )}
        </div>
        {/* Platform */}
        <div className="d-table-cell tableCell pe-4">
          <p
            style={{
              backgroundColor:
                item.platform === 'TikTokShop'
                  ? '#000000'
                  : 'rgb(255, 106, 85)',
              padding: '0 8px',
              borderRadius: '6px',
              color: 'white',
              fontWeight: 600,
              width: 'fit-content',
            }}
          >
            {item.platform}
          </p>
        </div>
        {/* Three dot */}
        <div className="d-table-cell tableCell pe-3 roundedRight">
          <Popover
            contents={[
              {
                component: (
                  <div
                    className={{ 'mx-5': isLoading }}
                    onClick={() => setIsConfirmMode(true)}
                  >
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
            ]}
          >
            <HiDotsHorizontal />
          </Popover>
        </div>
      </div>

      {/* Mobile  */}
      <div
        className="d-sm-none pb-4 mt-3 borderBottom lh-lg"
        key={`row-mobile-${item.id}`}
      >
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <Link
                to={`/order-detail/${item.id}`}
                className="d-table-cell tableCell py-3 ps-3 pe-4 roundedLeft"
              >
                <div className="d-flex flex-column">
                  <p className="text-dark textOverFlow">{item.order_name}</p>
                  <p className="colorN4 fs-7">{item.order_date.slice(0, 10)}</p>
                </div>
              </Link>
            </div>
            {/* Three dot */}
            <div className="d-table-cell tableCell pt-2 pe-3 roundedRight">
              <Popover
                contents={[
                  {
                    component: (
                      <div
                        className={{ 'mx-5': isLoading }}
                        onClick={() => setIsConfirmMode(true)}
                      >
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
                ]}
              >
                <HiDotsHorizontal />
              </Popover>
            </div>
          </div>
          <div className="px-3">
            <div className="d-flex justify-content-between">
              <div className="colorN4">Delivery Code</div>
              <div>
                <Link
                  to={`/order-detail/${item.id}`}
                  className="text-dark textOverFlow"
                >
                  {item.delivery_code}
                </Link>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <div className="colorN4">City</div>
              <div>
                <p className="">{item.city}</p>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <div className="colorN4">Amount</div>
              <div>
                <p className="">{item.amount?.toLocaleString('en-US')}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="colorN4">Price</div>
              <div>
                <p className="">
                  {item.total_price?.toLocaleString('en-US')} VND
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="colorN4">KOC</div>
              <div>
                <Link to={`/koc-profile/4`} className="text-dark">
                  @{item.koc_name}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Row;

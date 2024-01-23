import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { BiExport, BiImport } from 'react-icons/bi';

import cn from 'classnames';
import styles from './Orders.module.sass';

import Table from './Table';
import Overview from './Overview';
import ArchivedOrders from './ArchivedOrders';
import FormFilter from './FormFilter';
import {
  Archived,
  Card,
  FiltersCustom,
  FormSearch,
  Decentralization,
} from '../../components';

import useQueryString from '../../hooks/useQueryString';
import useListOrders from './useListOrders';

import { exportOrders } from '../../services/api';
import { exportExcel } from '../../utils/helpers';

export default function Orders() {
  const navigate = useNavigate();

  const { queryString, parseQueryString } = useQueryString();

  const handleCloseModal = () => {
    navigate({
      pathname: '/orders',
      search: `?${parseQueryString(queryString)}`,
    });
  };

  // set View option
  const [viewOption, setViewOption] = useState('View all orders');

  const {
    listOrders,
    ordersSummary,
    isSuccess,
    isLoading,
    totalPage,
    totalOrders,
    archiveOrderMutation,
  } = useListOrders(viewOption);

  const exportMutation = useMutation((query) => exportOrders(query));
  const location = useLocation();
  const query = location.search;
  const handleClickExport = useCallback(() => {
    exportMutation.mutate(query, {
      onSuccess: (data) => {
        exportExcel(data.data.data, 'Orders');
      },
    });
  }, [exportMutation, query]);

  const [countOrders, setCountOrders] = useState(0);

  useEffect(() => {
    if (isSuccess) setCountOrders(totalOrders);
  }, [isSuccess, totalOrders]);

  return (
    <>
      <Decentralization permissions={['order-import']} exact>
        <Outlet
          context={{
            onClose: handleCloseModal,
          }}
        />
      </Decentralization>
      <div className="d-inline-flex justify-content-between mb-4">
        <div>
          <Decentralization
            permissions={['order-import', 'order-get-column-name']}
            exact
          >
            <button
              className="button-small button-white-grey-border"
              onClick={() =>
                navigate({
                  pathname: '/orders/import',
                })
              }
            >
              <BiExport className="fs-5" />
              Import
            </button>
          </Decentralization>
        </div>
      </div>
      <Card
        title={`${countOrders} Orders`}
        classTitle="title-purple"
        classCardHead="d-flex flex-wrap flex-row flex-lg-col gap-3"
        head={
          <>
            <FormSearch className="" placeholder="Search by name or email" />
            <div>
              <Decentralization permissions={['user']}>
                <button
                  className={cn(styles.link, {
                    [styles.active]: viewOption === 'View all orders',
                  })}
                  onClick={() => setViewOption('View all orders')}
                >
                  All
                </button>
              </Decentralization>
              <Decentralization permissions={['role']}>
                <button
                  className={cn(styles.link, {
                    [styles.active]: viewOption === 'View my orders',
                  })}
                  onClick={() => setViewOption('View my orders')}
                >
                  Me
                </button>
              </Decentralization>
            </div>
            <div className="d-flex">
              <FiltersCustom className="me-2" title="Filter">
                <FormFilter />
              </FiltersCustom>
              <Decentralization permissions={['user-archivist-list']}>
                <Archived title={'Archived Orders'}>
                  <ArchivedOrders />
                </Archived>
              </Decentralization>
              <Decentralization permissions={['order-export']} exact>
                <p
                  onClick={handleClickExport}
                  className="button-white-text-grey"
                >
                  Export
                  <BiImport className="fs-5 mb-1 me-0 ms-2" />
                </p>
              </Decentralization>
            </div>
          </>
        }
      >
        {/* Thong ke */}
        <Decentralization permissions={['order-list']} exact>
          <Overview ordersSummary={ordersSummary} />
          <Table
            listOrders={listOrders}
            isSuccess={isSuccess}
            isLoading={isLoading}
            totalPage={totalPage}
            archiveOrderMutation={archiveOrderMutation}
          />
        </Decentralization>
      </Card>
    </>
  );
}

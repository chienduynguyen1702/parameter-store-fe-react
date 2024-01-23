import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BiImport } from 'react-icons/bi';

import {
  Card,
  Decentralization,
  FiltersCustom,
  FormSearch,
} from '../../../components';

import Table from './Table';
import FormFilter from './FormFilter';

import Detail from './Detail';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router';
import { exportExcel } from '../../../utils/helpers';
import { getProductsByIdOrder } from '../../../services/api';
import useQueryString from '../../../hooks/useQueryString';

export default function OrderDetail() {
  const [total, setTotal] = useState(0);
  const { queryString } = useQueryString();

  const { id } = useParams();
  const exportMutation = useMutation(({ id, queryString }) =>
    getProductsByIdOrder(id, queryString),
  );

  const handleClickExport = useCallback(() => {
    exportMutation.mutate(
      {
        id,
        queryString,
      },
      {
        onSuccess: (data) => {
          data = data?.data?.data?.products?.map((item) => {
            const {
              products_orders,
              settings,
              archived_at,
              archived,
              archiver_id,
              archiver_username,
              ...rest
            } = item;
            return {
              ...rest,
              amount: item?.products_orders?.[0]?.amount,
              category: item?.settings.find(
                (item) => item?.type === 'product-category',
              )?.name,
              type: item?.settings.find((item) => item?.type === 'product-type')
                ?.name,
            };
          });
          exportExcel(data, 'Orders');
        },
      },
    );
  }, [exportMutation, id, queryString]);
  return (
    <>
      <Decentralization permissions={['order-get-one']} exact>
        <Detail />
      </Decentralization>
      <Card
        title={total !== 0 ? `${total} Items` : 'Items'}
        classTitle="title-black"
        classCardHead="d-flex flex-wrap flew-row flex-lg-col gap-3"
        head={
          <>
            <FormSearch placeholder="Search by name or code" />
            <div className="d-flex">
              <FiltersCustom className="me-2" title="Filter">
                <FormFilter />
              </FiltersCustom>
              <Decentralization permissions={['user-export']}>
                <button
                  className={'button-white-text-grey'}
                  onClick={handleClickExport}
                >
                  Export
                  <BiImport className="fs-5 mb-1 me-0 ms-2" />
                </button>
              </Decentralization>
            </div>
          </>
        }
      >
        <Decentralization permissions={['order-get-list-product']} exact>
          <Table setTotal={setTotal} />
        </Decentralization>
      </Card>
    </>
  );
}

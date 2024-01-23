import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router';

import {
  ButtonExport,
  Card,
  FiltersCustom,
  FormSearch,
} from '../../../../../components';
import Table from './Table';

import SummaryCard from './SummaryCard';
import FormFilters from './FormFilters';

import { useKocProfileProductSold } from '../../../../../hooks/Data';
import { useQueryString } from '../../../../../hooks';

import {
  getListProductSoldByKOC,
  getMyListProductSold,
} from '../../../../../services/api';

import { exportExcel } from '../../../../../utils/helpers';

export default function KOCProductSold() {
  const {
    listProductSold,
    totalOverviewProductSold,
    isSuccess,
    isLoading,
    totalPage,
    totalProductSold,
  } = useKocProfileProductSold();
  // Handle total product Sold
  const { queryString } = useQueryString();
  const { id } = useParams();
  // Handle export
  const exportMutation = useMutation((queryString) => {
    if (id === 'me') {
      return getMyListProductSold(queryString);
    }
    return getListProductSoldByKOC({
      ...queryString,
      ownerId: id,
    });
  });

  const handleClickExport = useCallback(() => {
    exportMutation.mutate(queryString, {
      onSuccess: (data) => {
        exportExcel(data?.data?.data?.listProductSold, 'Product Sold');
      },
    });
  }, [exportMutation, queryString]);

  return (
    <Card
      title={`${totalProductSold || 0} Products Sold`}
      classTitle="title-purple"
      classCardHead="d-flex flex-wrap flex-row flex-lg-col gap-3 gap-sm-2"
      head={
        <>
          <FormSearch placeholder="Search by product name" />
          <FiltersCustom>
            <FormFilters
              suggestionProduct={listProductSold?.map((item) => ({
                id: item.title,
                text: item.title,
              }))}
            />
          </FiltersCustom>
          <ButtonExport
            handleClickExport={handleClickExport}
            isLoading={exportMutation.isLoading}
          />
        </>
      }
    >
      <SummaryCard counters={totalOverviewProductSold?.data} />
      <Table
        listProductSold={listProductSold}
        isSuccess={isSuccess}
        isLoading={isLoading}
        totalPage={totalPage}
        totalProductSold={totalProductSold}
      />
    </Card>
  );
}

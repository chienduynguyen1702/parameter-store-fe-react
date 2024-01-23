import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { exportExcel } from '../../utils/helpers';

import { useQueryString } from '../../hooks';

import {
  exportTikTokContents,
  exportFacebookContents,
  exportYoutubeContents,
  exportInstagramContents,
  exportUsers,
  exportLiquidations,
  exportLiquidationsItems,
  exportKOCs,
  exportProducts,
} from '../../services/api';
import moment from 'moment';

const EXPORT_MUTATION_LIST = {
  users: {
    api: exportUsers,
    title: 'Users',
  },
  kocs: {
    api: exportKOCs,
    title: 'KOCs',
  },
  products: {
    api: exportProducts,
    title: 'Products',
  },
  liquidations: {
    api: exportLiquidations,
    title: 'Liquidations',
  },
  'liquidations-items': {
    api: exportLiquidationsItems,
    title: 'Liquidations Items',
  },
  tiktokContents: {
    api: exportTikTokContents,
    title: 'TikTok_Contents',
  },
  failedTiktokContents: {
    api: exportTikTokContents,
    title: 'Failed_TikTok_Contents',
  },
  facebookContents: {
    api: exportFacebookContents,
    title: 'Facebook Contents',
  },
  youtubeContents: {
    api: exportYoutubeContents,
    title: 'Youtube Contents',
  },
  instagramContents: {
    api: exportInstagramContents,
    title: 'Instagram Contents',
  },
};

export default function useExport({ exportedObject = 'tiktokContents' }) {
  const { queryString } = useQueryString();

  const exportMutation = useMutation((query) =>
    EXPORT_MUTATION_LIST[exportedObject].api(query),
  );

  const date = moment().format('YYYY_MM_DD');

  const handleClickExport = useCallback(() => {
    exportMutation.mutate(queryString, {
      onSuccess: (data) => {
        exportExcel(data.data.data, date + '_' + EXPORT_MUTATION_LIST[exportedObject].title);
      },
      onError: (err) => {
        toast.error(err);
      },
    });
  }, [exportMutation, queryString, exportedObject, date]);

  return {
    isLoadingExport: exportMutation.isLoading,
    handleClickExport,
  };
}

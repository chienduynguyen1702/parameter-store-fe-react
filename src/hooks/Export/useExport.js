import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { exportExcel } from '../../utils/helpers';

import { useQueryString } from '../../hooks';

import { exportUsers } from '../../services/api';
import moment from 'moment';

const EXPORT_MUTATION_LIST = {
  users: {
    api: exportUsers,
    title: 'Users',
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
        exportExcel(
          data.data.data,
          date + '_' + EXPORT_MUTATION_LIST[exportedObject].title,
        );
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

import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { importPamperings } from '../../services/api';
import moment from 'moment';
import { useNavigate } from 'react-router';

export default function useImportPampering() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const importPamperingsMutation = useMutation(
    (items) => {
      const data = items?.map((item) => {
        return {
          ...item,
          date: moment(item?.date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          category: item?.category?.name,
          pic: item?.pic?.name,
          status: item?.status?.name,
        };
      });
      return importPamperings(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['pamperings'],
        });
        navigate('/pamperings/table-view');
        toast.success('Import pamperings successfully');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message ?? error.message);
      },
    },
  );
  return {
    importPamperingsMutation,
  };
}

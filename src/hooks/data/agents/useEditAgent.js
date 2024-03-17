import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editProjectById } from '../../../services/api';
import { toast } from 'react-toastify';

const useEditAgent = (id) => {
  const queryClient = useQueryClient();

  const editProjectMutation = useMutation(
    (data) => {
      return editProjectById(id, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['projects'],
        });
        toast.success('Edit project successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );
  return {
    editProjectMutation,
  };
};
export default useEditAgent;

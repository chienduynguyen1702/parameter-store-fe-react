import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProject } from '../../../services/api';
import { toast } from 'react-toastify';

const useAddParameter = () => {
  const queryClient = useQueryClient();

  const addProjectMutation = useMutation(
    (data) => {
      return addProject(data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['projects'],
        });
        toast.success('Add project successfully');
      },
      onError: (error) => {
        toast.error(error.response.data.message, {
          autoClose: 5000,
        });
      },
    },
  );

  return {
    addProjectMutation,
  };
};

export default useAddParameter;

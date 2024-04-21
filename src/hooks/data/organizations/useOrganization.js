import { useMutation, useQuery } from '@tanstack/react-query';
import { getOrganizationById, editOrganizationById } from '../../../services/api';
import { toast } from 'react-toastify';

const useOrganization = (id) => {

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => {
      return getOrganizationById();
      // return true;
    },
    select: (data) => data.data.organization,
  });
  
  const editOrganizationMutation = useMutation(
    (data) => {
      return editOrganizationById(data.org_id,data.data);
    },
    {
      onSuccess: () => {
        toast.success('Organization updated successfully', {
          autoClose: 5000,
        });
      },
      onError: (error) => {
        console.log("error", error.response.data.error)
        toast.error(error.response.data.error, {
          autoClose: 5000,
        });
      }
    });
  
  return {
    data,
    isSuccess,
    isLoading,
    editOrganizationMutation,
  };
};

export default useOrganization;

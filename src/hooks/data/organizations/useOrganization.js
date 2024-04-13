import { useQuery } from '@tanstack/react-query';
import { getOrganizationById } from '../../../services/api';

const useOrganization = (id) => {

  const { data, isSuccess } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => {
      return getOrganizationById();
      // return true;
    },
    select: (data) => data.data.organization,
  });
  
  return {
    data,
    isSuccess,
  };
};

export default useOrganization;

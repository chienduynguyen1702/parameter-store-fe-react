import { useQuery } from '@tanstack/react-query';
// import { getOrganizationById } from '../../../services/api';
import { ORGANIZATION } from '../../mocks/organization';

const useOrganization = (id) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['organization'],
    queryFn: () => {
      // return getOrganizationById(id);
      return true;
    },
    // select: (data) => data.data.data,
  });

  return {
    data: ORGANIZATION,
    isSuccess,
  };
};

export default useOrganization;

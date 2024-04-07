import { useQuery } from '@tanstack/react-query';
import { getOrganizationById } from '../../../services/api';
import { ORGANIZATION } from '../../mocks/organization';

const useOrganization = (id) => {

  const { data, isSuccess } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => {
      return getOrganizationById();
      // return true;
    },
    select: (data) => data.data.organization,
  });
  console.log(data);
  return {
    data,
    isSuccess,
  };
};

export default useOrganization;

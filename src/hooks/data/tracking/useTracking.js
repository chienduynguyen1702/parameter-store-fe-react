import { useQuery } from '@tanstack/react-query';
import { getTracking } from '../../../services/api';

const useTracking = (id) => {

  const { data, isSuccess } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => {
      return getTracking(id);
      // return true;
    },
    select: (data) => data.data.data.tracking,
  });
  
  return {
    data,
    isSuccess,
  };
};

export default useTracking;

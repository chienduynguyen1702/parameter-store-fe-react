import { useQuery } from '@tanstack/react-query';

import { getListRole } from '../services/api';

export default function useSuggestionRoles() {
  const listRoles = useQuery({
    queryKey: ['suggestion-roles'],
    queryFn: () => {
      return getListRole({ page: 1, limit: 1000 });
    },
    select: (data) => {
      return data.data.data.roles.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
      }));
    },
  });
  return {
    listRoles,
  };
}

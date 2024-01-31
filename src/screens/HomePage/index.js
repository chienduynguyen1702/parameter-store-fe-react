import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Card } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import { getOrganizationById } from '../../services/api';

export default function HomePage() {
  const { me } = useContext(AuthContext);

  const { data, isSuccess } = useQuery({
    queryKey: ['organization'],
    queryFn: () => {
      return getOrganizationById(me.organizationId);
    },
    select: (data) => data.data.data,
  });

  return (
    <Card className={'pb-5'}>
      {/* <p className="color4 fs-2 text-center my-4">What do you want to do?</p> */}
      <p className="color4 fs-2 text-center my-4">
        {isSuccess && (
          <>
            {/* <p>{data.id}</p> */}
            {/* <p>{data.name}</p> */}
            <p>Welcome to {data.description}</p>
          </>
        )}
      </p>
    </Card>
  );
}

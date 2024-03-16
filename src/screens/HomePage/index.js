import { useContext } from 'react';

import { Card } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import { useOrganization } from '../../hooks/data';

export default function HomePage() {
  const { me } = useContext(AuthContext);

  const { data, isSuccess } = useOrganization(me.organizationId);
  console.log(data);

  return (
    <Card className={'pb-5'}>
      <p className="color4 fs-2 text-center my-4">
        {isSuccess && (
          <>
            <p>{data.id}</p>
            <p>{data.name}</p>
            <p>Welcome to {data.description}</p>
          </>
        )}
      </p>
    </Card>
  );
}

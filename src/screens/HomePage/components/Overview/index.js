import { useContext } from 'react';

import { Card } from '../../../../components';

import { AuthContext } from '../../../../context/AuthContext';
import { useOrganization } from '../../../../hooks/data';

const Overview = () => {
  const { me } = useContext(AuthContext);

  const { data, isSuccess } = useOrganization(me.organizationId);

  return (
    <Card className="mb-5">
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
};

export default Overview;

import React, { useMemo } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useMatch } from 'react-router-dom';

import { Decentralization } from '../../components';

const UsersAndSettings = () => {
  const navigate = useNavigate();

  const usersMatch = useMatch('/user-setting/users');

  const isUsersMode = useMemo(() => {
    return Boolean(usersMatch);
  }, [usersMatch]);

  return (
    <>
      <div className="d-flex mb-3 responsiveTwoButtons">
        <Decentralization permissions={['user']}>
          <button
            className={`navigateButton ${isUsersMode ? 'active' : ''} `}
            onClick={() => navigate('/user-setting/users')}
          >
            Users
          </button>
        </Decentralization>
        <Decentralization permissions={['role']}>
          <button
            className={`navigateButton ${!isUsersMode ? 'active' : ''} `}
            onClick={() => navigate('/user-setting/roles')}
          >
            Roles
          </button>
        </Decentralization>
      </div>
      <Outlet />
    </>
  );
};

export default UsersAndSettings;

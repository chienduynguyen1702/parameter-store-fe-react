import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { TailSpin } from 'react-loader-spinner';

const RequireAuth = ({ children, redirectTo }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated === true) {
    return <>{children}</>;
  } else if (isAuthenticated === false) {
    return <Navigate to={redirectTo} />;
  } else {
    return (
      <div className="d-flex justify-content-center min-vh-100 min-vw-100 align-items-center">
        <TailSpin
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
        />
      </div>
    );
  }
};

export default RequireAuth;

import React, { Suspense } from 'react';
import { TailSpin } from 'react-loader-spinner';

const SuspenseContainer = ({ children, isFullScreen = false }) => {
  return (
    <Suspense
      fallback={
        <div
          className={`d-flex justify-content-center align-items-center ${
            isFullScreen && ' min-vh-100 min-vw-100'
          }`}
        >
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
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspenseContainer;

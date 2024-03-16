import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const ProjectDetailPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex mb-3 responsiveTwoButtons">
        <button
          className={`navigateButton active`}
          onClick={() => navigate('/project-detail/overview')}
        >
          Overview
        </button>
        <button
          className={`navigateButton`}
          onClick={() => navigate('/project-detail/parameters')}
        >
          Parameters
        </button>
        <button
          className={`navigateButton`}
          onClick={() => navigate('/project-detail/tracking')}
        >
          Tracking
        </button>
      </div>
      <Outlet />
    </>
  );
};

export default ProjectDetailPage;

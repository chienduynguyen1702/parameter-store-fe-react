import React from 'react';
import { useNavigate, Outlet, useLocation, useParams } from 'react-router-dom';

const TABS = [
  { name: 'Overview', subPath: 'overview' },
  { name: 'Parameters', subPath: 'parameters' },
  { name: 'Tracking', subPath: 'tracking' },
];

const ProjectDetailPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const pathname = useLocation().pathname;

  return (
    <>
      <div className="d-flex mb-3 responsiveTwoButtons">
        {TABS.map((tab) => (
          <button
            key={tab.name}
            className={`navigateButton ${
              pathname.includes(tab.subPath) ? 'active' : ''
            }`}
            onClick={() => navigate(`/project-detail/${id}/${tab.subPath}`)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default ProjectDetailPage;

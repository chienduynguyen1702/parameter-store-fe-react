import React from 'react';
import { useNavigate, Outlet, useLocation, useParams } from 'react-router-dom';
import PageContent from '../../components/PageContent';
import { useProjectOverviewAndUserList } from '../../hooks/data';

const TABS = [
  { name: 'Dashboard', subPath: 'dashboard' },
  { name: 'Overview', subPath: 'overview' },
  { name: 'Parameters', subPath: 'parameters' },
  { name: 'Agent', subPath: 'agents' },
  { name: 'Tracking', subPath: 'tracking' },
];

const ProjectDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { overview } = useProjectOverviewAndUserList(id);

  const pathname = useLocation().pathname;

  return (
    <PageContent title={overview?.name} wide>
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
    </PageContent>
  );
};

export default ProjectDetailPage;


const colorMapping =[
  {
    name: 'Build',
    color: '#B5E4CA',
  },
  {
    name: 'Test',
    color: '#F6D55C',
  },
  {
    name: 'Deploy',
    color: '#9ecfff',
  },
  {
    name: 'Dev/Test',
    color: '#659EEA',
  },
  {
    name: 'Staging',
    color: '#F6D55C',
  },
  {
    name: 'Production',
    color: '#FFAFF2',
  },
]

const PARAMETERS = [
  {
    id: 1,
    name: 'BASE_URL',
    value: 'http://testserver:8080/api/v1',
    stage: {
      id: 1,
      name: 'Build',
    },
    environment: {
      id: 1,
      name: 'Dev/Test',
    },
    created_at: '2024-03-02T10:00:00Z',
    updated_at: '2024-03-02T10:00:00Z',
  },
  {
    id: 2,
    name: 'BASE_URL',
    value: 'http://staging.server:8080/api/v1',
    stage: {
      id: 1,
      name: 'Build',
    },
    environment: {
      id: 2,
      name: 'Staging',
    },
    created_at: '2024-03-02T10:00:00Z',
    updated_at: '2024-03-02T10:00:00Z',
  },
  {
    id: 3,
    name: 'BASE_URL',
    value: 'http://prod.server:8080/api/v1',
    stage: {
      id: 1,
      name: 'Build',
    },
    environment: {
      id: 3,
      name: 'Production',
    },
    created_at: '2024-03-02T10:00:00Z',
    updated_at: '2024-03-02T10:00:00Z',
  },
  {
    id: 4,
    name: 'ACCESS_TOKEN',
    value: 'ubrv875f3nc37g9if3onf',
    stage: {
      id: 1,
      name: 'Deploy',
    },
    environment: {
      id: 1,
      name: 'Dev/Test',
    },
    created_at: '2024-03-02T10:00:00Z',
    updated_at: '2024-03-02T10:00:00Z',
  },
  {
    id: 5,
    name: 'REFRESH_TOKEN',
    value: 'quiwnf9t2942rf2o3brf79',
    stage: {
      id: 1,
      name: 'Deploy',
    },
    environment: {
      id: 2,
      name: 'Staging',
    },
    created_at: '2024-03-02T10:00:00Z',
    updated_at: '2024-03-02T10:00:00Z',
  },
  {
    id: 6,
    name: 'ENABLE_LOGGING',

    value: 'true',
    stage: {
      id: 1,
      name: 'Build',
    },
    environment: {
      id: 3,
      name: 'Production',
    },
    created_at: '2024-03-02T10:00:00Z',
    updated_at: '2024-03-02T10:00:00Z',
  },
  {
    id: 7,
    name: 'ENABLE_LOGGING',
    value: 'false',
    stage: {
      id: 1,
      name: 'Test',
    },
    environment: {
      id: 1,
      name: 'Dev/Test',
    },
    created_at: '2024-03-02T10:00:00Z',
    updated_at: '2024-03-02T10:00:00Z',
  },
  {
    id: 8,
    name: 'ENABLE_SWAGGER',
    value: 'true',
    stage: {
      id: 1,
      name: 'Build',
    },
    environment: {
      id: 2,
      name: 'Staging',
    },
    created_at: '2024-03-02T10:00:00Z',
    updated_at: '2024-03-02T10:00:00Z',
  },
  {
    id: 9,
    name: 'ENABLE_LOGGING',
    value: 'false',
    stage: {
      id: 1,
      name: 'Build',
    },
    environment: {
      id: 3,
      name: 'Production',
    },
    created_at: '2024-03-02T10:00:00Z',
    updated_at: '2024-03-02T10:00:00Z',
  },
  {
    id: 10,
    name: 'ENABLE_LOGGING',
    value: 'true',
    stage: {
      id: 2,
      name: 'Deploy',
    },
    environment: {
      id: 1,
      name: 'Dev/Test',
    },
    created_at: '2024-03-02T10:00:00Z',
    updated_at: '2024-03-02T10:00:00Z',
  },
  {
    id:11,
    name: 'ENABLE_CORS',
    value: 'true',
    stage: {
      id: 2,
      name: 'Test',
    },
    environment: {
      id: 2,
      name: 'Staging',
    },
    created_at: '2024-03-02T10:00:00Z',
    updated_at: '2024-03-02T10:00:00Z',
  },
];


PARAMETERS.forEach(param => {
  const stageName = param.stage.name;
  const environmentName = param.environment.name;

  const mappedStageColor = colorMapping.find(mapping => mapping.name === stageName)?.color || colorMapping[2].color;
  param.stage.color = mappedStageColor;

  const mappedEnvironmentColor = colorMapping.find(mapping => mapping.name === environmentName)?.color || colorMapping[2].color;
  param.environment.color = mappedEnvironmentColor;
});
export{ PARAMETERS};
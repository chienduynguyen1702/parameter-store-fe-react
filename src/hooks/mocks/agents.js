export const AGENTS = [
  {
    id: 1,
    name: 'docker-swarm-b',
    description: 'Docker Swarm B',
    stage: {
      id: 1,
      name: 'Build',
    },
    environment: {
      id: 1,
      name: 'Dev/test',
    },
    last_used: '2024-08-01',
  },
  {
    id: 2,
    name: 'docker-swarm-c',
    description: 'Docker Swarm C',
    stage: {
      id: 2,
      name: 'Deploy',
    },
    environment: {
      id: 2,
      name: 'Staging',
    },
    last_used: '2024-08-01',
  },
  {
    id: 3,
    name: 'docker-swarm-d',
    description: 'Docker Swarm D',
    stage: {
      id: 3,
      name: 'Test',
    },
    environment: {
      id: 3,
      name: 'Production',
    },
    last_used: '2024-08-01',
  },
];

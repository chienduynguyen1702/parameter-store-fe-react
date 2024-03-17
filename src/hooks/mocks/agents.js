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
    project: [
      {
        id: 1,
        name: 'Project A',
      },
      {
        id: 2,
        name: 'Project B',
      },
    ],
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
    project: [
      {
        id: 3,
        name: 'Project C',
      },
      {
        id: 4,
        name: 'Project D',
      },
    ],
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
    project: [
      {
        id: 5,
        name: 'Project E',
      },
      {
        id: 6,
        name: 'Project F',
      },
    ],
  },
];

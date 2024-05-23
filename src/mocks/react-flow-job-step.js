export const Jobs = [
  {
    name: 'Prepare',
    steps: [
      { name: 'Get Short Hash Commit', status: 'completed' },
      { name: 'Get Short Hash Commit', status: 'completed' },
      { name: 'Get Short Hash Commit', status: 'completed' },
      { name: 'Get Short Hash Commit', status: 'completed' },
      { name: 'Get Short Hash Commit', status: 'completed' },
    ],
    depend_on: [],
  },
  {
    name: 'Build',
    steps: [
      { name: 'Node B.1', status: 'completed' },
      { name: 'Node B.1', status: 'completed' },
      { name: 'Node B.1', status: 'completed' },
      { name: 'Node B.2', status: 'running' },
      { name: 'Node B.3', status: 'pending' },
      { name: 'Node B.4', status: 'pending' },
      { name: 'Node B.3', status: 'pending' },
      { name: 'Node B.4', status: 'pending' },
      { name: 'Node B.3', status: 'pending' },
      { name: 'Node B.4', status: 'pending' },
      { name: 'Node B.3', status: 'pending' },
      { name: 'Node B.4', status: 'pending' },
    ],
    depend_on: ['Prepare'],
  },
  {
    name: 'Test',
    steps: [
      { name: 'Node C.1', status: 'pending' },
      { name: 'Node C.2', status: 'pending' },
      { name: 'Node C.3', status: 'pending' },
      { name: 'Node C.4', status: 'pending' },
    ],
    depend_on: ['Build'],
  },
  {
    name: 'Deploy',
    steps: [
      { name: 'Node D.1', status: 'pending' },
      { name: 'Node D.2', status: 'pending' },
      { name: 'Node D.3', status: 'pending' },
      { name: 'Node D.4', status: 'pending' },
    ],
    depend_on: ['Test'],
  },
];

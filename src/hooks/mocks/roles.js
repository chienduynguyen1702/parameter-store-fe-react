import { PERMISSIONS } from './permissions';

export const ROLES = [
  {
    id: 1,
    name: 'Developer',
    description: 'Developer',
    users_count: 3,
    permissions: PERMISSIONS,
    color : 'green-dark'
  },
  {
    id: 2,
    name: 'Project admin',
    description: 'Project admin',
    users_count: 6,
    permissions: PERMISSIONS,
    color : 'yellow'
  },
  {
    id: 3,
    name: 'Organization admin',
    description: 'Organization admin',
    users_count: 25,
    permissions: PERMISSIONS,
    color : 'blue-dark'
  },
];

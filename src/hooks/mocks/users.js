import { PROJECTS } from './projects';
import { ROLES } from './roles';

export const USERS = [
  {
    id: 1,
    username: 'User 1',
    phone: '0965656565',
    email: 'colorme1@gmail.com',
    avatar_url: 'https://i.pravatar.cc/300',

    projects: [PROJECTS[0], PROJECTS[1]],
    permissions_count: '12',
    roles: ROLES,
    last_sign_in: '2021-09-01T00:00:00.000Z',
  },
  {
    id: 1,
    username: 'User 1',
    phone: '0965656565',
    email: 'colorme1@gmail.com',
    avatar_url: 'https://i.pravatar.cc/300',

    projects: [PROJECTS[1]],
    permissions_count: '12',
    roles: [ROLES[0]],
    last_sign_in: '2021-09-01T00:00:00.000Z',
  },
  {
    id: 1,
    username: 'User 1',
    phone: '0965656565',
    email: 'colorme1@gmail.com',
    avatar_url: 'https://i.pravatar.cc/300',

    projects: [PROJECTS[1], PROJECTS[2]],
    permissions_count: '12',
    roles: [ROLES[1], ROLES[2]],
    last_sign_in: '2021-09-01T00:00:00.000Z',
  },
];

export const ARCHIVED_USERS = [
  {
    id: 1,
    name: 'User 1',
    archiver: 'Ba Tung',
    image: 'https://i.pravatar.cc/300',
  },
  {
    id: 2,
    name: 'User 2',
    archiver: 'Ba Tung',
    image: 'https://i.pravatar.cc/300',
  },
  {
    id: 3,
    name: 'User 3',
    archiver: 'Ba Tung',
    image: 'https://i.pravatar.cc/300',
  },
];

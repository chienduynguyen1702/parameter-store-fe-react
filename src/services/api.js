import authApi from './config/authApi.config';
import publicApi from './config/publicApi.config';

// ------------------------------ Authentication ------------------------------
export const login = (data) =>
  publicApi({
    method: 'POST',
    url: '/login',
    data,
  });

export const refreshToken = (data) =>
  publicApi({
    method: 'POST',
    url: '/refreshToken',
    data,
  });

export const logout = () =>
  authApi({
    method: 'POST',
    url: '/logout',
  });

export const forgotPassword = (email) => {
  publicApi({
    method: 'POST',
    url: '/forgotPassword',
    data: {
      email,
    },
  });
};

export const resetPassword = (data, token) =>
  publicApi({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'PUT',
    url: '/updatePassword',
    data,
  });

export const getMe = () =>
  authApi({
    method: 'GET',
    url: '/users/me',
  });

// ------------------------------ User ------------------------------

export const getListUser = (params) =>
  authApi({
    method: 'GET',
    url: '/users',
    params,
  });

export const addUser = (data) =>
  authApi({
    method: 'POST',
    url: '/users',
    data,
  });

export const editUser = (id, data) =>
  authApi({
    method: 'PUT',
    url: `/users/${id}`,
    data,
  });

export const getUser = (id) =>
  authApi({
    method: 'GET',
    url: `/users/${id}`,
  });

export const getArchivedUsers = () => {
  return authApi({
    method: 'GET',
    url: '/archived-users',
  });
};

export const archiveUser = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/users/${id}/archive`,
  });
};

export const unarchiveUser = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/users/${id}/unarchive`,
  });
};

// ------------------------------ Role ------------------------------

export const getListRole = (params) =>
  authApi({
    method: 'GET',
    url: '/roles',
    params,
  });

export const addRole = (data) =>
  authApi({
    method: 'POST',
    url: '/roles',
    data,
  });

export const editRole = (id, data) =>
  authApi({
    method: 'PUT',
    url: `/roles/${id}`,
    data,
  });

export const getRole = (id) =>
  authApi({
    method: 'GET',
    url: `/roles/${id}`,
  });

export const getArchivedRoles = () => {
  return authApi({
    method: 'GET',
    url: '/archived-roles',
  });
};

export const archiveRole = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/roles/archive/${id}`,
  });
};

export const unarchiveRole = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/roles/unarchive/${id}`,
  });
};

// ------------------------------ Permission ------------------------------

export const getListPermission = (params = null) =>
  authApi({
    method: 'GET',
    url: '/permissions',
    params,
  });

// ------------------------------ User Settings ------------------------------

export const getListSettings = (params) =>
  authApi({
    method: 'GET',
    url: '/settings',
    params,
  });

export const addSetting = (data) =>
  authApi({
    method: 'POST',
    url: '/settings',
    data,
  });

export const addListSettings = (data) =>
  authApi({
    method: 'POST',
    url: '/list-settings',
    data,
  });

export const editSetting = (id, data) =>
  authApi({
    method: 'PUT',
    url: `/settings/${id}`,
    data,
  });

// ------------------------------ Organization ------------------------------

export const getListOrganizations = (params) =>
  authApi({
    method: 'GET',
    url: '/organizations',
    params,
  });

export const addOrganization = (data) =>
  authApi({
    method: 'POST',
    url: '/organizations',
    data,
  });

export const editOrganizationById = (id, data) =>
  authApi({
    method: 'PUT',
    url: `/organizations/${id}`,
    data,
  });

export const getOrganizationById = (id) =>
  authApi({
    method: 'GET',
    url: `/organizations/${id}`,
  });

// ------------------------------ Project ------------------------------

export const getListProjects = (params) =>
  authApi({
    method: 'GET',
    url: '/projects',
    params,
  });

export const addProject = (data) =>
  authApi({
    method: 'POST',
    url: '/projects',
    data,
  });

export const editProjectById = (id, data) =>
  authApi({
    method: 'PUT',
    url: `/projects/${id}`,
    data,
  });

export const getProjectById = (id) =>
  authApi({
    method: 'GET',
    url: `/projects/${id}`,
  });

export const deleteProjectById = (id) =>
  authApi({
    method: 'DELETE',
    url: `/projects/${id}`,
  });

// ------------------------------ Secret ------------------------------

export const getListSecrets = (params) =>
  authApi({
    method: 'GET',
    url: '/secrets',
    params,
  });

export const addSecret = (data) =>
  authApi({
    method: 'POST',
    url: '/secrets',
    data,
  });

export const editSecret = (id, data) =>
  authApi({
    method: 'PUT',
    url: `/secrets/${id}`,
    data,
  });

export const getSecret = (id) =>
  authApi({
    method: 'GET',
    url: `/secrets/${id}`,
  });

export const deleteSecretById = (id) =>
  authApi({
    method: 'DELETE',
    url: `/secrets/${id}`,
  });

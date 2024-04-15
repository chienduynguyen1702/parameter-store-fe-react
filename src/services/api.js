import authApi from './config/authApi.config';
import publicApi from './config/publicApi.config';

// ------------------------------ Authentication ------------------------------
export const login = (data) =>
  publicApi({
    method: 'POST',
    url: '/auth/login',
    data,
  });

export const validate = () =>
  authApi({
    method: 'GET',
    url: '/auth/validate',
  });

export const logout = () =>
  authApi({
    method: 'POST',
    url: '/auth/logout',
  });

export const forgotPassword = (email) => {
  publicApi({
    method: 'POST',
    url: '/auth/forgotPassword',
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
    url: '/settings/users',
    params,
  });

export const addUser = (data) =>
  authApi({
    method: 'POST',
    url: '/settings/users',
    data,
  });

export const editUser = (id, data) =>
  authApi({
    method: 'PUT',
    url: `/settings/users/${id}`,
    data,
  });

export const getUser = (id) =>
  authApi({
    method: 'GET',
    url: `/settings/users/${id}`,
  });

export const getArchivedUsers = () => {
  return authApi({
    method: 'GET',
    url: '/settings/users/archived',
  });
};

export const archiveUser = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/settings/users/${id}/archive`,
  });
};

export const unarchiveUser = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/settings/users/${id}/unarchive`,
  });
};

// ------------------------------ Role ------------------------------

export const getListRoles = (params) =>
  authApi({
    method: 'GET',
    url: '/settings/roles/',
    params,
    withCredentials : true,
  });

export const addRole = (data) =>
  authApi({
    method: 'POST',
    url: '/settings/roles',
    data,
  });

export const editRole = (id, data) =>
  authApi({
    method: 'PUT',
    url: `/settings/roles/${id}`,
    data,
  });

export const getRole = (id) =>
  authApi({
    method: 'GET',
    url: `/settings/roles/${id}`,
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

// ------------------------------ Organization ------------------------------

export const editOrganizationById = (id, data) =>
  authApi({
    method: 'PUT',
    url: `/organizations/${id}`,
    data,
  });

export const getOrganizationById = () =>
  authApi({
    method: 'GET',
    url: `/organizations/`,
  });
export const getOrganizationByID = (org_id) =>
  authApi({
    method: 'GET',
    url: `/organizations/${org_id}`,
  });

// ------------------------------ Project List ------------------------------

export const getListProjects = (params) =>
  authApi({
    method: 'GET',
    url: '/project-list/',
    params,
  });

export const addProject = (data) =>
console.log("addProject data",data) ||
  authApi({
    method: 'POST',
    url: '/project-list/',
    data,
  });

export const getArchivedProjects = () => {
  return authApi({
    method: 'GET',
    url: `/project-list/archived`,
  });
};

export const archiveProject = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/project-list/${id}/archive`,
  });
};

export const unarchiveProject = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/project-list/${id}/unarchive`,
  });
};
  
export const editProject = (id, data) =>
  authApi({
    method: 'PUT',
    url: `/projects/${id}/overview/`,
    data,
  });
// ------------------------------ Project Detail ------------------------------

export const addUserToProject = (id, data) =>
console.log("addUserToProject data",data) ||
  authApi({
    method: 'POST',
    url: `/projects/${id}/overview/add-user`,
    data,
  });

export const getProjectOverview = (id) =>
  authApi({
    method: 'GET',
    url: `/projects/${id}/overview/`,
  });

export const deleteProject = (id) =>
  authApi({
    method: 'DELETE',
    url: `/projects/${id}`,
  });

// ------------------------------ Parameter ------------------------------

export const getListParameter = (project_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/parameters/`,
  });
export const getParameterByID = (project_id, parameter_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/parameters/${parameter_id}`,
  });
export const addParameter = (project_id,data) =>
  authApi({
    method: 'POST',
    url: `/projects/${project_id}/parameters/`,
    data,
  });

export const editParameter = (project_id, parameter_id, data) =>
  authApi({
    method: 'PUT',
    url: `/projects/${project_id}/parameters/${parameter_id}`,
    data,
  });

export const getArchivedParameters = (project_id) => {
  return authApi({
    method: 'GET',
    url: `/projects/${project_id}/parameters/archived`,
  });
};

export const archiveParameter = (project_id, parameter_id) => {
  return authApi({
    method: 'PATCH',
    url: `/projects/${project_id}/parameters/${parameter_id}/archive`,
  });
};

export const unarchiveParameter = (project_id, parameter_id) => {
  return authApi({
    method: 'PATCH',
    url: `/projects/${project_id}/parameters/${parameter_id}/unarchive`,
  });
};

export const getStages = () =>
  authApi({
    method: 'GET',
    url: '/stages/',
  });

export const getEnvironments = () =>
  authApi({
    method: 'GET',
    url: '/envs/',
  });
export const getVersions = (project_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/versions/`,
  });
// ------------------------------ Agent ------------------------------

export const getListAgent = (project_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/agents/`,
    // params,
  });

export const addAgent = (project_id,data) =>
  authApi({
    method: 'POST',
    url: `/projects/${project_id}/agents/`,
    data,
  });

export const editAgent = (project_id,agent_id, data) =>
  authApi({
    method: 'PUT',
    url: `/projects/${project_id}/agents/${agent_id}`,
    data,
  });

export const getAgentById = (project_id,agent_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/agents/${agent_id}`,
  });

export const deleteAgent = (project_id,agent_id) => {
  return authApi({
    method: 'DELETE',
    url: `/projects/${project_id}/agents/${agent_id}/`,
  });
}  

export const getArchivedAgents = (project_id) => {
  return authApi({
    method: 'GET',
    url: `/projects/${project_id}/agents/archived`,
  });
};

export const archiveAgent = (project_id, agent_id) => {
  return authApi({
    method: 'PATCH',
    url: `/projects/${project_id}/agents/${agent_id}/archive`,
  });
};

export const unarchiveAgent = (project_id, agent_id) => {
  return authApi({
    method: 'PATCH',
    url: `/projects/${project_id}/agents/${agent_id}/unarchive`,
  });
};


// ------------------------------ Tracking ------------------------------
export const getTracking = (project_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/tracking/`,
  });
// ------------------------------ Logger ------------------------------
export const getListLogger = (params) =>
  authApi({
    method: 'GET',
    url: '/users',
    params,
  });

export const getLoggerSummary = (params) =>
  authApi({
    method: 'GET',
    url: '/loggers/summary',
    params,
  });

export const getAmountLoggerByDay = (params) =>
  authApi({
    method: 'GET',
    url: '/loggers/amount-by-day',
    params,
  });

import authApi from './config/authApi.config';
import publicApi from './config/publicApi.config';

// ------------------------------ Authentication ------------------------------
export const login = (data) =>
  publicApi({
    method: 'POST',
    url: '/auth/login',
    data,
  });
export const loginWithGithub = (data) =>
  publicApi({
    method: 'POST',
    url: '/auth/login/github',
    data,
  });

export const validate = () =>
  authApi({
    method: 'GET',
    url: '/auth/validate',
  });

export const signUp = (data) => {
  return publicApi({
    method: 'POST',
    url: '/auth/register',
    data,
  });
};

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

export const getListUser = (queryString) =>
  authApi({
    method: 'GET',
    url: '/settings/users',
    params: queryString,
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
    withCredentials: true,
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
export const getOrganizationDashboardTotals = (org_id, project, from, to) =>
  authApi({
    method: 'GET',
    url: `/organizations/dashboard/totals`,
    params: {
      project,
      from,
      to,
    },
  });

export const getOrganizationDashboardLogs = (
  org_id,
  project,
  granularity,
  from,
  to,
) =>
  authApi({
    method: 'GET',
    url: `/organizations/dashboard/logs`,
    params: {
      project,
      from,
      to,
      granularity,
    },
  });
// ------------------------------ Project List ------------------------------

export const getListProjects = (params, queryString) =>
  authApi({
    method: 'GET',
    url: '/project-list/',
    params: queryString,
  });

export const addProject = (data) =>
  console.log('addProject data', data) ||
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

export const applyParameters = (project_id) =>
  authApi({
    method: 'POST',
    url: `/projects/${project_id}/apply-parameters`,
  });
export const releaseVersionParameters = (project_id, data) =>
  authApi({
    method: 'POST',
    url: `/projects/${project_id}/versions/`,
    data,
  });
// ------------------------------ Project Detail ------------------------------

export const addUserToProject = (project_id, data) =>
  console.log('addUserToProject data', data) ||
  authApi({
    method: 'POST',
    url: `/projects/${project_id}/overview/add-user`,
    data,
  });
export const editUserInProject = (project_id, user_id, data) =>
  authApi({
    method: 'PUT',
    url: `/projects/${project_id}/overview/users/${user_id}`,
    data,
  });
export const removeUserInProject = (project_id, user_id) =>
  authApi({
    method: 'DELETE',
    url: `/projects/${project_id}/overview/users/${user_id}`,
  });
export const getUserInProject = (project_id, user_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/overview/users/${user_id}`,
  });
export const getProjectOverview = (project_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/overview/`,
  });
export const getProjectListWorkflows = (project_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/workflows/`,
  });
export const getWorkflowsRunID = (project_id, workflow_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/workflows/${workflow_id}/run`,
  });
export const deleteProject = (project_id) =>
  authApi({
    method: 'DELETE',
    url: `/projects/${project_id}`,
  });

export const getProjectDashboardTotals = (project_id, granularity) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/dashboard/totals`,
    params: {
      granularity,
    },
  });
export const getProjectDashboardLogs = (project_id, granularity, from, to) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/dashboard/logs`,
    params: {
      granularity,
      from,
      to,
    },
  });

// ------------------------------ Project stages ------------------------------
export const getProjectStages = (id) =>
  authApi({
    method: 'GET',
    url: `/projects/${id}/stages/`,
  });

export const addStage = (id, data) =>
  authApi({
    method: 'POST',
    url: `/projects/${id}/stages/`,
    data,
  });

export const editStage = (project_id, stage_id, data) =>
  authApi({
    method: 'PUT',
    url: `/projects/${project_id}/stages/${stage_id}`,
    data,
  });

export const getStageByID = (project_id, stage_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/stages/${stage_id}`,
  });

export const getArchivedStages = (project_id) => {
  return authApi({
    method: 'GET',
    url: `/projects/${project_id}/stages/archived`,
  });
};

export const archiveStage = (project_id, stage_id) => {
  return authApi({
    method: 'PATCH',
    url: `/projects/${project_id}/stages/${stage_id}/archive`,
  });
};

export const unarchiveStage = (project_id, stage_id) => {
  return authApi({
    method: 'PATCH',
    url: `/projects/${project_id}/stages/${stage_id}/unarchive`,
  });
};

// ------------------------------ Project environments ------------------------------
export const getProjectEnvironments = (id) =>
  authApi({
    method: 'GET',
    url: `/projects/${id}/environments/`,
  });

export const addEnvironment = (id, data) =>
  authApi({
    method: 'POST',
    url: `/projects/${id}/environments/`,
    data,
  });

export const editEnvironment = (project_id, environment_id, data) =>
  authApi({
    method: 'PUT',
    url: `/projects/${project_id}/environments/${environment_id}`,
    data,
  });

export const getEnvironmentByID = (project_id, environment_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/environments/${environment_id}`,
  });

export const getArchivedEnvironments = (project_id) => {
  return authApi({
    method: 'GET',
    url: `/projects/${project_id}/environments/archived`,
  });
};

export const archiveEnvironment = (project_id, environment_id) => {
  return authApi({
    method: 'PATCH',
    url: `/projects/${project_id}/environments/${environment_id}/archive`,
  });
};

export const unarchiveEnvironment = (project_id, environment_id) => {
  return authApi({
    method: 'PATCH',
    url: `/projects/${project_id}/environments/${environment_id}/unarchive`,
  });
};

// ------------------------------ Parameter ------------------------------

export const getListParameter = (project_id, queryString) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/parameters/`,
    params: queryString,
  });
export const downloadListParameter = (project_id, queryString) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/parameters/download`,
    params: queryString,
  });

export const getParameterByID = (project_id, parameter_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/parameters/${parameter_id}`,
  });
export const addParameter = (project_id, data) =>
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
export const downloadTemplateParam = (project_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/parameters/download-template`,
    responseType: 'blob',
  });

export const checkParamUsingInRepo = (project_id, data) =>
  authApi({
    method: 'POST',
    url: `/projects/${project_id}/parameters/check-using`,
    data,
  });

export const uploadFileParam = (project_id, data) =>
  authApi({
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    method: 'POST',
    url: `/projects/${project_id}/parameters/upload`,
    data,
  });
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

export const getListAgent = (project_id, queryString) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/agents/`,
    params: queryString,
  });

export const addAgent = (project_id, data) =>
  authApi({
    method: 'POST',
    url: `/projects/${project_id}/agents/`,
    data,
  });

export const editAgent = (project_id, agent_id, data) =>
  authApi({
    method: 'PUT',
    url: `/projects/${project_id}/agents/${agent_id}`,
    data,
  });

export const getAgentById = (project_id, agent_id) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/agents/${agent_id}`,
  });

export const deleteAgent = (project_id, agent_id) => {
  return authApi({
    method: 'DELETE',
    url: `/projects/${project_id}/agents/${agent_id}/`,
  });
};
export const downloadAgentScript = () => {
  return authApi({
    method: 'GET',
    url: `/agents/download`,
  });
};
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
export const getTracking = (project_id, from, to) =>
  authApi({
    method: 'GET',
    url: `/projects/${project_id}/tracking/logs`,
    params: {
      from,
      to,
    },
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

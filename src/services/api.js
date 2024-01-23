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

export const exportUsers = (params) => {
  return authApi({
    method: 'GET',
    url: '/users/export',
    params,
  });
};

export const testImportUsers = (data) => {
  return authApi({
    method: 'POST',
    url: `/users/testImportUser`,
    data,
  });
};

export const importUsers = (data) => {
  return authApi({
    method: 'POST',
    url: `/users/import`,
    data,
  });
};

export const uploadImage = (data) => {
  return authApi({
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: '/upload-image',
    data,
  });
};

export const getListAgency = () => {
  return authApi({
    method: 'Get',
    url: `/users/agency`,
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

// ------------------------------ ME ------------------------------
export const getMyInfo = () =>
  authApi({
    method: 'GET',
    url: '/me',
  });

export const editMyInfo = (data) =>
  authApi({
    method: 'PUT',
    url: `/me`,
    data,
  });

export const getMyTikTokContent = (params) =>
  authApi({
    method: 'GET',
    url: '/me/tiktok',
    params,
  });

export const getMyYoutubeContent = (params) =>
  authApi({
    method: 'GET',
    url: '/me/youtube',
    params,
  });

export const getMyFacebookContent = (params) =>
  authApi({
    method: 'GET',
    url: '/me/facebook',
    params,
  });

export const getMyInstagramContent = (params) =>
  authApi({
    method: 'GET',
    url: '/me/instagram',
    params,
  });

export const getMyOtherContent = (params) =>
  authApi({
    method: 'GET',
    url: '/me/evidence',
    params,
  });

export const getMyArchiveOtherContents = () =>
  authApi({
    method: 'GET',
    url: '/me/otherContent/archived',
  });

export const createMyOtherContent = (data) =>
  authApi({
    method: 'POST',
    url: '/me/otherContent/create',
    data,
  });

export const getMyListProductSold = (params) =>
  authApi({
    method: 'Get',
    url: '/me/product_sold',
    params,
  });

export const getMyTotalProductSold = (params) =>
  authApi({
    method: 'Get',
    url: '/me/product_sold/total',
    params,
  });
// ------------------------------ Permission ------------------------------

export const getListPermission = (params = null) =>
  authApi({
    method: 'GET',
    url: '/permissions',
    params,
  });

// ------------------------------ KOC -------------------------------------

export const getListKOC = (params) =>
  authApi({
    method: 'GET',
    url: '/users',
    params: { ...params, isKOC: true },
  });

export const addKOC = (data) =>
  authApi({
    method: 'POST',
    url: '/users',
    data: { ...data, is_koc: true },
  });

export const editKOC = (id, data) =>
  authApi({
    method: 'PUT',
    url: `/users/${id}`,
    data: { ...data, is_koc: true },
  });

export const getKOC = (id) =>
  authApi({
    method: 'GET',
    url: `/users/${id}`,
  });

export const getArchivedKOCs = () => {
  return authApi({
    method: 'GET',
    url: '/archived-users',
    params: { isKOC: true },
  });
};

export const archiveKOC = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/users/${id}/archive`,
  });
};

export const unarchiveKOC = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/users/${id}/unarchive`,
  });
};

export const exportKOCs = (params) => {
  return authApi({
    method: 'GET',
    url: '/users/export',
    params: {
      ...params,
      isKOC: true,
    },
  });
};

export const getKOCSummary = () => {
  return authApi({
    method: 'POST',
    url: '/users/summary',
    params: { isKOC: true },
  });
};

export const getKOCsProfileOverviewView = (id, params) => {
  return authApi({
    method: 'GET',
    url: `/users/overview-view/${id}`,
    params,
  });
};

export const getKOCsProfileOverviewRevenue = (id, params) => {
  return authApi({
    method: 'GET',
    url: `/users/overview-revenue/${id}`,
    params,
  });
};

export const getKOCsProfileOverviewProductSold = (id, params) => {
  return authApi({
    method: 'GET',
    url: `/users/overview-product_sold/${id}`,
    params,
  });
};

export const getKOCsProfileOverviewContent = (id, params) => {
  return authApi({
    method: 'GET',
    url: `/users/overview-content/${id}`,
    params,
  });
};

// ------------------------------ KOC profile -------------------------------------
export const lastTimeUpdateContent = () => {
  return authApi({
    method: 'GET',
    url: `/contents/lastTimeUpdate`,
  });
};

export const getTikTokContents = (params) => {
  return authApi({
    method: 'GET',
    url: `contents/tiktok`,
    params,
  });
};

export const getTikTokContentsSummary = (params) => {
  return authApi({
    method: 'GET',
    url: `contents/tiktok/summary`,
    params,
  });
};

export const getInstagramContents = (params) => {
  return authApi({
    method: 'GET',
    url: `contents/instagram`,
    params,
  });
};

export const getYoutubeContents = (params) => {
  return authApi({
    method: 'GET',
    url: `contents/youtube`,
    params,
  });
};

export const getFacebookContents = (params) => {
  return authApi({
    method: 'GET',
    url: `contents/facebook`,
    params,
  });
};

export const getTikTokContentsByKOC = (params) => {
  return authApi({
    method: 'GET',
    url: `contents/tiktok/${params.ownerId}`,
    params,
  });
};

export const getInstagramContentsByKOC = (params) => {
  return authApi({
    method: 'GET',
    url: `contents/instagram/${params.ownerId}`,
    params,
  });
};

export const getYoutubeContentsByKOC = (params) => {
  return authApi({
    method: 'GET',
    url: `contents/youtube/${params.ownerId}`,
    params,
  });
};

export const getFacebookContentsByKOC = (params) => {
  return authApi({
    method: 'GET',
    url: `contents/facebook/${params.ownerId}`,
    params,
  });
};

export const getListProductSoldByKOC = (params) => {
  return authApi({
    method: 'GET',
    url: `users/product_sold/${params.ownerId}`,
    params,
  });
};

export const getTotalProductSoldByKOC = (params) => {
  return authApi({
    method: 'GET',
    url: `users/overview_product_sold/total/${params.ownerId}`,
    params,
  });
};
// ------------------------------ Upload Evidence -------------------------------------
export const getTikTokContentsByIdKOC = (id, params) => {
  return authApi({
    method: 'GET',
    url: `contents/tiktok/${id}`,
    params,
  });
};

export const getOtherContentList = (params) => {
  return authApi({
    method: 'GET',
    url: 'content-others',
    params,
  });
};

export const getInstagramContentsByIdKOC = (id, params) => {
  return authApi({
    method: 'GET',
    url: `contents/instagram/${id}`,
    params,
  });
};

export const getYoutubeContentsByIdKOC = (id, params) => {
  return authApi({
    method: 'GET',
    url: `contents/youtube/${id}`,
    params,
  });
};

export const getFacebookContentsByIdKOC = (id, params) => {
  return authApi({
    method: 'GET',
    url: `contents/facebook/${id}`,
    params,
  });
};

// ------------------------------ Content ------------------------------

export const importContents = (data) =>
  authApi({
    method: 'POST',
    url: '/contents/import',
    data,
  });

export const getListContent = (params) =>
  authApi({
    method: 'GET',
    url: '/hashtag',
    params,
  });
export const exportTikTokContents = (params) => {
  return authApi({
    method: 'GET',
    url: '/contents/tiktok/export',
    params,
  });
};

export const exportYoutubeContents = (params) => {
  return authApi({
    method: 'GET',
    url: '/contents/youtube/export',
    params,
  });
};

export const exportEvidenceContents = (params) => {
  return authApi({
    method: 'GET',
    url: '/contents/evidence/export',
    params,
  });
};

export const exportFacebookContents = (params) => {
  return authApi({
    method: 'GET',
    url: '/contents/facebook/export',
    params,
  });
};

export const exportInstagramContents = (params) => {
  return authApi({
    method: 'GET',
    url: '/contents/instagram/export',
    params,
  });
};

export const deleteTikTokContent = (id) => {
  return authApi({
    method: 'DELETE',
    url: `/contents/tiktok/${id}`,
  });
};

export const getContentsStatistic = (params) => {
  return authApi({
    method: 'GET',
    url: '/contents/statistic',
    params,
  });
};

export const getTotalContentsStatistic = (params) => {
  return authApi({
    method: 'GET',
    url: '/contents/total',
    params,
  });
};

export const getProductsStatistic = (params) => {
  return authApi({
    method: 'GET',
    url: '/contents/products/statistic',
    params,
  });
};

export const getTotalProductsStatistic = (params) => {
  return authApi({
    method: 'GET',
    url: '/contents/products/total',
    params,
  });
};

export const getOrdersStatistic = (params) => {
  return authApi({
    method: 'GET',
    url: '/contents/orders/statistic',
    params,
  });
};

export const getTotalOrdersStatistic = (params) => {
  return authApi({
    method: 'GET',
    url: '/contents/orders/total',
    params,
  });
};

// ------------------------------ Product -------------------------------------
export const getTikTokContentsByProduct = (params) => {
  return authApi({
    method: 'GET',
    url: `contents/tiktok/${params.ownerId}`,
    params,
  });
};

export const getInstagramContentsByProduct = (params) => {
  return authApi({
    method: 'GET',
    url: `contents/instagram/${params.ownerId}`,
    params,
  });
};

export const getYoutubeContentsByProduct = (params) => {
  return authApi({
    method: 'GET',
    url: `contents/youtube/${params.ownerId}`,
    params,
  });
};

export const getFacebookContentsByProduct = (params) => {
  return authApi({
    method: 'GET',
    url: `contents/tiktok/${params.ownerId}`,
    params,
  });
};

export const getArchivedProducts = () => {
  return authApi({
    method: 'GET',
    url: '/products/archived-product',
  });
};

export const archiveProduct = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/products/${id}/archive`,
  });
};

export const unarchiveProduct = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/products/${id}/unarchive`,
  });
};

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

// ------------------------------ Task -------------------------------------

export const getListTasks = (params) =>
  authApi({
    method: 'GET',
    url: '/tasks',
    params: { ...params },
  });

export const getMyListTasks = (params) =>
  authApi({
    method: 'GET',
    url: `/tasks/getMyTasks`,
    params: { ...params },
  });

export const addTask = (data) =>
  authApi({
    method: 'POST',
    url: '/tasks',
    data: { ...data },
  });

export const editTask = (id, data) =>
  authApi({
    method: 'PUT',
    url: `/tasks/${id}`,
    data: { ...data },
  });

export const getTask = (id) =>
  authApi({
    method: 'GET',
    url: `/tasks/${id}`,
  });

export const getArchivedTasks = () => {
  return authApi({
    method: 'GET',
    url: '/tasks/archived-tasks',
  });
};

export const exportTasks = () => {
  return authApi({
    method: 'GET',
    url: '/tasks/export',
  });
};

export const archiveTask = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/tasks/${id}/archive`,
  });
};

export const unarchiveTask = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/tasks/${id}/unarchive`,
  });
};

export const uploadContentEvidence = (id, contentId, evidenceType) => {
  return authApi({
    method: 'POST',
    url: `/tasks/uploadContentEvidence/${id}/${contentId}`,
    params: { evidenceType: evidenceType },
  });
};

// ------------------------------ Task Settings ------------------------------

export const getTaskSettings = (params) =>
  authApi({
    method: 'GET',
    url: '/settings',
    params,
  });

export const addTaskSetting = (data) =>
  authApi({
    method: 'POST',
    url: '/settings',
    data,
  });

export const editTaskSetting = (id, data) =>
  authApi({
    method: 'PUT',
    url: `/settings/${id}`,
    data,
  });

// ------------------------------ Evidence ------------------------------
export const getOtherContentsByKOC = (params) => {
  return authApi({
    method: 'GET',
    url: `/content-others/koc/${params.ownerId}`,
    params,
  });
};

export const getOtherContentsById = (id) => {
  return authApi({
    method: 'GET',
    url: `/content-others/${id}`,
  });
};

export const addOtherContents = (userId, data) => {
  return authApi({
    method: 'POST',
    url: `/content-others/${userId}/create`,
    data,
  });
};

export const editOtherContents = (id, data) => {
  return authApi({
    method: 'PUT',
    url: `/content-others/update/${id}`,
    data,
  });
};

export const getArchiveOtherContents = (id, params) => {
  return authApi({
    method: 'GET',
    url: `/content-others/${id}/archived`,
    params,
  });
};

export const archiveOtherContents = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/content-others/archive/${id}`,
  });
};

export const deleteOtherContents = (id) => {
  return authApi({
    method: 'DELETE',
    url: `/content-others/delete/${id}`,
  });
};

export const unArchiveOtherContents = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/content-others/unarchive/${id}`,
  });
};

// ------------------------------ Products ------------------------------

export const getListProducts = (params) =>
  authApi({
    method: 'GET',
    url: '/products',
    params,
  });

export const getProduct = (id) =>
  authApi({
    method: 'GET',
    url: `/products/product/${id}`,
  });

export const addProduct = (data) => {
  return authApi({
    method: 'POST',
    url: `/products`,
    data,
  });
};

export const editProduct = (id, data) => {
  return authApi({
    method: 'PUT',
    url: `/products/product/${id}`,
    data,
  });
};

export const getProductsBySKUCode = (skuCode, params) =>
  authApi({
    method: 'GET',
    url: `/products/${skuCode}`,
    params,
  });

export const getContentsOnTikTokBySKUCode = (skuCode, params) =>
  authApi({
    method: 'GET',
    url: `/products/${skuCode}/tiktok`,
    params,
  });

export const getContentsOnFacebookBySKUCode = (skuCode, params) =>
  authApi({
    method: 'GET',
    url: `/products/${skuCode}/facebook`,
    params,
  });

export const getContentsOnInstagramBySKUCode = (skuCode, params) =>
  authApi({
    method: 'GET',
    url: `/products/${skuCode}/instagram`,
    params,
  });

export const getContentsOnYoutubeBySKUCode = (skuCode, params) =>
  authApi({
    method: 'GET',
    url: `/products/${skuCode}/youtube`,
    params,
  });

export const getKOCsBySKUCode = (skuCode, params) =>
  authApi({
    method: 'GET',
    url: `/products/${skuCode}/kocs`,
    params,
  });

export const getTasksBySKUCode = (skuCode, params) =>
  authApi({
    method: 'GET',
    url: `/products/${skuCode}/tasks`,
    params,
  });

export const getColumnName = () =>
  authApi({
    method: 'GET',
    url: `/products/column-name`,
  });

export const exportProducts = (params) => {
  return authApi({
    method: 'GET',
    url: `/products/export`,
    params,
  });
};

export const importProducts = (data) => {
  return authApi({
    method: 'POST',
    url: `/products/import`,
    data,
  });
};

export const importPerformances = (data) => {
  return authApi({
    method: 'POST',
    url: `/products/import-performance`,
    data,
  });
};

export const getOrdersBySKUCode = (skuCode, params) =>
  authApi({
    method: 'GET',
    url: `/products/${skuCode}/orders`,
    params,
  });

export const getGMVProductBySKUCode = (skuCode, params) =>
  authApi({
    method: 'GET',
    url: `/products/${skuCode}/gmv`,
    params,
  });

export const getViewBySKUCode = (skuCode, params) =>
  authApi({
    method: 'GET',
    url: `/products/${skuCode}/view`,
    params,
  });

export const getContentBySKUCode = (skuCode, params) =>
  authApi({
    method: 'GET',
    url: `/products/${skuCode}/content`,
    params,
  });

export const getSoldBySKUCode = (skuCode, params) =>
  authApi({
    method: 'GET',
    url: `/products/${skuCode}/sold`,
    params,
  });

// ------------------------------ Orders ------------------------------

export const getListOrders = (params) =>
  authApi({
    method: 'GET',
    url: '/orders',
    params,
  });

export const getMyListOrders = (params) =>
  authApi({
    method: 'GET',
    url: '/orders/get-my-orders',
    params,
  });

export const getOrderById = (id, params) =>
  authApi({
    method: 'GET',
    url: `/orders/${id}`,
    params,
  });

export const getProductsByIdOrder = (idOrder, params) =>
  authApi({
    method: 'GET',
    url: `/orders/product/${idOrder}`,
    params,
  });

export const getColumnNameOrders = () =>
  authApi({
    method: 'GET',
    url: `/orders/column-name`,
  });

export const importOrders = (data) => {
  return authApi({
    method: 'POST',
    url: `/orders/import`,
    data,
  });
};

export const exportOrders = (params) => {
  return authApi({
    method: 'GET',
    url: `/orders/export/${params}`,
  });
};

export const getArchivedOrders = () => {
  return authApi({
    method: 'GET',
    url: '/orders/archived-orders',
  });
};

export const archiveOrder = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/orders/${id}/archive`,
  });
};

export const unarchiveOrder = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/orders/${id}/unarchive`,
  });
};

// ------------------------------ Dashboard ------------------------------
// ------------------------------ Dashboard Contents ------------------------------

export const getStatisticsContentsOfViews = (granularity, params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/views/${granularity}`,
    params,
  });
};

export const getStatisticsContentsOfLikes = (granularity, params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/likes/${granularity}`,
    params,
  });
};

export const getStatisticsContentsOfComments = (granularity, params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/comments/${granularity}`,
    params,
  });
};

export const getStatisticsContentsOfShares = (granularity, params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/shares/${granularity}`,
    params,
  });
};

export const getStatisticsContentsOfSaves = (granularity, params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/saves/${granularity}`,
    params,
  });
};

export const getStatisticsContentsOfTotalViews = (params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/total/views`,
    params,
  });
};

export const getStatisticsContentsOfTotalLikes = (params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/total/likes`,
    params,
  });
};

export const getStatisticsContentsOfTotalComments = (params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/total/comments`,
    params,
  });
};

export const getStatisticsContentsOfTotalShares = (params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/total/shares`,
    params,
  });
};

export const getTotalInteractOfContents = (params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/total/all`,
    params,
  });
};

export const getSummaryCardContents = (params) => {
  return authApi({
    method: 'GET',
    url: `/contents/totalStatistic`,
    params,
  });
};

export const getStatisticsContents = (params) => {
  return authApi({
    method: 'GET',
    url: `/contents/statisticContent`,
    params,
  });
};

// ------------------------------ Dashboard KOCs ------------------------------
export const getStatisticsKOCs = (params) => {
  return authApi({
    method: 'GET',
    url: `/users/statistic`,
    params,
  });
};

export const getStatisticsKOCActive = (params) => {
  return authApi({
    method: 'Get',
    url: `/statistic/activeKOC`,
    params,
  });
};

export const getStatisticsInteract = (params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/total-interact`,
    params,
  });
};

// ------------------------------ Dashboard Orders ------------------------------
export const getStatisticsOrders = (params) => {
  return authApi({
    method: 'GET',
    url: `/orders/statistic`,
    params,
  });
};

// ------------------------------ Dashboard Products ------------------------------
export const getStatisticsProducts = (params) => {
  return authApi({
    method: 'GET',
    url: `/products/statistic`,
    params,
  });
};

// ------------------------------ Dashboard Highlights ------------------------------
export const getStatisticsHighlights = (params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/highlight`,
    params,
  });
};

export const getAverageViewsPerKOC = (params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/average/view-per-koc`,
    params,
  });
};

export const getTopUsers = (params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/top-users`,
    params,
  });
};

export const getTopHashtags = (params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/top-hashtags`,
    params,
  });
};

export const getListHashtags = (params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/list-hashtags`,
    params,
  });
};

export const getTopVideos = (params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/top-videos`,
    params,
  });
};

export const getTopProducts = (params) => {
  return authApi({
    method: 'GET',
    url: `/statistic/top-products`,
    params,
  });
};

// ------------------------------ Liquidation ------------------------------
export const addLiquidation = (data) => {
  return authApi({
    method: 'POST',
    url: `/liquidations`,
    data,
  });
};

export const getListLiquidation = (params) => {
  return authApi({
    method: 'GET',
    url: `/liquidations`,
    params,
  });
};

export const updateLiquidation = (id, data) => {
  return authApi({
    method: 'PUT',
    url: `/liquidations/${id}`,
    data,
  });
};

export const getLiquidationById = (id) => {
  return authApi({
    method: 'GET',
    url: `/liquidations/${id}`,
  });
};

export const exportLiquidations = (params) => {
  return authApi({
    method: 'GET',
    url: '/liquidations/export',
    params,
  });
};

export const getArchivedLiquidation = () => {
  return authApi({
    method: 'GET',
    url: `/liquidations/archived-liquidations`,
  });
};

export const archiveLiquidation = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/liquidations/${id}/archive`,
  });
};

export const unarchiveLiquidation = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/liquidations/${id}/unarchive`,
  });
};

export const duplicateLiquidation = (id) => {
  return authApi({
    method: 'POST',
    url: `/liquidations/${id}/duplicate`,
  });
};

export const importLiquidation = (data) => {
  return authApi({
    method: 'POST',
    url: `/liquidations/import`,
    data,
  });
};

// ------------------------------ Liquidation Item ------------------------------

export const addLiquidationItem = (data) => {
  return authApi({
    method: 'POST',
    url: '/liquidations-items',
    data,
  });
};

export const getListLiquidationsItems = (params) => {
  return authApi({
    method: 'GET',
    url: '/liquidations-items',
    params,
  });
};

export const exportLiquidationsItems = (params) => {
  return authApi({
    method: 'GET',
    url: '/liquidations-items/export',
    params,
  });
};

export const getArchivedLiquidationItem = (fileId) => {
  return authApi({
    method: 'GET',
    url: '/liquidations-items/archived-liquidations-items',
    params: {
      fileId,
    },
  });
};

export const archiveLiquidationItem = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/liquidations-items/${id}/archive`,
  });
};

export const unarchiveLiquidationItem = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/liquidations-items/${id}/unarchive`,
  });
};

export const getLiquidationItemById = (id) => {
  return authApi({
    method: 'GET',
    url: `/liquidations-items/${id}`,
  });
};

export const updateLiquidationItem = (id, data) => {
  return authApi({
    method: 'PUT',
    url: `/liquidations-items/${id}`,
    data,
  });
};

export const duplicateLiquidationItem = (id) => {
  return authApi({
    method: 'POST',
    url: `/liquidations-items/${id}/duplicate`,
  });
};

// ------------------------------ Pampering ------------------------------
export const getListPamperings = (params) =>
  authApi({
    method: 'GET',
    url: '/pamperings',
    params: { ...params },
  });

export const archivePampering = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/pamperings/${id}/archive`,
  });
};

export const unarchivePampering = (id) => {
  return authApi({
    method: 'PATCH',
    url: `/pamperings/${id}/unarchive`,
  });
};

export const getMyListPamperings = (params) =>
  authApi({
    method: 'GET',
    url: `/pamperings/getMyPamperings`,
    params: { ...params },
  });

export const getArchivedPamperings = () => {
  return authApi({
    method: 'GET',
    url: '/pamperings/archived-pamperings',
  });
};

export const getPampering = (id) =>
  authApi({
    method: 'GET',
    url: `/pamperings/${id}`,
  });

export const addPampering = (data) =>
  authApi({
    method: 'POST',
    url: '/pamperings',
    data: { ...data },
  });

export const editPampering = (id, data) =>
  authApi({
    method: 'PUT',
    url: `/pamperings/${id}`,
    data: { ...data },
  });

export const getPamperingSettings = (params) =>
  authApi({
    method: 'GET',
    url: '/settings',
    params,
  });

export const exportPamperings = (params) =>
  authApi({
    method: 'GET',
    url: '/pamperings/export',
    params,
  });

export const importPamperings = (data) => {
  return authApi({
    method: 'POST',
    url: `/pamperings/import`,
    data,
  });
};

export const extractDataImage = (data) => {
  return authApi({
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    url: `/extract/tiktok/ocr`,
    data,
  });
};

export const extractDataByUrl = (params) => {
  return authApi({
    method: 'GET',
    url: `/extract/instagram/post`,
    params,
  });
};

export const getIsForceUpdateContentsOfBrand = () => {
  return authApi({
    method: 'GET',
    url: `/brand/getIsForceUpdateContentsOfBrand`,
  });
};

export const forceUpdateContentsOfBrand = () => {
  return authApi({
    method: 'PUT',
    url: `/brand/ForceUpdateContentsOfBrand`,
  });
};

export const cancelForceUpdateContentsOfBrand = () => {
  return authApi({
    method: 'PUT',
    url: `/brand/CancelForceUpdateContentsOfBrand`,
  });
};

export const getBrandHashtagsForCrawler = () => {
  return authApi({
    method: 'GET',
    url: `/crawlerHashtags`,
  });
};

export const archiveBrandHashtagsForCrawler = (id) => {
  return authApi({
    method: 'PUT',
    url: `/crawlerHashtags/${id}/archive`,
  });
};

export const unarchiveBrandHashtagsForCrawler = (id) => {
  return authApi({
    method: 'PUT',
    url: `/crawlerHashtags/${id}/unarchive`,
  });
};

export const deleteBrandHashtagsForCrawler = (id) => {
  return authApi({
    method: 'DELETE',
    url: `/crawlerHashtags/${id}`,
  });
};

export const updateListCrawlerHashtags = (data) => {
  return authApi({
    method: 'POST',
    url: `/crawlerHashtags/updateListCrawlerHashtags`,
    data,
  });
};

export const createCrawlerHashtags = (data) => {
  return authApi({
    method: 'POST',
    url: `/crawlerHashtags`,
    data,
  });
};

export const getIsImportProgressContentsOfBrand = () => {
  return authApi({
    method: 'GET',
    url: `/brand/getIsImportProgressContentsOfBrand`,
  });
};

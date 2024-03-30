export const getCookie = () => {
  return document.cookie.split('=')[1];
};

export const removeCookie = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

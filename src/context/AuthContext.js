import React, { useState, createContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'universal-cookie';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import token from '../utils/token';
import {
  login as loginFn,
  logout as logoutFn,
  validate as validateFn,
  loginWithGithub as loginWithGithubFn,
} from '../services/api';
import { getCookie, removeCookie } from '../utils/cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const cookies = new Cookies();
  const [me, setMe] = useState(null);

  const clientID = `${process.env.REACT_APP_GITHUB_CLIENT_ID}`;
  const redirectURI = `${process.env.REACT_APP_GITHUB_REDIRECT_URI}`;
  // const redirectURI = `http://localhost:3000/auth/github/callback`;
  const clientSecret = `${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
  const navigateWindowToGitHub = useCallback(async () => {
    try {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
    } catch (error) {
      console.error('Error during GitHub login:', error);
    }
  }, [clientID, redirectURI]);
  const saveMe = useCallback((data) => {
    // console.log('data', data);
    const me = {
      // id: data.id,
      username: data?.username,
      email: data?.email,
      organizationId: data?.organization_id,
      isOrganizationAdmin: data?.is_organization_admin,
      isAdminOfProjects: data?.is_admin_of_projects,
      // address: data.address,
      // avatarUrl: data.avatar_url,
      // bio: data.bio,
      // color: data.color,
      // phone: data.phone,
      // roles: data.roles.map((role) => {
      //   return {
      //     id: role.id,
      //     name: role.name,
      //     description: role.description,
      //   };
      // }),
      // permissions: data.permissions.map((permission) => {
      //   return {
      //     id: permission.id,
      //     name: permission.name,
      //     description: permission.description,
      //   };
      // }),
    };
    setMe(me);
  }, []);

  const loginWithGithub = useCallback(
    async (code) => {
      if (!code) {
        console.log('No code found in URL');
        return false;
      }

      try {
        // alert(`isAuthenticated ${isAuthenticated}`);
        // alert(`🚀 ~ HandleCallback ~ code: ${code}`);
        const response = await loginWithGithubFn({ code });
        setIsAuthenticated(true);
        // alert(`isAuthenticated ${isAuthenticated}`);
        // alert(`🚀 ~ HandleCallback ~ code: ${response}`);
        // alert(`Login success ${response?.data?.['user']}`);
        console.log('response.data', response?.data);
        saveMe(response?.data?.['user']);
        token.setAccessToken(response?.data?.token);
        toast.success('Login success');
        navigate('/home', { replace: true });
        return true;
      } catch (error) {
        console.error('Error fetching access token:');
        alert(`Error fetching access token ${error}`);
        return false;
      }
    },
    [navigate, saveMe, setIsAuthenticated],
  );

  const login = useCallback(
    async (data) => {
      try {
        const response = await loginFn(data);
        // console.log('response', response);
        saveMe(response?.data?.['user']);
        // console.log(getCookie());
        // cookies.set('Authorization', response?.data?.['token'], {
        //   path: '/',
        //   maxAge: 60 * 60 * 24 * 7,
        //   // domain: 'param-store.datn.live',
        //   secure: true,
        //   sameSite: 'none',
        // });
        setIsAuthenticated(true);
        token.setAccessToken(response?.data?.token);
        toast.success('Login success');
        navigate.push('/dashboard', { replace: true });
        // alert('Login success');
        // console.log('X');
        return true;
      } catch {
        return false;
      }
    },
    [navigate, saveMe],
  );

  const loginWithCookie = useCallback(async () => {
    try {
      // console log response ma cung deo thay gi het
      const response = await validateFn();
      // console.log('response from validateFn', response);
      saveMe(response.data?.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      queryClient.clear();
    }
  }, [saveMe, queryClient]);

  // const loginWithToken = useCallback(async () => {
  //   try {
  //     const oldRefreshToken = token.getRefreshToken();

  //     const response = await refreshTokenFn({ refreshToken: oldRefreshToken });

  //     const accessToken = response.data.data.accessToken;
  //     const refreshToken = response.data.data.refreshToken;
  //     saveMe(response.data.data.user);

  //     token.setAccessToken(accessToken);
  //     token.setRefreshToken(refreshToken);
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     console.log(error);
  //     token.removeAccessToken();
  //     token.removeRefreshToken();
  //     setIsAuthenticated(false);
  //     queryClient.clear();
  //   }
  // }, [queryClient, saveMe]);

  const logout = async () => {
    try {
      await logoutFn();
    } catch (error) {
      console.log(error);
    } finally {
      token.removeAccessToken();
      setIsAuthenticated(false);
      queryClient.clear();
    }
  };

  useEffect(() => {
    if (isAuthenticated === null) {
      // alert('loginWithCookie is called');
      loginWithCookie();
    }
  }, [loginWithCookie, isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        me,
        loginWithGithub,
        navigateWindowToGitHub,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

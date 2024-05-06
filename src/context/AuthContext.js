import React, { useState, createContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  login as loginFn,
  logout as logoutFn,
  validate as validateFn,
} from '../services/api';
import { getCookie, removeCookie } from '../utils/cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const [me, setMe] = useState(null);

  const saveMe = useCallback((data) => {
    const me = {
      // id: data.id,
      username: data?.username,
      email: data?.email,
      organizationId: data?.organization_id,
      isOrganizationAdmin: data?.is_organization_admin,
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

  const login = useCallback(
    async (data) => {
      try {
        const response = await loginFn(data);
        console.log('response', response);
        saveMe(response?.data?.['user']);

        console.log(getCookie());

        setIsAuthenticated(true);

        toast.success('Login success');
        navigate.push('/', { replace: true });
        console.log('X');
        return true;
      } catch {
        return false;
      }
    },
    [navigate, saveMe],
  );

  const loginWithCookie = useCallback(async () => {
    try {
      const response = await validateFn();
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
      removeCookie();
      setIsAuthenticated(false);
      queryClient.clear();
    }
  };

  useEffect(() => {
    // console.log(document.cookie);
    loginWithCookie();
  }, [loginWithCookie]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, me }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

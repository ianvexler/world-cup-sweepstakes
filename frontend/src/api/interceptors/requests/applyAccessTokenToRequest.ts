/**
 * Attempts to fetch and inject the access token for the currently authenticated user as a Bearer token in the
 * request header.
 *
 * @param config - Axios request configuration object reference of which we'll be modifying its {@link headers} attribute to
 * inject the Bearer token if necessary.
 */

import { InternalAxiosRequestConfig } from 'axios';

const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp && payload.exp < Date.now() / 1000;
  } catch {
    return true; // Invalid token format
  }
};

const clearAuthToken = () => {
  localStorage.removeItem('auth_token');
};

export const applyAccessTokenToRequest = async (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('auth_token');

  if (token) {
    if (isTokenExpired(token)) {
      clearAuthToken();

      // Redirect to login if not already there
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }

      return Promise.reject(new Error('Token expired'));
    }

    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
};

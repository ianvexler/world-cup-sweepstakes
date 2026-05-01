import { AxiosError, HttpStatusCode } from 'axios';

/**
 * Handles failed API responses related to authentication state.
 *
 * @param error - Axios error instance returned by the response interceptor pipeline.
 */
export const onUnauthenticatedResponse = async (error: AxiosError) => {
  // Handle 401 Unauthorized
  switch (error.response?.status) {
    case HttpStatusCode.Unauthorized:
      // TODO: Handle unauthorized response
      throw new Error('Unauthorized');
  }

  return Promise.reject(error);
};

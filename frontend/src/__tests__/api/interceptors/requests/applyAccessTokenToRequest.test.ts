import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { applyAccessTokenToRequest } from '../../../../api/interceptors/requests/applyAccessTokenToRequest';

const makeConfig = () => ({ headers: {} }) as any;

const tokenWithExp = (exp: number) => `header.${btoa(JSON.stringify({ exp }))}.signature`;

describe('applyAccessTokenToRequest', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      configurable: true,
    });
  });

  it('returns config unchanged when no auth token exists', async () => {
    const config = makeConfig();
    const result = await applyAccessTokenToRequest(config);

    expect(result).toBe(config);
    expect(config.headers.Authorization).toBeUndefined();
  });

  it('applies bearer token to Authorization header when token is valid', async () => {
    const config = makeConfig();
    const token = tokenWithExp(Math.floor(Date.now() / 1000) + 3600);
    localStorage.setItem('auth_token', token);

    const result = await applyAccessTokenToRequest(config);

    expect(result.headers.Authorization).toBe(`Bearer ${token}`);
  });

  it('clears token and rejects when token is expired', async () => {
    const config = makeConfig();
    const token = tokenWithExp(Math.floor(Date.now() / 1000) - 3600);
    localStorage.setItem('auth_token', token);

    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost/dashboard',
        pathname: '/dashboard',
      } as Location,
      configurable: true,
    });

    await expect(applyAccessTokenToRequest(config)).rejects.toThrow('Token expired');
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(window.location.href).toBe('/login');
  });

  it('rejects malformed token and skips redirect on login route', async () => {
    const config = makeConfig();
    localStorage.setItem('auth_token', 'not-a-jwt');

    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost/login',
        pathname: '/login',
      } as Location,
      configurable: true,
    });

    await expect(applyAccessTokenToRequest(config)).rejects.toThrow('Token expired');
    expect(localStorage.getItem('auth_token')).toBeNull();
    expect(window.location.href).toBe('http://localhost/login');
  });
});

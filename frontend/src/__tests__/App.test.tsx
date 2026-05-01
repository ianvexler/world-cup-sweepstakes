import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { apiServerMock } from './__mocks__/apiServerMock';
import { delay, http, HttpResponse } from 'msw';

describe('App', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
    localStorage.clear();
  });

  it('shows the loader while authorization state is being resolved', async () => {
    apiServerMock.use(
      http.get('/api/v1/auth/me', async () => {
        await delay(100);
        return HttpResponse.json({ user: { id: 1, email: 'user@example.com' } });
      })
    );

    render(<App />);

    expect(screen.getByRole('status')).toBeDefined();

    await waitFor(() => {
      expect(screen.queryByRole('status')).toBeNull();
    });
  });

  it('redirects to login when session check is unauthorized', async () => {
    apiServerMock.use(
      http.get('/api/v1/auth/me', () => {
        return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });

  it('allows access to protected route when session check succeeds', async () => {
    apiServerMock.use(
      http.get('/api/v1/auth/me', () => {
        return HttpResponse.json({ user: { id: 1, email: 'user@example.com' } });
      })
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Vite + React Template')).toBeDefined();
    });

    expect(window.location.pathname).toBe('/');
  });
});

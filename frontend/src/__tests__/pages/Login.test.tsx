import { beforeEach, describe, expect, it } from 'vitest';
import { apiServerMock } from '../__mocks__/apiServerMock';
import { http, HttpResponse } from 'msw';
import { act, screen, waitFor } from '@testing-library/react';
import Login from '../../pages/Login';
import { userEvent } from '@testing-library/user-event';
import { renderWithProviders } from '../__utils__/renderWithProviders';

describe('Login', () => {
  beforeEach(() => {
    apiServerMock.use(
      http.post('/api/v1/auth/sign_in', async () => {
        return HttpResponse.json({ user: { id: 1, email: 'user@example.com' } });
      })
    );
  });

  it('logs in successfully', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    await act(async () => {
      user.type(emailInput, 'user@example.com');
      user.type(passwordInput, 'password');
    });

    const loginButton = screen.getByRole('button', { name: 'Login' });
    await act(async () => {
      user.click(loginButton);
    });

    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });
});

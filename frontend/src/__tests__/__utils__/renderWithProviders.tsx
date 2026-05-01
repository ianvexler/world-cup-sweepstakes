import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';

export const renderWithProviders = (ui: React.ReactNode) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AuthProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </AuthProvider>
    ),
  });
};

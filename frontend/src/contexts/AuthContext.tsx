import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { check } from '../api/requests/sessions/check';
import { User } from '../../types';

interface AuthContextType {
  loading: boolean;
  currentUser: User | null;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  loading: true,
  currentUser: null,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setLoading(true);

    try {
      const response = await check();

      if (response.user) {
        setCurrentUser(response.user);
        setIsAuthenticated(true);
        setIsAdmin(response.user.is_admin);
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
        setCurrentUser(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setCurrentUser(null);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        currentUser,
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { check } from '../api/requests/sessions/check';

interface AuthContextType {
  loading: boolean;

  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  loading: true,
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setLoading(true);

    try {
      const response = await check();

      console.log(response);

      if (response.user) {
        setIsAuthenticated(true);
        setIsAdmin(response.user.is_admin);
      } else {
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
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

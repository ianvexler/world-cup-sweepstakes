import { ChangeEvent, SubmitEvent, useState } from 'react';
import icon from '../assets/icon.png';
import Button from '../components/ui/Button';
import Input from '../components/ui/form/Input';
import { login } from '../api/requests/sessions/login';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/ui/Alert';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await login(email, password);
      setIsAuthenticated(true);

      navigate('/');
    } catch (error) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-md w-full px-4">
        <div className="flex justify-center items-center mb-5">
          <img src={icon} className="w-40" alt="The Curve" />
        </div>

        {error && (
          <Alert variant="danger" heading="Error">
            {error}
          </Alert>
        )}

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mt-4">
            <Input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
          </div>

          <div className="mt-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="mt-4 w-full"
              size="md"
              variant="secondary"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

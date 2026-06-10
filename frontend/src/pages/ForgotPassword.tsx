import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icon from '../assets/icon.png';
import Button from '../components/ui/Button';
import Input from '../components/ui/form/Input';
import { resetPassword } from '../api/requests/sessions/resetPassword';
import Alert from '../components/ui/Alert';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await resetPassword(email, password, passwordConfirmation);
      navigate('/login');
    } catch (err: unknown) {
      const data =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: unknown } }).response?.data
          : undefined;
      if (data && typeof data === 'object') {
        if ('error' in data && typeof (data as { error: string }).error === 'string') {
          setError((data as { error: string }).error);
        } else if ('errors' in data && Array.isArray((data as { errors: string[] }).errors)) {
          setError((data as { errors: string[] }).errors.join(' '));
        } else {
          setError('Could not reset password');
        }
      } else {
        setError('Could not reset password');
      }
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

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <Input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <Input
              type="password"
              placeholder="Confirm new password"
              value={passwordConfirmation}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPasswordConfirmation(e.target.value)
              }
              required
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
              {isLoading ? 'Loading...' : 'Reset password'}
            </Button>
          </div>
        </form>

        <p className="mt-3 text-center text-sm text-neutral-500">
          <Link
            to="/login"
            className="underline underline-offset-2 text-sm text-neutral-400 hover:text-neutral-500"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

import { setupServer } from 'msw/node';
import { http } from 'msw';

const defaultTestResponseResolver = () => {
  throw new Error('Making call to non-mocked URL'); // Throw an exception if we're making a call to a non-mocked URL.
};

export const apiServerMock = setupServer(
  http.delete('*', defaultTestResponseResolver),
  http.get('*/*', defaultTestResponseResolver),
  http.head('*/*', defaultTestResponseResolver),
  http.options('*/*', defaultTestResponseResolver),
  http.patch('*', defaultTestResponseResolver),
  http.post('*', defaultTestResponseResolver),
  http.put('*', defaultTestResponseResolver)
);

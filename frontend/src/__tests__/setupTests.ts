import { beforeAll, afterAll, afterEach } from 'vitest';
import { apiServerMock } from './__mocks__/apiServerMock';
import { cleanup } from '@testing-library/react';

beforeAll(() => {
  apiServerMock.listen();
});

afterAll(() => {
  apiServerMock.close();
});

// Clean up after each test
afterEach(() => {
  apiServerMock.resetHandlers();
  cleanup();
});

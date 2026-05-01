import { AxiosError, HttpStatusCode } from 'axios';
import { describe, expect, it } from 'vitest';
import { onUnauthenticatedResponse } from './onUnauthenticatedRespnose';

describe('onUnauthenticatedResponse', () => {
  it('throws Unauthorized for 401 responses', async () => {
    const error = {
      response: { status: HttpStatusCode.Unauthorized },
    } as AxiosError;

    await expect(onUnauthenticatedResponse(error)).rejects.toThrow('Unauthorized');
  });

  it('rejects with the original error for non-401 responses', async () => {
    const error = {
      response: { status: HttpStatusCode.BadRequest },
    } as AxiosError;

    await expect(onUnauthenticatedResponse(error)).rejects.toBe(error);
  });

  it('rejects with the original error when response is missing', async () => {
    const error = {} as AxiosError;

    await expect(onUnauthenticatedResponse(error)).rejects.toBe(error);
  });
});

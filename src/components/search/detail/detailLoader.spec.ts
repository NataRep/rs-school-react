import type { LoaderFunctionArgs } from 'react-router';
import { ApiService } from '../../../services/api-service/api-service';
import { detailLoader } from './detailLoader';

jest.mock('../../../services/api-service/api-service', () => ({
  ApiService: {
    getEntityDetails: jest.fn(),
  },
}));

describe('detailLoader', () => {
  const mockParams = { categoryName: 'people', id: '1' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createLoaderArgs = (params: Record<string, string | undefined>) => {
    return {
      params,
      request: new Request('http://localhost/'),
    } as unknown as LoaderFunctionArgs;
  };

  it('should return data when ApiService fetches details successfully', async () => {
    const mockData = { name: 'Luke Skywalker', height: '172' };
    (ApiService.getEntityDetails as jest.Mock).mockResolvedValue(mockData);

    const args = createLoaderArgs(mockParams);
    const result = await detailLoader(args);

    expect(ApiService.getEntityDetails).toHaveBeenCalledWith('people', '1');
    expect(result).toEqual(mockData);
  });

  it('should throw a 500 Response for any other generic server errors', async () => {
    (ApiService.getEntityDetails as jest.Mock).mockRejectedValue(new Error('Network Timeout'));
    const args = createLoaderArgs(mockParams);

    try {
      await detailLoader(args);
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(500);
      expect(await (error as Response).text()).toBe('Failed to load details');
    }
  });
});
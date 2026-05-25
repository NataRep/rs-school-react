import { ApiService } from '../../../services/api-service/api-service';
import { detailLoader } from './detailLoader';

jest.mock('../../../services/api-service/api-service', () => ({
  ApiService: {
    getEntityDetails: jest.fn(),
  },
}));

describe('detailLoader', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw 404 if categoryName is missing', () => {
    expect(() =>
      detailLoader({
        params: { id: '1' },
        request: {} as Request,
      }),
    ).toThrow(Response);
  });

  it('should throw 404 if id is missing', () => {
    expect(() =>
      detailLoader({
        params: { categoryName: 'people' },
        request: {} as Request,
      }),
    ).toThrow(Response);
  });

  it('should return details promise', async () => {
    const mockData = {
      name: 'Luke Skywalker',
    };

    (
      ApiService.getEntityDetails as jest.Mock
    ).mockResolvedValue(mockData);

    const result = detailLoader({
      params: {
        categoryName: 'people',
        id: '1',
      },
      request: {} as Request,
    });

    await expect(result.details).resolves.toEqual(mockData);

    expect(ApiService.getEntityDetails).toHaveBeenCalledWith(
      'people',
      '1',
    );
  });

  it('should throw 404 if api returns null', async () => {
    (
      ApiService.getEntityDetails as jest.Mock
    ).mockResolvedValue(null);

    const result = detailLoader({
      params: {
        categoryName: 'people',
        id: '999',
      },
      request: {} as Request,
    });

    await expect(result.details).rejects.toMatchObject({
      status: 404,
    });
  });

  it('should throw 404 if api throws 404 error', async () => {
    (
      ApiService.getEntityDetails as jest.Mock
    ).mockRejectedValue(new Error('Request failed with status 404'));

    const result = detailLoader({
      params: {
        categoryName: 'people',
        id: '999',
      },
      request: {} as Request,
    });

    try {
      await result.details;
    } catch (error) {
      expect(error).toBeInstanceOf(Response);

      const response = error as Response;

      expect(response.status).toBe(404);
      await expect(response.text()).resolves.toBe('Entity Not Found');
    }
  });
  it('should throw 500 for unknown errors', async () => {
    (
      ApiService.getEntityDetails as jest.Mock
    ).mockRejectedValue(new Error('Network error'));

    const result = detailLoader({
      params: {
        categoryName: 'people',
        id: '1',
      },
      request: {} as Request,
    });

    try {
      await result.details;
    } catch (error) {
      expect(error).toBeInstanceOf(Response);

      const response = error as Response;

      expect(response.status).toBe(500);
      await expect(response.text()).resolves.toBe(
        'Failed to load details',
      );
    }
  });
});
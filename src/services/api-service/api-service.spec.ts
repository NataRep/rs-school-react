import { ApiService } from "./api-service";

describe('ApiService service', () => {

  beforeEach(() => {
    fetchMock.resetMocks();
  });


  it('should fetch data with correct URL and parameters', async () => {
    const mockResponse = {
      count: 1,
      next: null,
      previous: null,
      results: [{ name: 'Luke Skywalker' }],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const result = await ApiService.getData('people', 'luke', 1);

    expect(result).toEqual(mockResponse);

    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/people/?page=1&search=luke'),
      expect.any(Object)
    );
  });

  it('should throw an error when the server returns 500', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(ApiService.getData('planets', 'tatooine'))
      .rejects
      .toThrow('API error: 500');
  });
});
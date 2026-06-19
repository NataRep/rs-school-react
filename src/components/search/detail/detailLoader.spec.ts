import { detailLoader } from './detailLoader';

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

  it('should return params', () => {
    const result = detailLoader({
      params: { categoryName: 'people', id: '1' },
      request: {} as Request,
    });

    expect(result).toEqual({
      categoryName: 'people',
      id: '1',
    });
  });
});

import { reloadPage } from './navigation';

describe('reloadPage', () => {
  it('should call reload function', () => {
    const reloadMock = jest.fn();

    reloadPage(reloadMock);

    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
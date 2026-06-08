import { fileToBase64 } from './fileToBase64';

describe('fileToBase64', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return empty string for null', async () => {
    await expect(fileToBase64(null)).resolves.toBe('');
  });

  it('should return empty string for undefined', async () => {
    await expect(fileToBase64(undefined)).resolves.toBe('');
  });

  it('should convert file to base64 string', async () => {
    const mockReadAsDataURL = jest.fn();

    class MockFileReader {
      result = 'data:text/plain;base64,dGVzdA==';
      error = null;

      onloadend: (() => void) | null = null;
      onerror: (() => void) | null = null;

      readAsDataURL = mockReadAsDataURL.mockImplementation(() => {
        this.onloadend?.();
      });
    }

    Object.defineProperty(global, 'FileReader', {
      writable: true,
      value: MockFileReader,
    });

    const file = new File(['test'], 'test.txt', {
      type: 'text/plain',
    });

    await expect(fileToBase64(file)).resolves.toBe(
      'data:text/plain;base64,dGVzdA=='
    );

    expect(mockReadAsDataURL).toHaveBeenCalledWith(file);
  });

  it('should reject when FileReader fails', async () => {
    class MockFileReader {
      result = null;
      error = new Error('Read error');

      onloadend: (() => void) | null = null;
      onerror: (() => void) | null = null;

      readAsDataURL() {
        this.onerror?.();
      }
    }

    Object.defineProperty(global, 'FileReader', {
      writable: true,
      value: MockFileReader,
    });

    const file = new File(['test'], 'test.txt');

    await expect(fileToBase64(file)).rejects.toThrow('Read error');
  });
});
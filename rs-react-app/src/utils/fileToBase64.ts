export const fileToBase64 = (fileInput: File | FileList | null | undefined): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!fileInput) {
      resolve('');
      return;
    }

    const file = fileInput instanceof FileList ? fileInput[0] : fileInput;

    if (!file) {
      resolve('');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to Base64 string'));
      }
    };

    reader.onerror = () => {
      reject(reader.error || new Error('Error reading file'));
    };

    reader.readAsDataURL(file);
  });
};
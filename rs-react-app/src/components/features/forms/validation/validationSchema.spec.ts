import { userFormSchema } from './validationSchema';

describe('userFormSchema', () => {
  const allowedCountries = ['Belarus', 'USA', 'Ukraine'];
  const context = { allowedCountries };

  const validData = {
    name: 'Anakin',
    age: 22,
    email: 'anakin@tatooine.com',
    password: 'Password1!',
    confirmPassword: 'Password1!',
    gender: 'male',
    country: 'Belarus',
    acceptTerms: true,
    profileImage: new File([''], 'avatar.png', { type: 'image/png' }),
  };

  it('should pass validation with valid data', async () => {
    await expect(userFormSchema.validate(validData, { context })).resolves.toEqual(validData);
  });

  describe('name validation', () => {
    it('should fail if name does not start with a capital letter', async () => {
      const invalidData = { ...validData, name: 'anakin' };
      await expect(userFormSchema.validate(invalidData, { context })).rejects.toThrow(
        'Please capitalize your name.'
      );
    });

    it('should fail if name contains numbers or special characters', async () => {
      const invalidData = { ...validData, name: 'Anakin66' };
      await expect(userFormSchema.validate(invalidData, { context })).rejects.toThrow(
        'Name must contain only letters.'
      );
    });
  });

  describe('email validation', () => {
    it('should fail if email does not contain @', async () => {
      const invalidData = { ...validData, email: 'anakintatooine.com' };
      await expect(userFormSchema.validate(invalidData, { context })).rejects.toThrow(
        'You have entered an incorrect email'
      );
    });

    it('should fail if domain part has no dot', async () => {
      const invalidData = { ...validData, email: 'anakin@tatooine' };
      await expect(userFormSchema.validate(invalidData, { context })).rejects.toThrow(
        'You have entered an incorrect email'
      );
    });
  });

  describe('country validation', () => {
    it('should fail if country is not in the allowed list', async () => {
      const invalidData = { ...validData, country: 'Tatooine' };
      await expect(userFormSchema.validate(invalidData, { context })).rejects.toThrow(
        'Select a country from the list'
      );
    });
  });

  describe('profileImage validation', () => {
    it('should fail if file size exceeds 2MB', async () => {
      const largeFile = new File([''], 'large.png', { type: 'image/png' });
      Object.defineProperty(largeFile, 'size', { value: 3 * 1024 * 1024 });

      const invalidData = { ...validData, profileImage: largeFile };
      await expect(userFormSchema.validate(invalidData, { context })).rejects.toThrow(
        'Maximum file size — 2MB'
      );
    });

    it('should fail if file format is unacceptable', async () => {
      const badFile = new File([''], 'document.pdf', { type: 'application/pdf' });
      Object.defineProperty(badFile, 'size', { value: 1000 });

      const invalidData = { ...validData, profileImage: badFile };
      await expect(userFormSchema.validate(invalidData, { context })).rejects.toThrow(
        'Acceptable formats: .jpg, .jpeg, .png'
      );
    });
  });
});
import { getPasswordStrength } from './passwordStrength';

describe('getPasswordStrength', () => {
  it('should return all flags as false for an empty password string', () => {
    const result = getPasswordStrength('');

    expect(result).toEqual({
      hasNumber: false,
      hasUppercase: false,
      hasLowercase: false,
      hasSpecial: false,
      hasMinLength: false,
    });
  });

  it('should detect numerical characters and switch hasNumber flag to true', () => {
    const result = getPasswordStrength('12345');

    expect(result.hasNumber).toBe(true);
    expect(result.hasUppercase).toBe(false);
    expect(result.hasLowercase).toBe(false);
    expect(result.hasSpecial).toBe(false);
    expect(result.hasMinLength).toBe(false);
  });

  it('should identify capital letters and switch hasUppercase flag to true', () => {
    const result = getPasswordStrength('ABC');

    expect(result.hasNumber).toBe(false);
    expect(result.hasUppercase).toBe(true);
    expect(result.hasLowercase).toBe(false);
    expect(result.hasSpecial).toBe(false);
    expect(result.hasMinLength).toBe(false);
  });

  it('should identify lowercase letters and switch hasLowercase flag to true', () => {
    const result = getPasswordStrength('xyz');

    expect(result.hasNumber).toBe(false);
    expect(result.hasUppercase).toBe(false);
    expect(result.hasLowercase).toBe(true);
    expect(result.hasSpecial).toBe(false);
    expect(result.hasMinLength).toBe(false);
  });

  it('should classify symbols and non-alphanumeric characters as hasSpecial true', () => {
    const result = getPasswordStrength('!@#');

    expect(result.hasNumber).toBe(false);
    expect(result.hasUppercase).toBe(false);
    expect(result.hasLowercase).toBe(false);
    expect(result.hasSpecial).toBe(true);
    expect(result.hasMinLength).toBe(false);
  });

  it('should enforce boundary condition constraints for hasMinLength criteria', () => {
    const shortPassword = getPasswordStrength('aS1!aS1');
    expect(shortPassword.hasMinLength).toBe(false);

    const boundaryPassword = getPasswordStrength('aS1!aS12');
    expect(boundaryPassword.hasMinLength).toBe(true);
  });

  it('should confirm all evaluation metrics align to true for complex valid sequences', () => {
    const result = getPasswordStrength('vAl1dP@ss');

    expect(result).toEqual({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecial: true,
      hasMinLength: true,
    });
  });
});
export interface PasswordStrengthFlags {
  hasNumber: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSpecial: boolean;
  hasMinLength: boolean;
}

export const getPasswordStrength = (password: string): PasswordStrengthFlags => {
  return {
    hasNumber: /\d/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
    hasMinLength: password.length >= 8,
  };
};
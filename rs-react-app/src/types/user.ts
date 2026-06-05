export interface UserFormData {
  name: string;
  age: number;
  email: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  password: string;
  confirmPassword: string;
  acceptTermsConditions: boolean;
  image: string;
}

export interface SubmittedForm extends UserFormData {
  id: string;
  submittedAt: string;
}
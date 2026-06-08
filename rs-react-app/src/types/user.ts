export interface UserFormData<T = FileList | File> {
  name: string;
  age: number;
  email: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  profileImage: T;
}

export interface SubmittedForm extends UserFormData<string> {
  id: string;
  submittedAt: string;
}

export interface UserCardProps {
  user: SubmittedForm;
  onDelete: (id: string) => void;
}
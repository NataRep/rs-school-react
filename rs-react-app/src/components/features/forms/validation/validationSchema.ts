import * as yup from 'yup';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const userFormSchema = yup.object({
  name: yup
    .string()
    .required('Name is required for assistance')
    .test(
      'no-numbers-or-special',
      'Name must contain only letters.',
      (value) => !value || /^[А-ЯЁA-Zа-яёa-z\s-]+$/.test(value)
    )
    .test(
      'first-letter-capital',
      'Please capitalize your name.',
      (value) => !value || /^[А-ЯЁA-Z]/.test(value)
    ),

  age: yup
    .number()
    .transform((value, originalValue) => String(originalValue).trim() === '' ? undefined : value)
    .typeError('Please check that age is written as a number.')
    .required('Age is required')
    .integer('Please check that age is written as an integer')
    .positive('Are you sure you live in reverse?'),

  email: yup
    .string()
    .required('Email is required')
    .test('basic-email-check', 'You have entered an incorrect email', (value) => {
      if (!value) return false;
      const parts = value.split('@');
      if (parts.length !== 2) return false;
      const [local, domain] = parts;
      if (!local || !domain) return false;
      return domain.includes('.') && domain.lastIndexOf('.') < domain.length - 1;
    }),

  password: yup
    .string()
    .required('Password  is required')
    .min(8, 'The password must be at least 8 characters long.')
    .matches(/[A-Z]/, 'The password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'The password must contain at least one number.')
    .matches(/[^A-Za-z0-9]/, 'The password must contain at least one special character.'),

  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'The password does not match'),

  gender: yup
    .string()
    .required('Select gender')
    .oneOf(['male', 'female', 'other'] as const, 'Please select the correct gender value')
    .defined(),

  country: yup
    .string()
    .required('Select a country')
    .test(
      'is-valid-country',
      'Select a country from the list',
      function (value) {
        if (!value) return true;

        const { allowedCountries } = this.options.context as { allowedCountries?: string[] };

        if (!allowedCountries) return false;

        return allowedCountries.includes(value);
      }
    ),

  acceptTerms: yup
    .boolean()
    .required('You must agree to the terms and conditions')
    .oneOf([true], 'You must agree to the terms and conditions')
    .defined(),

  profileImage: yup
    .mixed<FileList | File>()
    .test('file-size', 'Maximum file size — 2MB', (value) => {
      if (!value) return true;
      if (value instanceof FileList && value.length === 0) return true;
      if (value instanceof File && value.size === 0) return true;

      const file = value instanceof FileList ? value[0] : value;
      return file ? file.size <= MAX_FILE_SIZE : false;
    })
    .test('file-type', 'Acceptable formats: .jpg, .jpeg, .png', (value) => {
      if (!value) return true;
      if (value instanceof FileList && value.length === 0) return true;
      if (value instanceof File && value.size === 0) return true;

      const file = value instanceof FileList ? value[0] : value;
      return file ? ACCEPTED_IMAGE_TYPES.includes(file.type) : false;
    })
    .defined(),
});
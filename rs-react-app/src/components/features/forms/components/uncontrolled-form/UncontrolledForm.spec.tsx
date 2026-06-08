import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as yup from 'yup';
import { fileToBase64 } from '../../../../../utils/fileToBase64';
import { getPasswordStrength } from '../../utils/passwordStrength';
import { userFormSchema } from '../../validation/validationSchema';
import UncontrolledForm from './UncontrolledForm';

jest.mock('../../validation/validationSchema', () => ({
  userFormSchema: {
    validate: jest.fn(),
  },
}));

jest.mock('../../../../../utils/fileToBase64', () => ({
  fileToBase64: jest.fn(),
}));

jest.mock('../../utils/passwordStrength', () => ({
  getPasswordStrength: jest.fn(() => ({
    hasNumber: false,
    hasUppercase: false,
    hasLowercase: false,
    hasSpecial: false,
    hasMinLength: false,
  })),
}));

describe('UncontrolledForm', () => {
  const mockOnSubmitSuccess = jest.fn();
  const mockOnCloseModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (getPasswordStrength as jest.Mock).mockReturnValue({
      hasNumber: false,
      hasUppercase: false,
      hasLowercase: false,
      hasSpecial: false,
      hasMinLength: false,
    });
  });

  it('should render all form elements and default states', () => {
    render(
      <UncontrolledForm
        onSubmitSuccess={mockOnSubmitSuccess}
        onCloseModal={mockOnCloseModal}
      />
    );

    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByLabelText('Avatar')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Repeat')).toBeInTheDocument();
    expect(screen.getByLabelText('Terms & Conditions')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should toggle visibility attributes when password eye buttons are clicked', async () => {
    const user = userEvent.setup();
    render(
      <UncontrolledForm
        onSubmitSuccess={mockOnSubmitSuccess}
        onCloseModal={mockOnCloseModal}
      />
    );

    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Repeat');
    const [passwordEyeBtn, confirmPasswordEyeBtn] = screen.getAllByRole('button', { name: /show password/i });

    expect(passwordInput).toHaveAttribute('type', 'password');
    await user.click(passwordEyeBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');

    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    await user.click(confirmPasswordEyeBtn);
    expect(confirmPasswordInput).toHaveAttribute('type', 'text');
  });

  it('should display validation error messages from yup on submit failure', async () => {
    const user = userEvent.setup();
    const mockValidationError = new yup.ValidationError([
      { path: 'name', message: 'Name is required' },
      { path: 'email', message: 'Email is invalid' },
    ] as unknown as string, {}, '');

    mockValidationError.inner = [
      { path: 'name', message: 'Name is required' },
      { path: 'email', message: 'Email is invalid' },
    ] as yup.ValidationError[];

    (userFormSchema.validate as jest.Mock).mockRejectedValueOnce(mockValidationError);

    render(
      <UncontrolledForm
        onSubmitSuccess={mockOnSubmitSuccess}
        onCloseModal={mockOnCloseModal}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    });

    expect(mockOnSubmitSuccess).not.toHaveBeenCalled();
  });

  it('should execute callbacks with parsed data on a successful form submit', async () => {
    const user = userEvent.setup();
    const mockValidData = {
      name: 'Anakin Skywalker',
      age: '22',
      email: 'anakin@tatooine.com',
      gender: 'male',
      country: 'Tatooine',
      password: 'Password1!',
      confirmPassword: 'Password1!',
      acceptTerms: true,
      profileImage: new File([''], 'avatar.png', { type: 'image/png' }),
    };

    (userFormSchema.validate as jest.Mock).mockResolvedValueOnce(mockValidData);
    (fileToBase64 as jest.Mock).mockResolvedValueOnce('data:image/png;base64,mockstring');

    render(
      <UncontrolledForm
        onSubmitSuccess={mockOnSubmitSuccess}
        onCloseModal={mockOnCloseModal}
      />
    );

    await user.type(screen.getByLabelText('Name'), 'Anakin Skywalker');
    await user.type(screen.getByLabelText('Age'), '22');
    await user.type(screen.getByLabelText('Email'), 'anakin@tatooine.com');
    await user.selectOptions(screen.getByLabelText('Gender'), 'male');
    await user.type(screen.getByLabelText('Country'), 'Tatooine');
    await user.type(screen.getByLabelText('Password'), 'Password1!');
    await user.type(screen.getByLabelText('Repeat'), 'Password1!');
    await user.click(screen.getByLabelText('Terms & Conditions'));

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(mockOnSubmitSuccess).toHaveBeenCalledWith({
        ...mockValidData,
        profileImage: 'data:image/png;base64,mockstring',
      });
      expect(mockOnCloseModal).toHaveBeenCalledTimes(1);
    });
  });

  it('should trigger inline file conversion error handling when base64 transformation fails', async () => {
    const user = userEvent.setup();
    const mockValidData = {
      profileImage: new File([''], 'broken.png', { type: 'image/png' }),
    };

    (userFormSchema.validate as jest.Mock).mockResolvedValueOnce(mockValidData);
    (fileToBase64 as jest.Mock).mockRejectedValueOnce(new Error('File reading error'));

    render(
      <UncontrolledForm
        onSubmitSuccess={mockOnSubmitSuccess}
        onCloseModal={mockOnCloseModal}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('File reading error')).toBeInTheDocument();
    });

    expect(mockOnSubmitSuccess).not.toHaveBeenCalled();
  });

  it('should continuously monitor and update password validation tracker text indicators', async () => {
    const user = userEvent.setup();

    (getPasswordStrength as jest.Mock).mockReturnValue({
      hasNumber: true,
      hasUppercase: true,
      hasLowercase: true,
      hasSpecial: false,
      hasMinLength: false,
    });

    render(
      <UncontrolledForm
        onSubmitSuccess={mockOnSubmitSuccess}
        onCloseModal={mockOnCloseModal}
      />
    );

    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'abc');

    expect(getPasswordStrength).toHaveBeenCalledWith('abc');
  });
});
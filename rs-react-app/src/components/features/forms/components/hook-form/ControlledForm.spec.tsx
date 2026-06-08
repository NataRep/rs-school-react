import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fileToBase64 } from '../../../../../utils/fileToBase64';
import { getPasswordStrength } from '../../utils/passwordStrength';
import ControlledForm from './ControlledForm';

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

describe('ControlledForm', () => {
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

  it('should render all static structure elements correctly', () => {
    render(
      <ControlledForm
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
    expect(screen.getByLabelText('Repeat your password')).toBeInTheDocument();
    expect(screen.getByLabelText('Terms & Conditions')).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: 'Submit' });
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  it('should toggle password field types dynamically when eye toggles are triggered', async () => {
    const user = userEvent.setup();
    render(
      <ControlledForm
        onSubmitSuccess={mockOnSubmitSuccess}
        onCloseModal={mockOnCloseModal}
      />
    );

    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Repeat your password');
    const [passwordEyeBtn, confirmPasswordEyeBtn] = screen.getAllByRole('button', { name: /show password/i });

    expect(passwordInput).toHaveAttribute('type', 'password');
    await user.click(passwordEyeBtn);
    expect(passwordInput).toHaveAttribute('type', 'text');

    expect(confirmPasswordInput).toHaveAttribute('type', 'password');
    await user.click(confirmPasswordEyeBtn);
    expect(confirmPasswordInput).toHaveAttribute('type', 'text');
  });

  it('should execute processing sequence on form actions when payload meets validation parameters', async () => {
    const user = userEvent.setup();
    (fileToBase64 as jest.Mock).mockResolvedValueOnce('data:image/png;base64,controlledMock');

    render(
      <ControlledForm
        onSubmitSuccess={mockOnSubmitSuccess}
        onCloseModal={mockOnCloseModal}
      />
    );

    await user.type(screen.getByLabelText('Name'), 'Leia Organa');
    await user.type(screen.getByLabelText('Age'), '21');
    await user.type(screen.getByLabelText('Email'), 'leia@alderaan.gov');
    await user.selectOptions(screen.getByLabelText('Gender'), 'female');
    await user.type(screen.getByLabelText('Country'), 'Belarus');
    await user.type(screen.getByLabelText('Password'), 'ValidPass123!');
    await user.type(screen.getByLabelText('Repeat your password'), 'ValidPass123!');
    await user.click(screen.getByLabelText('Terms & Conditions'));

    const submitBtn = screen.getByRole('button', { name: 'Submit' });

    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });

    await user.click(submitBtn);

    await waitFor(() => {
      expect(mockOnSubmitSuccess).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Leia Organa',
          age: 21,
          email: 'leia@alderaan.gov',
          gender: 'female',
          country: 'Belarus',
          password: 'ValidPass123!',
          confirmPassword: 'ValidPass123!',
          acceptTerms: true,
          profileImage: 'data:image/png;base64,controlledMock',
        })
      );
      expect(mockOnCloseModal).toHaveBeenCalledTimes(1);
    });
  });

  it('should generate error indicators if file transformation exceptions are caught', async () => {
    const user = userEvent.setup();
    (fileToBase64 as jest.Mock).mockRejectedValueOnce(new Error('Conversion rejected'));

    render(
      <ControlledForm
        onSubmitSuccess={mockOnSubmitSuccess}
        onCloseModal={mockOnCloseModal}
      />
    );

    await user.type(screen.getByLabelText('Name'), 'Han Solo');
    await user.type(screen.getByLabelText('Age'), '35');
    await user.type(screen.getByLabelText('Email'), 'han@falcon.com');
    await user.selectOptions(screen.getByLabelText('Gender'), 'male');
    await user.type(screen.getByLabelText('Country'), 'Belarus');
    await user.type(screen.getByLabelText('Password'), 'FalconFly123!');
    await user.type(screen.getByLabelText('Repeat your password'), 'FalconFly123!');
    await user.click(screen.getByLabelText('Terms & Conditions'));

    const submitBtn = screen.getByRole('button', { name: 'Submit' });

    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });

    await user.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Conversion rejected')).toBeInTheDocument();
    });

    expect(mockOnSubmitSuccess).not.toHaveBeenCalled();
  });

  it('should constantly pass input sequence strings to password validation monitoring engine', async () => {
    const user = userEvent.setup();
    render(
      <ControlledForm
        onSubmitSuccess={mockOnSubmitSuccess}
        onCloseModal={mockOnCloseModal}
      />
    );

    const passwordInput = screen.getByLabelText('Password');
    await user.type(passwordInput, 'secret');

    expect(getPasswordStrength).toHaveBeenCalledWith('secret');
  });
});
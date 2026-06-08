import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FormProps } from '../../../../../types/form';
import type { UserFormData } from '../../../../../types/user';
import { fileToBase64 } from '../../../../../utils/fileToBase64';
import { COUNTRIES_DICTIONARY } from '../../constants/countries';
import style from '../../styles/Form.module.scss';
import { getPasswordStrength } from '../../utils/passwordStrength';
import { userFormSchema } from '../../validation/validationSchema';
import eyeClosedIcon from './../../../../../assets/eye-closed.svg';
import eyeOpenIcon from './../../../../../assets/eye-open.svg';

export default function ControlledForm({ onSubmitSuccess, onCloseModal }: FormProps) {
  const countryList = COUNTRIES_DICTIONARY;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isValid },
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema),
    mode: 'onChange',
    context: { allowedCountries: countryList },
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
      gender: undefined,
      country: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      profileImage: undefined,
    },
  });

  const passwordValue = watch('password') || '';

  const { hasNumber, hasUppercase, hasLowercase, hasSpecial, hasMinLength } = getPasswordStrength(passwordValue);

  const onSubmit = async (data: UserFormData) => {
    try {
      const base64Image = await fileToBase64(data.profileImage);

      const dataForStore: UserFormData<string> = {
        ...data,
        profileImage: base64Image,
      };

      onSubmitSuccess(dataForStore);
      onCloseModal();
      reset();
    } catch (fileError) {
      const errorMessage = fileError instanceof Error ? fileError.message : 'Failed to read file';

      setError('profileImage', {
        type: 'manual',
        message: errorMessage,
      });
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={style.field}>
        <label htmlFor="rhf-name">Name</label>
        <div className={style.inputContainer}>
          <input id="rhf-name" type="text" {...register('name')} />
          <div className={style.error}>{errors.name?.message}</div>
        </div>
      </div>

      <div className={style.field}>
        <label htmlFor="rhf-age">Age</label>
        <div className={style.inputContainer}>
          <input id="rhf-age" type="number" {...register('age', { valueAsNumber: true })} />
          <div className={style.error}>{errors.age?.message}</div>
        </div>
      </div>

      <div className={style.field}>
        <label htmlFor="rhf-mail">Email</label>
        <div className={style.inputContainer}>
          <input id="rhf-mail" type="email" {...register('email')} />
          <div className={style.error}>{errors.email?.message}</div>
        </div>
      </div>

      <div className={style.field}>
        <label htmlFor="rhf-gender">Gender</label>
        <div className={style.inputContainer}>
          <select id="rhf-gender" {...register('gender')}>
            <option value="" disabled hidden>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <div className={style.error}>{errors.gender?.message}</div>
        </div>
      </div>

      <div className={style.field}>
        <label htmlFor="rhf-country">Country</label>
        <div className={style.inputContainer}>
          <input
            id="rhf-country"
            type="text"
            list="rhf-countries-options"
            placeholder="Type or select country..."
            {...register('country')}
          />
          <datalist id="rhf-countries-options">
            {countryList.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
          <div className={style.error}>{errors.country?.message}</div>
        </div>
      </div>

      <div className={style.field}>
        <label htmlFor="rhf-avatar">Avatar</label>
        <div className={style.inputContainer}>
          <input id="rhf-avatar" type="file" accept=".jpg,.jpeg,.png" {...register('profileImage')} />
          <div className={style.error}>{errors.profileImage?.message}</div>
        </div>
      </div>

      <div className={style.field}>
        <label htmlFor="rhf-password">Password</label>
        <div className={style.inputContainer}>
          <div className={style.passwordWrapper}>
            <input
              id="rhf-password"
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
            />
            <button
              type="button"
              className={style.eyeBtn}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <img
                src={showPassword ? eyeOpenIcon : eyeClosedIcon}
                alt={showPassword ? "Hide password" : "Show password"}
              />
            </button>
          </div>
          <div className={style.error}>{errors.password?.message}</div>
        </div>
      </div>

      <div className={style.field}>
        <div className={style.labelPlaceholder}></div>
        <div className={style.passwordStrength}>
          <p>Password must contain:</p>
          <ul>
            <li className={hasMinLength ? style.valid : style.invalid}>✓ Length at least 8</li>
            <li className={hasUppercase ? style.valid : style.invalid}>✓ 1 uppercase letter</li>
            <li className={hasLowercase ? style.valid : style.invalid}>✓ 1 lowercase letter</li>
            <li className={hasNumber ? style.valid : style.invalid}>✓ 1 number</li>
            <li className={hasSpecial ? style.valid : style.invalid}>✓ 1 special character</li>
          </ul>
        </div>
      </div>

      <div className={style.field}>
        <label htmlFor="rhf-repeat-password">Repeat your password</label>
        <div className={style.inputContainer}>
          <div className={style.passwordWrapper}>
            <input
              id="rhf-repeat-password"
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
            />
            <button
              type="button"
              className={style.eyeBtn}
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              <img
                src={showConfirmPassword ? eyeOpenIcon : eyeClosedIcon}
                alt={showConfirmPassword ? "Hide password" : "Show password"}
              />
            </button>
          </div>
          <div className={style.error}>{errors.confirmPassword?.message}</div>
        </div>
      </div>

      <div className={style.field}>
        <div className={style.checkboxContainer}>
          <input id="rhf-confirm" type="checkbox" {...register('acceptTerms')} />
          <label htmlFor="rhf-confirm">Terms & Conditions</label>
          <div className={style.error}>{errors.acceptTerms?.message}</div>
        </div>
      </div>

      <div className={style.submitRow}>
        <button type="submit" className={style.submitBtn} disabled={!isValid}>
          Submit
        </button>
      </div>
    </form>
  );
}
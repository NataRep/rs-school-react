import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectCountries } from '../../../../../store/userSlice';
import style from '../../styles/Form.module.scss';
import { userFormSchema, type UserFormData } from '../../validation/validationSchema';

interface ControlledFormProps {
  onSubmitSuccess: (data: UserFormData) => void;
  onCloseModal: () => void;
}

export default function ControlledForm({ onSubmitSuccess, onCloseModal }: ControlledFormProps) {
  const countryList = useSelector(selectCountries);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema, {
      context: { allowedCountries: countryList },
    }),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
      gender: '',
      country: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      profileImage: undefined,
    },
  });

  const passwordValue = watch('password') || '';

  const hasNumber = /\d/.test(passwordValue);
  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasLowercase = /[a-z]/.test(passwordValue);
  const hasSpecial = /[^A-Za-z0-9]/.test(passwordValue);

  const onSubmit = (data: UserFormData) => {
    onSubmitSuccess(data);
    onCloseModal();
    reset();
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={style.row}>
        <label htmlFor="rhf-name">Name</label>
        <div className={style.inputContainer}>
          <input id="rhf-name" type="text" {...register('name')} />
          <div className={style.error}>{errors.name?.message}</div>
        </div>
      </div>

      <div className={style.row}>
        <label htmlFor="rhf-age">Age</label>
        <div className={style.inputContainer}>
          <input id="rhf-age" type="number" {...register('age', { valueAsNumber: true })} />
          <div className={style.error}>{errors.age?.message}</div>
        </div>
      </div>

      <div className={style.row}>
        <label htmlFor="rhf-mail">Mail</label>
        <div className={style.inputContainer}>
          <input id="rhf-mail" type="email" {...register('email')} />
          <div className={style.error}>{errors.email?.message}</div>
        </div>
      </div>

      <div className={style.row}>
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

      <div className={style.row}>
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

      <div className={style.row}>
        <label htmlFor="rhf-avatar">Avatar</label>
        <div className={style.inputContainer}>
          <input id="rhf-avatar" type="file" accept=".jpg,.jpeg,.png" {...register('profileImage')} />
          <div className={style.error}>{errors.profileImage?.message}</div>
        </div>
      </div>

      <div className={style.row}>
        <label htmlFor="rhf-password">Password</label>
        <div className={style.inputContainer}>
          <input id="rhf-password" type="password" {...register('password')} />
          <div className={style.error}>{errors.password?.message}</div>
        </div>
      </div>

      <div className={style.row}>
        <div className={style.labelPlaceholder}></div>
        <div className={style.passwordStrength}>
          <p>Password must contain:</p>
          <ul>
            <li className={hasUppercase ? style.valid : style.invalid}>✓ 1 uppercase letter</li>
            <li className={hasLowercase ? style.valid : style.invalid}>✓ 1 lowercase letter</li>
            <li className={hasNumber ? style.valid : style.invalid}>✓ 1 number</li>
            <li className={hasSpecial ? style.valid : style.invalid}>✓ 1 special character</li>
          </ul>
        </div>
      </div>

      <div className={style.row}>
        <label htmlFor="rhf-repeat-password">Repeat your password</label>
        <div className={style.inputContainer}>
          <input id="rhf-repeat-password" type="password" {...register('confirmPassword')} />
          <div className={style.error}>{errors.confirmPassword?.message}</div>
        </div>
      </div>

      <div className={style.row}>
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
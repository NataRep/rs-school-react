import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { selectCountries } from '../../../../../store/userSlice';
import style from '../../styles/Form.module.scss';
import { userFormSchema, type UserFormData } from '../../validation/validationSchema';

interface UncontrolledFormProps {
  onSubmitSuccess: (data: UserFormData) => void;
  onCloseModal: () => void;
}

type FormErrors = {
  [key in keyof yup.InferType<typeof userFormSchema>]?: string;
};

export default function UncontrolledForm({ onSubmitSuccess, onCloseModal }: UncontrolledFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const [passwordValue, setPasswordValue] = useState('');

  const countryList = useSelector(selectCountries);

  const hasNumber = /\d/.test(passwordValue);
  const hasUppercase = /[A-Z]/.test(passwordValue);
  const hasLowercase = /[a-z]/.test(passwordValue);
  const hasSpecial = /[^A-Za-z0-9]/.test(passwordValue);

  const handleFormAction = async (formData: FormData) => {
    setErrors({});

    const file = formData.get('profileImage') as File;

    const rawData = {
      name: formData.get('name') as string,
      age: formData.get('age') as string,
      email: formData.get('email') as string,
      gender: formData.get('gender') as string,
      country: formData.get('country') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      acceptTerms: formData.get('acceptTerms') === 'on',
      profileImage: file && file.size > 0 ? file : null,
    };

    try {
      const validData = await userFormSchema.validate(rawData, {
        abortEarly: false,
        context: { allowedCountries: countryList }
      });

      await onSubmitSuccess(validData);

      formRef.current?.reset();
      setPasswordValue('');

      onCloseModal();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: FormErrors = {};

        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path as keyof FormErrors] = error.message;
          }
        });

        setErrors(validationErrors);
      }
    }
  };

  return (
    <form ref={formRef} className={style.form} action={handleFormAction} noValidate>
      <div className={style.row}>
        <label htmlFor="unc-name">Name</label>
        <div className={style.inputContainer}>
          <input id="unc-name" type="text" name="name" />
          <div className={style.error}>{errors.name}</div>
        </div>
      </div>

      <div className={style.row}>
        <label htmlFor="unc-age">Age</label>
        <div className={style.inputContainer}>
          <input id="unc-age" type="number" name="age" />
          <div className={style.error}>{errors.age}</div>
        </div>
      </div>

      <div className={style.row}>
        <label htmlFor="unc-mail">Mail</label>
        <div className={style.inputContainer}>
          <input type="email" id="unc-mail" name="email" />
          <div className={style.error}>{errors.email}</div>
        </div>
      </div>

      <div className={style.row}>
        <label htmlFor="unc-gender">Gender</label>
        <div className={style.inputContainer}>
          <select id="unc-gender" name="gender">
            <option value="" disabled hidden>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <div className={style.error}>{errors.gender}</div>
        </div>
      </div>

      <div className={style.row}>
        <label htmlFor="unc-country">Country</label>
        <div className={style.inputContainer}>
          <input
            id="unc-country"
            type="text"
            name="country"
            list="countries-options"
            placeholder="Type or select country..."
          />
          <datalist id="countries-options">
            {countryList.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
          <div className={style.error}>{errors.country}</div>
        </div>
      </div>

      <div className={style.row}>
        <label htmlFor="unc-avatar">Avatar</label>
        <div className={style.inputContainer}>
          <input type="file" id="unc-avatar" name="profileImage" accept=".jpg,.jpeg,.png" />
          <div className={style.error}>{errors.profileImage}</div>
        </div>
      </div>

      <div className={style.row}>
        <label htmlFor="unc-password">Password</label>
        <div className={style.inputContainer}>
          <input
            id="unc-password"
            type="password"
            name="password"
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <div className={style.error}>{errors.password}</div>
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
        <label htmlFor="unc-repeat-password">Repeat your password</label>
        <div className={style.inputContainer}>
          <input type="password" id="unc-repeat-password" name="confirmPassword" />
          <div className={style.error}>{errors.confirmPassword}</div>
        </div>
      </div>

      <div className={style.row}>
        <div className={style.checkboxContainer}>
          <input type="checkbox" id="unc-confirm" name="acceptTerms" />
          <label htmlFor="unc-confirm">Terms & Conditions</label>
          <div className={style.error}>{errors.acceptTerms}</div>
        </div>
      </div>

      <div className={style.submitRow}>
        <button type="submit" className={style.submitBtn}>
          Submit
        </button>
      </div>
    </form>
  );
}
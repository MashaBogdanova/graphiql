import { SubmitHandler, useForm } from 'react-hook-form';
import { AuthFormData } from '@/types';
// import { useRouter } from 'next/navigation';
import createUser from '@/api/createUser';
import loginUser from '@/api/loginUser';
import styles from './authForm.module.scss';
import ContainerLayout from '@/components/ContainerLayout';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Notification from '@/components/ui/Notification/Notification';
import { useState } from 'react';

interface Props {
  isSignUp?: boolean;
}

function AuthForm({ isSignUp = false }: Props): JSX.Element {
  const { register, handleSubmit } = useForm<AuthFormData>();
  // const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const title = isSignUp ? 'Sign Up' : 'Log In';
  const subtitle = isSignUp ? 'Already a user?' : 'Need an account?';
  const linkHref = isSignUp ? 'login' : 'signup';
  const linkText = isSignUp ? 'Log In' : 'Sign Up';

  const onSubmit: SubmitHandler<AuthFormData> = (data: AuthFormData) => {
    isSignUp
      ? createUser({ data, setSuccessMessage, setErrorMessage })
      : loginUser({ data, setSuccessMessage, setErrorMessage });
    // router.push('/');
  };

  return (
    <ContainerLayout>
      <div className={styles.form__wrapper}>
        <h1 className={styles.form__title}>{title}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.form__field}>
            <label className={styles.form__label}>Email</label>
            <input
              className={styles.form__input}
              type="email"
              {...register('email')}
              placeholder="Email"
            />
          </div>
          <div className={styles.form__field}>
            <label className={styles.form__label}>Email</label>
            <input
              className={styles.form__input}
              type="password"
              {...register('password')}
              placeholder="Password"
            />
          </div>
          {isSignUp && (
            <div className={styles.form__field}>
              <label className={styles.form__label}>Confirm Password</label>
              <input
                className={styles.form__input}
                type="password"
                {...register('confirmPassword')}
                placeholder="Password"
              />
            </div>
          )}
          <Button title={title} isSubmit styleType="long" />
        </form>
        <div className={styles.form__subtitle}>
          {subtitle}
          <Link href={linkHref}>{linkText}</Link>
        </div>
        {successMessage && <Notification text={successMessage} />}
        {errorMessage && (
          <Notification
            text={errorMessage}
            isError
            linkHref={isSignUp ? '/login' : '/signup'}
            linkTitle={isSignUp ? 'log in.' : 'create one.'}
          />
        )}
      </div>
    </ContainerLayout>
  );
}

export default AuthForm;

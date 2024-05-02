'use client';

import { isValidEmail } from '@lib/utils';
import styles from './LoginForm.module.css';
import SubmitButton from './SubmitButton';
import { useAlert } from '@contexts/Alert';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const { setAlert } = useAlert();

  async function login(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password)
      return setAlert({
        message: 'Email or password is missing',
        type: 'failed',
      });
    if (!isValidEmail(email as string))
      return setAlert({
        message: 'Please provide a valid email',
        type: 'failed',
      });

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (response?.error)
      return setAlert({ message: response.error, type: 'failed' });

    router.push('/admin');
  }

  return (
    <section className={styles.container}>
      <h2>Login Now</h2>
      <form action={login}>
        <div className={styles.form_item}>
          <label htmlFor='email'>Email address*</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Enter email address'
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor='password'>Password*</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter password'
          />
        </div>
        <SubmitButton text='Login -->' />
      </form>
    </section>
  );
}

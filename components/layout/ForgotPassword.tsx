'use client';

import Link from 'next/link';
import styles from './ForgotPassword.module.css';
import SubmitButton from './SubmitButton';
import { isValidEmail } from '@lib/utils';
import { useAlert } from '@contexts/Alert';
import { forgotPassword } from '@server/actions/auth';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const router = useRouter();
  const { setAlert } = useAlert();

  async function handleForgotPassword(formData: FormData) {
    const email = formData.get('email') as string;

    if (!email)
      return setAlert({ message: 'Email is required', type: 'failed' });
    if (!isValidEmail(email))
      return setAlert({ message: 'A valid email is required', type: 'failed' });

    const { error } = await forgotPassword(email);
    if (error) return setAlert({ message: error.message, type: 'failed' });
    setAlert({ message: 'Instructions sent to your email', type: 'success' });
    router.push('/');
  }

  return (
    <section className={styles.container}>
      <h2>Forgot Password</h2>
      <form action={handleForgotPassword}>
        <label htmlFor='email'>Email*</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Enter your email'
        />
        <SubmitButton text='Submit' />
      </form>
      <p className={styles.login}>
        Remember the password? Login <Link href='/login'>here</Link>
      </p>
    </section>
  );
}

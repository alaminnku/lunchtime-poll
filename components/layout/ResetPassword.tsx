'use client';

import { useAlert } from '@contexts/Alert';
import styles from './ResetPassword.module.css';
import SubmitButton from './SubmitButton';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { resetPassword } from '@server/actions/auth';

export default function ResetPassword() {
  const params = useParams();
  const router = useRouter();
  const { setAlert } = useAlert();

  async function handleResetPassword(formData: FormData) {
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    const userId = params.user as string;
    const token = params.token as string;

    if (!userId || !token)
      return setAlert({
        message: 'User id and token are required',
        type: 'failed',
      });
    if (!password || !confirmPassword)
      return setAlert({
        message: 'Please provide required fields',
        type: 'failed',
      });
    if (password !== confirmPassword)
      return setAlert({ message: "Passwords don't match", type: 'failed' });

    const { error } = await resetPassword(
      userId,
      token,
      password,
      confirmPassword
    );
    if (error) return setAlert({ message: error.message, type: 'failed' });

    setAlert({ message: 'Password reset successful', type: 'success' });
    router.push('/login');
  }
  return (
    <section className={styles.container}>
      <h2>Reset Password</h2>
      <form action={handleResetPassword}>
        <div className={styles.form_item}>
          <label htmlFor='password'>New password*</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter new password'
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor='confirmPassword'>Confirm new password*</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            placeholder='Confirm new password'
          />
        </div>
        <SubmitButton text='Submit' />
      </form>
      <p className={styles.login}>
        Remember the password? Login <Link href='/login'>here</Link>
      </p>
    </section>
  );
}

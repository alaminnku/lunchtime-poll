'use client';

import { isValidEmail } from '@lib/utils';
import styles from './LoginForm.module.css';
import SubmitButton from './layout/SubmitButton';
import { useAlert } from '@contexts/Alert';

export default function LoginForm() {
  const { setAlert } = useAlert();

  async function handleLogin(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password)
      return setAlert({
        message: 'Name, email, or message is missing',
        type: 'failed',
      });
    if (!isValidEmail(email as string))
      return setAlert({
        message: 'Please provide a valid email',
        type: 'failed',
      });
  }

  return (
    <section className={styles.container}>
      <h2>Login</h2>
      <form action={handleLogin}>
        <div className={styles.form_item}>
          <label htmlFor='email'>Email address</label>
          <input type='email' name='email' placeholder='Enter email address' />
        </div>
        <div className={styles.form_item}>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' placeholder='Enter password' />
        </div>
        <SubmitButton text='Login' />
      </form>
    </section>
  );
}

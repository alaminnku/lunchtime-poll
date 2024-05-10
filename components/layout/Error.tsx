import { ErrorProps } from 'types';
import styles from './Error.module.css';
import { BiError } from 'react-icons/bi';

export default function Error({ reset }: ErrorProps) {
  return (
    <section className={styles.container}>
      <BiError />

      <div className={styles.content}>
        <h1>Something went wrong</h1>
        <p>
          An unexpected server condition encountered which prevented fulfilling
          your request. Please try again.
        </p>
      </div>

      <button onClick={reset}>Try again</button>
    </section>
  );
}

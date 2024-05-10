import { BounceLoader } from 'react-spinners';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <section className={styles.container}>
      <BounceLoader color='#E9B824' />
    </section>
  );
}

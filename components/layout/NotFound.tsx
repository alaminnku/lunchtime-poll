import { TbUnlink } from 'react-icons/tb';
import styles from './NotFound.module.css';
import Link from 'next/link';
import { MdKeyboardArrowRight } from 'react-icons/md';

export default function NotFound() {
  return (
    <section className={styles.container}>
      <TbUnlink className={styles.broken_link} />

      <div className={styles.content}>
        <h1>This page isn't available</h1>
        <p>
          This is maybe a broken link or the page have been removed. Please
          check to see the link you are trying to open is correct.
        </p>
      </div>

      <Link href='/' className={styles.go_home_button}>
        Go home <MdKeyboardArrowRight />
      </Link>
    </section>
  );
}

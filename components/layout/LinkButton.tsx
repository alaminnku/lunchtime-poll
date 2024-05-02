import Link from 'next/link';
import styles from './LinkButton.module.css';

type Props = {
  href: string;
  text: string;
};

export default function LinkButton({ href, text }: Props) {
  return (
    <Link href={href} className={styles.container}>
      {text}
    </Link>
  );
}

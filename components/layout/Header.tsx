import Image from 'next/image';
import styles from './Header.module.css';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.container}>
      <nav>
        <Link href='/' className={styles.logo}>
          <Image
            src='/layout/logo.jpg'
            width={400}
            height={400}
            alt='Lunchtime poll logo'
          />
        </Link>
        <div className={styles.sponsor_logo}>
          <p>Sponsored By</p>
          <a href='http://www.203bedford.com/' target='_blank'>
            <Image
              src='/layout/sponsor-logo.png'
              width={400}
              height={400}
              alt='203B logo'
            />
          </a>
        </div>
      </nav>
    </header>
  );
}

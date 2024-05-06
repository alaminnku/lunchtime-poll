import { mugs } from 'data/mugs';
import styles from './Mug.module.css';
import Image from 'next/image';

export default function Mug() {
  const randomNumber = Math.floor(Math.random() * mugs.length);
  const randomMug = mugs[randomNumber];

  return (
    <section className={styles.container}>
      <a href='https://www.203bedford.com/' target='_blank'>
        <p>{randomMug.name}</p>
        <Image
          src={randomMug.image}
          width={800}
          height={800}
          alt={randomMug.name}
        />
      </a>
    </section>
  );
}

'use client';

import { useFormStatus } from 'react-dom';
import { BeatLoader } from 'react-spinners';
import styles from './SubmitButton.module.css';

type Props = {
  text: string;
};

export default function SubmitButton({ text }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type='submit' disabled={pending} className={styles.container}>
      {pending ? <BeatLoader color='#fafafa' size={10} /> : text}
    </button>
  );
}

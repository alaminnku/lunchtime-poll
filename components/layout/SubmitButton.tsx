'use client';

import { useFormStatus } from 'react-dom';
import { BeatLoader } from 'react-spinners';
import styles from './SubmitButton.module.css';

type Props = {
  text: string;
  isDisabled?: boolean;
};

export default function SubmitButton({ text, isDisabled }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className={styles.container}
      disabled={pending || isDisabled}
    >
      {pending ? <BeatLoader color='#fafafa' size={10} /> : text}
    </button>
  );
}

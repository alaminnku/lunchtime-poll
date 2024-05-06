'use client';

import { Poll } from '@prisma/client';
import styles from './Vote.module.css';
import SubmitButton from '@components/layout/SubmitButton';
import { useState } from 'react';
import { createVote } from '@server/actions/poll';
import { useAlert } from '@contexts/Alert';
import { useRouter } from 'next/navigation';

type Props = {
  poll: Poll;
  ip: string;
};

export default function Vote({ ip, poll }: Props) {
  const router = useRouter();
  const { setAlert } = useAlert();
  const [selectedOption, setSelectedOption] = useState('');

  async function addVote() {
    const { error } = await createVote(ip, selectedOption, poll.id);
    if (error) return setAlert({ message: error.message, type: 'failed' });
    setAlert({ message: 'Vote successful', type: 'success' });
    router.push('/results');
  }

  return (
    <form action={addVote}>
      <p className={styles.question}>{poll.question}</p>
      <div className={styles.poll_items}>
        {poll.options.map((option, index) => (
          <div key={index} className={styles.poll_item}>
            <input
              type='radio'
              name='option'
              id={option}
              onChange={() => setSelectedOption(option)}
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))}
      </div>
      <SubmitButton text='Vote' isDisabled={!selectedOption} />
    </form>
  );
}

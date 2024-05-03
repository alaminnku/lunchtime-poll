'use client';

import { Poll } from '@prisma/client';
import styles from './Vote.module.css';
import SubmitButton from '@components/layout/SubmitButton';
import { FormEvent, useState } from 'react';
import { useAlert } from '@contexts/Alert';
import { createVote } from '@server/actions/vote';

type Props = {
  poll: Poll;
  ip: string | null;
};

export default function Vote({ ip, poll }: Props) {
  const { setAlert } = useAlert();
  const [selectedOption, setSelectedOption] = useState('');

  async function vote(e: FormEvent) {
    e.preventDefault();
    if (!ip) return;

    const { error } = await createVote(ip, selectedOption, poll.id);
    if (error) return setAlert({ message: error.message, type: 'failed' });
    setAlert({ message: 'Vote successful', type: 'success' });
  }
  return (
    <form onSubmit={vote}>
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
      <SubmitButton text='Vote' />
    </form>
  );
}

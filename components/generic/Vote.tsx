'use client';

import { Poll } from '@prisma/client';
import styles from './Vote.module.css';
import SubmitButton from '@components/layout/SubmitButton';
import { FormEvent, useState } from 'react';
import { db } from '@server/db';
import { useAlert } from '@contexts/Alert';
import { createVote } from '@server/actions';

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

    // const hasVoted = poll.votes?.some((vote) => vote.ipAddress === ip);
    // if (hasVoted)
    //   return setAlert({ message: "You've voted already", type: 'failed' });

    createVote(ip, selectedOption, poll);
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

'use client';

import SubmitButton from '@components/layout/SubmitButton';
import styles from './PollForm.module.css';
import { useAlert } from '@contexts/Alert';
import { createPoll } from '@server/data/poll';
import { useRouter } from 'next/navigation';
import { createISOString } from '@lib/utils';

type Props = {
  action?: 'schedule';
};

export default function PollForm({ action }: Props) {
  const router = useRouter();
  const { setAlert } = useAlert();

  async function addPoll(formData: FormData) {
    const date = formData.get('date') as string;
    const question = formData.get('question') as string;
    const firstOption = formData.get('firstOption') as string;
    const secondOption = formData.get('secondOption') as string;
    const thirdOption = formData.get('thirdOption') as string;
    const fourthOption = formData.get('fourthOption') as string;
    const fifthOption = formData.get('fifthOption') as string;

    if (
      !question ||
      !firstOption ||
      !secondOption ||
      !thirdOption ||
      !fourthOption ||
      (action === 'schedule' && !date)
    )
      return setAlert({
        message: 'Please provide required fields',
        type: 'failed',
      });

    const { error } = await createPoll(
      question,
      [firstOption, secondOption, thirdOption, fourthOption, fifthOption],
      date ? createISOString(date) : undefined
    );
    if (error) return setAlert({ message: error.message, type: 'failed' });
    setAlert({ message: 'Poll created', type: 'success' });
    !action && router.push('/admin');
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className={styles.container}>
      <h2>{action === 'schedule' ? 'Schedule Polls' : 'Create Poll'}</h2>
      <form action={addPoll}>
        {action === 'schedule' && (
          <div className={styles.form_item}>
            <label htmlFor='date'>Date*</label>
            <input
              id='date'
              type='date'
              name='date'
              min={today}
              placeholder='Enter poll question'
            />
          </div>
        )}
        <div className={styles.form_item}>
          <label htmlFor='question'>Question*</label>
          <input
            id='question'
            type='text'
            name='question'
            placeholder='Enter poll question'
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor='firstOption'>First option*</label>
          <input
            type='text'
            id='firstOption'
            name='firstOption'
            placeholder='Enter first option'
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor='secondOption'>Second option*</label>
          <input
            type='text'
            id='secondOption'
            name='secondOption'
            placeholder='Enter second option'
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor='thirdOption'>Third option*</label>
          <input
            type='text'
            id='thirdOption'
            name='thirdOption'
            placeholder='Enter third option'
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor='fourthOption'>Fourth option*</label>
          <input
            type='text'
            id='fourthOption'
            name='fourthOption'
            placeholder='Enter fourth option'
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor='fifthOption'>Fifth option</label>
          <input
            type='text'
            id='fifthOption'
            name='fifthOption'
            placeholder='Enter fifth option'
          />
        </div>
        <SubmitButton
          text={action === 'schedule' ? 'Schedule Poll' : 'Create Poll'}
        />
      </form>
    </section>
  );
}

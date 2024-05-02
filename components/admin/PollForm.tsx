'use client';

import SubmitButton from '@components/layout/SubmitButton';
import styles from './PollForm.module.css';
import { useAlert } from '@contexts/Alert';

export default function PollForm() {
  const { setAlert } = useAlert();

  async function addPoll(formData: FormData) {
    const question = formData.get('question');
    const firstOption = formData.get('firstOption');
    const secondOption = formData.get('secondOption');
    const thirdOption = formData.get('thirdOption');
    const fourthOption = formData.get('fourthOption');

    if (
      !question ||
      !firstOption ||
      !secondOption ||
      !thirdOption ||
      !fourthOption
    )
      return setAlert({
        message: 'Question or options are missing',
        type: 'failed',
      });

    const response = await fetch('/api/poll/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        options: [firstOption, secondOption, thirdOption, fourthOption],
      }),
    });
    const result = await response.json();
    if (!response.ok) return setAlert({ message: result, type: 'failed' });

    console.log(result);
  }

  return (
    <section className={styles.container}>
      <h2>Create Poll</h2>
      <form action={addPoll}>
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
        <SubmitButton text='Create Poll' />
      </form>
    </section>
  );
}

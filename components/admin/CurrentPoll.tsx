import { getCurrentPoll } from '@server/data/poll';
import styles from './CurrentPoll.module.css';
import LinkButton from '@components/layout/LinkButton';

export default async function CurrentPoll() {
  const { poll, error } = await getCurrentPoll();

  return (
    <section className={styles.container}>
      <h2>Current Poll</h2>
      {poll && (
        <div className={styles.poll}>
          <p className={styles.question}>{poll.question}</p>
          {poll.options.map((option) => (
            <div className={styles.poll_item}>
              <input type='radio' name='option' id={option} />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </div>
      )}
      {error && <p className={styles.error_message}>{error.message}</p>}
      <div className={styles.buttons}>
        <LinkButton href='/admin/create-poll' text='Create Poll -->' />
        <LinkButton href='/admin/schedule-polls' text='Schedule Polls -->' />
      </div>
    </section>
  );
}

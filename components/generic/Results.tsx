import { getCurrentPoll } from '@server/data/poll';
import BarChart from './BarChart';
import styles from './Results.module.css';

export default async function Results() {
  const { poll, error } = await getCurrentPoll();

  return (
    <section className={styles.container}>
      {poll && <BarChart poll={poll} />}
      {error && <p>{error.message}</p>}
    </section>
  );
}

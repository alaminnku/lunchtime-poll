import { getActivePoll } from '@server/data/poll';
import styles from './ActivePoll.module.css';
import Vote from './Vote';
import { getIp } from '@server/actions';

export default async function ActivePoll() {
  const ip = await getIp();
  const { poll, error } = await getActivePoll();

  return (
    <section className={styles.container}>
      {poll && <Vote poll={poll} ip={ip} />}
      {error && <p>{error.message}</p>}
    </section>
  );
}

import { getCurrentPoll } from '@server/data/poll';
import styles from './ActivePoll.module.css';
import Vote from './Vote';
import { getIp } from '@server/actions/utils';

export default async function ActivePoll() {
  const ip = await getIp();
  const { poll, error } = await getCurrentPoll();

  return (
    <section className={styles.container}>
      {poll && <Vote poll={poll} ip={ip} />}
      {error && <p>{error.message}</p>}
    </section>
  );
}

import { getCurrentPoll } from '@server/data/poll';
import styles from './ActivePoll.module.css';
import Vote from './Vote';
import { getIp } from '@server/actions/utils';
import { redirect } from 'next/navigation';

export default async function ActivePoll() {
  const ip = await getIp();
  const { poll, error } = await getCurrentPoll();

  if (poll && poll.votes.some((vote) => vote.ip === ip)) redirect('/results');

  return (
    <section className={styles.container}>
      {poll && <Vote poll={poll} ip={ip} />}
      {error && <p>{error.message}</p>}
    </section>
  );
}

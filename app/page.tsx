import { getIp } from '@lib/server';

export default async function HomePage() {
  const ip = await getIp();

  console.log(ip);
  return <main>Hello</main>;
}

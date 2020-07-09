import { Microphone } from '../../model/Microphone';
import { GetStaticProps } from 'next';
import { openDB } from '../openDB';
import Link from 'next/link';

export interface IndexProps {
  microphones: Microphone[];
}
export default function Index({ microphones }: IndexProps) {
  console.log(microphones);
  return (
    <div>
      <h1>Microphone Shop</h1>
      {microphones.map((microphone) => (
        <Link href='/microphone/[id]' as={`/microphone/${microphone.id}`}>
          <a>{microphone.brand + microphone.model}</a>
        </Link>
      ))}
      {/* this time, this will be on our browser */}
      {/* <pre>{JSON.stringify(microphones, null, 4)}</pre> */}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  //in getStaticProps, we're sure that we only run on server side so we can do something crazy like this
  const db = await openDB();
  const microphones = await db.all('select * from microphone');
  return { props: { microphones } };
};

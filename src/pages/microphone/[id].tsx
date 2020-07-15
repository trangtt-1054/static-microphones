import { Microphone } from '../../../model/Microphone';
import { GetStaticProps, GetStaticPaths } from 'next';
import { openDB } from '../../openDB';
import { useRouter } from 'next/router';

export type MicrophoneDetailProps = Microphone;

// export interface MicrophoneDetailProps extends Microphone {}: tương đương với export type MicrophoneDetailProps = Microphone; dùng cách nào cũng ok

export default function MicrophoneDetail({
  id,
  brand,
  model,
  price,
  imageUrl,
}: MicrophoneDetailProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...Wait a min</div>;
  }

  return (
    <div>
      <div>{id}</div>
      <div>{brand}</div>
      <div>{model}</div>
      <div>{price}</div>
      <div>{imageUrl}</div>
    </div>
  );
}

//because we already know that we will return MicrophoneDetailProps => pass it to GetStaticProps<MicrophoneDetailProps>
export const getStaticProps: GetStaticProps<MicrophoneDetailProps> = async (
  ctx
) => {
  const id = ctx.params.id as string;
  const db = await openDB();
  const microphone = await db.get('select * from microphone where id = ?', +id); //vì id là string nên phải thêm + để biến nó thành number
  return { props: microphone }; //this component now has access to microphone from db
};

//in order for us to receive the id, called at build time and lets you specify which paths you want to pre-render.
export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const db = await openDB();
  const microphones = await db.all('select * from microphone'); //get a;; the microphone
  const microphoneIds = microphones.map((el) => {
    return { params: { id: el.id.toString() } }; //format cho nó trả lại đúng cái type của getStaticPaths luôn
  });

  return {
    fallback: true, //fallback và path là format của cái return của getStaticPaths chứ ko phải random property
    //paths: [{ params: { id: '6' } }, { params: { id: '7' } }],
    paths: microphoneIds,
  };
};

/* step by step
- at build time, nextjs will see that you have a getStaticPaths, it will return paths one by one to getStaticProps 
- first time running, getStaticProps will get '6', pass '6' to the component 
- second time running, getStaticProps will get '7', pass '7' to the component
=> we will have 2 html generated with JSON file.
*/

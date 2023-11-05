import { AiFillHeart } from 'react-icons/ai';

export default function HeartIcon({ type }: { type: string }) {
  return type === 'detail' ? (
    <AiFillHeart className='w-6 h-6' />
  ) : (
    <AiFillHeart className='w-4 h-4' />
  );
}

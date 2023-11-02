import { AiOutlineMenu } from 'react-icons/ai';

interface Props {
  onClick: () => void;
}

export default function MenuIcon({ onClick }: Props) {
  return (
    <div className='cursor-pointer'>
      <AiOutlineMenu className='w-6 h-6' onClick={() => onClick()} />
    </div>
  );
}

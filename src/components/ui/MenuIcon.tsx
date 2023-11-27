import { AiOutlineMenu } from 'react-icons/ai';

interface Props {
  onClick: () => void;
}

export default function MenuIcon({ onClick }: Props) {
  return (
    <div className='cursor-pointer'>
      <AiOutlineMenu
        className='w-5 h-5 md:w-6 md:h-6'
        onClick={() => onClick()}
      />
    </div>
  );
}

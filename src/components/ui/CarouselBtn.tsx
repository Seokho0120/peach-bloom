import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

type Props = {
  type: string;
};

export default function CarouselBtn({ type }: Props) {
  return type === 'left' ? (
    <IoIosArrowBack className='w-1 h-1' />
  ) : (
    <IoIosArrowForward className='w-1 h-1' />
  );
}

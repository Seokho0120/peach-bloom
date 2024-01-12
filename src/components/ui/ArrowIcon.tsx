import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

type Props = {
  isOpen: boolean;
};

const ArrowIcon = ({ isOpen }: Props) => {
  return isOpen ? (
    <IoIosArrowUp className="w-5 h-5" />
  ) : (
    <IoIosArrowDown className="w-5 h-5" />
  );
};

export default ArrowIcon;

import { AiFillHeart } from 'react-icons/ai';

type Props = {
  type: string;
  isLiked?: boolean;
};

const HeartIcon = ({ type, isLiked }: Props) => {
  const likedColor = isLiked ? 'text-pinkpoint' : '';

  return type === 'detail' ? (
    <AiFillHeart className={`w-6 h-6 ${likedColor}`} />
  ) : (
    <AiFillHeart className="w-4 h-4" />
  );
};

export default HeartIcon;

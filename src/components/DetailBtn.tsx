'use client';

type ButtonProps = {
  text: string;
  onClick: () => void;
};

export const DetailBtn: React.FC<ButtonProps> = ({ text, onClick }) => {
  const textStyle =
    text === '바로 구매하기'
      ? 'bg-gray-800 text-white hover:text-pinkpoint'
      : 'border hover:text-pinkpoint';

  return (
    <button
      onClick={onClick}
      className={`text-lg font-bold p-3 cursor-pointer rounded-lg w-1/2 ${textStyle}`}
    >
      {text}
    </button>
  );
};

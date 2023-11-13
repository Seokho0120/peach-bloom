'use client';

type Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

export default function NormalBtn({ text, onClick, disabled }: Props) {
  return (
    <button
      disabled={disabled}
      className='text-xl font-bold w-full bg-navypoint text-white py-2 px-4 rounded-md hover:bg-pinkpoint'
      onClick={onClick}
    >
      {text}
    </button>
  );
}

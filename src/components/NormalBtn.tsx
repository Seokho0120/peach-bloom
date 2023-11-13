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
      className='w-full bg-navypoint text-white py-2 px-4 rounded-sm hover:brightness-110'
      onClick={onClick}
    >
      {text}
    </button>
  );
}

'use client';

type Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
};

const NormalBtn = ({ text, onClick, disabled, size = 'medium' }: Props) => {
  const sizeClasses = (() => {
    switch (size) {
      case 'small':
        return 'py-1 px-1 text-sm font-semibold rounded-md text-xs lg:text-base';
      case 'large':
        return 'text-2xl py-3 px-6 w-full text-xl <font-bo></font-bo> rounded-lg';
      default: // 'medium'
        return 'text-xl py-2 px-4 text-xl font-bold rounded-lg';
    }
  })();

  return (
    <button
      disabled={disabled}
      className={`bg-navypoint text-white hover:bg-pinkpoint text-sm font-semibold ${sizeClasses} `}
      onClick={onClick}
      aria-label={text}
    >
      {text}
    </button>
  );
};

export default NormalBtn;

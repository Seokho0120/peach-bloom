'use client';

import HeartIcon from './ui/HeartIcon';

type Props = {
  brandTitle: string;
  handleLike: () => void;
  isLiked: boolean;
  productTitle: string;
  description?: string;
  howToUse?: string;
  ingredients?: string;
  disabled?: boolean;
};

export default function ProductInfo(props: Props) {
  const {
    brandTitle,
    handleLike,
    isLiked,
    productTitle,
    description,
    howToUse,
    ingredients,
    disabled,
  } = props;

  return (
    <>
      <div className='flex items-center justify-between'>
        <p className='text-navypoint text-2xl'>{brandTitle}</p>
        <button
          onClick={handleLike}
          className={`text-slate-200 flex items-center gap-1 cursor-pointer ${
            disabled && 'opacity-80'
          }`}
          disabled={disabled}
        >
          <HeartIcon type='detail' isLiked={isLiked} />
        </button>
      </div>
      <p className='text-4xl font-semibold'>{productTitle}</p>

      <div className='flex flex-col gap-4 border-y py-6'>
        <p className=''>{description}</p>
        <div className='flex flex-col gap-2'>
          <p>사용방법</p>
          <span className='text-sm text-slate-600'>{howToUse}</span>
          <p>성분</p>
          <span className='text-sm text-slate-600'>{ingredients}</span>
        </div>
      </div>
    </>
  );
}

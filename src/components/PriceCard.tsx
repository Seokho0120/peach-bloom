'use client';

type Props = {
  price: number | undefined;
  text: string;
};

const PriceCard = ({ price, text }: Props) => {
  return (
    <div className="bg-slate-50 p-4 lg:p-8 rounded-2xl text-center text-lg md:text-xl">
      <p className="text-sm lg:text-base">{text}</p>
      <p className="font-bold text-brand text-lg md:text-2xl">{price}원</p>
    </div>
  );
};

export default PriceCard;

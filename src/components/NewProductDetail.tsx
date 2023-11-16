'use client';

import { addNewDeatil } from '@/app/api/firesotre';
import { ProductDetailType } from '@/types/Product';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  productId: string;
};

export default function NewProductDetail({ productId }: Props) {
  const router = useRouter();
  const [productDetail, setProductDetail] = useState<ProductDetailType>({
    description: '',
    howToUse: '',
    ingredients: '',
    productId: 0,
  });

  useEffect(() => {
    if (productId) {
      const productIdNumber = parseInt(productId);
      setProductDetail((productDetail) => ({
        ...productDetail,
        productId: productIdNumber,
      }));
    }
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProductDetail((productDetail) => ({ ...productDetail, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addNewDeatil(productDetail);
    await router.push('/');
  };

  return (
    <section className='w-full text-center'>
      <h2 className='text-3xl font-bold my-4 text-navypoint'>
        새로운 제품 상세 내용 등록
      </h2>

      <form
        className='flex flex-col px-12 bg-slate-50 p-10 gap-4'
        onSubmit={handleSubmit}
      >
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>설명란</p>
          <input
            type='text'
            name='description'
            value={productDetail?.description ?? ''}
            placeholder='설명란'
            required
            onChange={handleChange}
            className='w-10/12'
          />
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>사용방법</p>
          <input
            type='text'
            name='howToUse'
            value={productDetail?.howToUse ?? ''}
            placeholder='사용방법'
            required
            onChange={handleChange}
            className='w-10/12'
          />
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>주요성분</p>
          <input
            type='text'
            name='ingredients'
            value={productDetail?.ingredients ?? ''}
            placeholder='주요성분'
            required
            onChange={handleChange}
            className='w-10/12'
          />
        </div>
        <button className='bg-navypoint hover:bg-pinkpoint text-lg font-bold p-2 cursor-pointer text-white'>
          제품 상세 내용 등록하기
        </button>
      </form>
    </section>
  );
}

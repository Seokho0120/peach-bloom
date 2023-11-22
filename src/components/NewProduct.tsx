'use client';

import { addNewProduct, getProductById } from '@/app/api/firesotre';
import { uploadImage } from '@/app/api/uploader';
import { ProductListType } from '@/types/Product';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewProduct() {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [product, setProduct] = useState<ProductListType>({
    brandTitle: '',
    category: '',
    imageUrl: '',
    isSale: false,
    isNew: false,
    likedCount: 0,
    price: 0,
    productId: 0,
    productTitle: '',
    reviewCount: 0,
    saleRank: 0,
    saleRate: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, checked, type } = e.target;

    if (name === 'file') {
      if (!files) return;
      setFile(files && files[0]);
      return;
    }

    const parsedValue = type === 'number' ? Number(value) : value;

    if (type === 'checkbox') {
      setProduct((product) => ({ ...product, [name]: checked }));
    } else {
      setProduct((product) => ({ ...product, [name]: parsedValue }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const url = await uploadImage(file);
    const firebaseProductId = await addNewProduct({ product, imageUrl: url });

    const data = await getProductById(firebaseProductId);

    await router.push(`/upload/${data}`);
  };

  return (
    <article className='w-full text-center'>
      <h2 className='text-3xl font-bold my-4 text-navypoint'>
        새로운 제품 등록
      </h2>

      <form
        className='flex flex-col px-12 bg-slate-50 p-10 gap-4'
        onSubmit={handleSubmit}
      >
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>상품 이미지</p>
          <input
            type='file'
            accept='image/*'
            name='file'
            required
            onChange={handleChange}
            className='w-10/12 bg-white'
          />
        </div>
        {file && (
          <Image
            className='w-96 mx-auto mb-2'
            src={URL.createObjectURL(file)}
            width={400}
            height={400}
            alt='local file'
          />
        )}
        <div className='flex items-center gap-8'>
          <div className='flex'>
            <p className='text-lg font-semibold'>세일 여부</p>
            <input
              type='checkbox'
              name='isSale'
              placeholder='세일여부'
              required
              onChange={handleChange}
              className='w-10'
            />
          </div>
          <div className='flex'>
            <p className='text-lg font-semibold'>신상품 여부</p>
            <input
              type='checkbox'
              name='isNew'
              placeholder='신상순'
              required
              onChange={handleChange}
              className='w-10'
            />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>브랜드명</p>
          <input
            type='text'
            name='brandTitle'
            value={product?.brandTitle ?? ''}
            placeholder='브랜드명'
            required
            onChange={handleChange}
            className='w-10/12'
          />
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>카테고리</p>
          <input
            type='text'
            name='category'
            value={product?.category ?? ''}
            placeholder='카테고리'
            required
            onChange={handleChange}
            className='w-10/12'
          />
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>제품명</p>
          <input
            type='text'
            name='productTitle'
            value={product?.productTitle ?? 0}
            placeholder='제품명'
            required
            onChange={handleChange}
            className='w-10/12'
          />
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>제품 Id</p>
          <input
            type='number'
            name='productId'
            value={product?.productId ?? 0}
            placeholder='제품id'
            required
            onChange={handleChange}
            className='w-10/12'
          />
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>가격</p>
          <input
            type='number'
            name='price'
            value={product?.price ?? 0}
            placeholder='가격'
            required
            onChange={handleChange}
            className='w-10/12'
          />
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>좋아요수</p>
          <input
            type='number'
            name='likedCount'
            value={product?.likedCount ?? 0}
            placeholder='좋아요수'
            required
            onChange={handleChange}
            className='w-10/12'
          />
        </div>

        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>리뷰수</p>
          <input
            type='number'
            name='reviewCount'
            value={product?.reviewCount ?? 0}
            placeholder='리뷰수'
            required
            onChange={handleChange}
            className='w-10/12'
          />
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>랭크순</p>
          <input
            type='number'
            name='saleRank'
            value={product?.saleRank ?? 0}
            placeholder='랭크순'
            required
            onChange={handleChange}
            className='w-10/12'
          />
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-lg font-semibold'>세일율</p>
          <input
            type='number'
            name='saleRate'
            value={product?.saleRate ?? 0}
            placeholder='세일율'
            required
            onChange={handleChange}
            className='w-10/12'
          />
        </div>

        <button className='bg-navypoint hover:bg-pinkpoint text-lg font-bold p-2 cursor-pointer text-white'>
          상세 내용 등록하러 가기
        </button>
      </form>
    </article>
  );
}

import { dataTagSymbol } from '@tanstack/react-query';
import axios from 'axios';

export async function uploadImage(file: File) {
  const data = new FormData();
  data.append('file', file);
  data.append(
    'upload_preset',
    process.env.NEXT_PUBLIC_CLOUDINANRY_PRESET || ''
  );

  try {
    const response = await axios({
      method: 'POST',
      url: process.env.NEXT_PUBLIC_CLOUDINANRY_URL,
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data.url;
  } catch (error) {
    console.error('이미지 업로드 에러 발생 🚨', error);
    throw error;
  }

  // return fetch(process.env.NEXT_PUBLIC_CLOUDINANRY_URL || '', {
  //   method: 'POST',
  //   body: data,
  // })
  //   .then((res) => res.json())
  //   .then((data) => data.url);
}

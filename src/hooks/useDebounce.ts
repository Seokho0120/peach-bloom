'use client';

import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay: number = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
    //timeout이 끝나지 않았는데, value가 변경되지 않으면 예전 timeout 취소
  }, [value, delay]);

  return debounced;
}

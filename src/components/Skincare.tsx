import getQueryClient from '../app/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getSkincareProducts } from '@/api/firesotre';

export default async function Skincare() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['skincare'],
    queryFn: getSkincareProducts,
  });
  const dehydratedState = dehydrate(queryClient);

  return <HydrationBoundary state={dehydratedState} />;
}

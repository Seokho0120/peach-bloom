import Skincare from '@/components/Skincare';
import PostsPage from './posts/page';

export default function Home({ skincareItems }: any) {
  return (
    <main>
      {/* <Skincare /> */}
      <PostsPage />
    </main>
  );
}

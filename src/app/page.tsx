import dynamic from 'next/dynamic';
const Carousel = dynamic(() => import('@/components/Carousel'));
const ScrollToTopBtn = dynamic(() => import('@/components/ScrollToTopBtn'));

const Home = () => {
  return (
    <main className="mx-6 md:mx-48 lg:mx-72">
      <Carousel />
      <ScrollToTopBtn />
    </main>
  );
};

export default Home;

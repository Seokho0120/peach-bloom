import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://peach-bloom.vercel.app/sitemap.xml',
    host: 'https://peach-bloom.vercel.app/',
  };
};

export default robots;

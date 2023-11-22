import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://peach-bloom.vercel.app/sitemap.xml',
    host: 'https://peach-bloom.vercel.app/',
  };
}

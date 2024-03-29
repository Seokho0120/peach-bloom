import { MetadataRoute } from 'next';
import { getProductsList } from './api/firesotre';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const CATEGORIES = [
    'all',
    'exclusive',
    'skincare',
    'haircare',
    'bodycare',
    'makeup',
    'mens',
  ];

  const categoryPages = CATEGORIES.map((category) => ({
    url: `https://peach-bloom.vercel.app/products/${category}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const productLists = await Promise.all(
    CATEGORIES.map((category) => getProductsList(category)),
  );

  const productPages = productLists.flat().flatMap((productList) =>
    productList.products.map((product) => ({
      url: `https://peach-bloom.vercel.app/products/${product.productId}`,
      lastModified: new Date().toISOString().split('T')[0],
    })),
  );

  return [...categoryPages, ...productPages];
};

export default sitemap;

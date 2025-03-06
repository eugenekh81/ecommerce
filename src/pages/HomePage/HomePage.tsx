import { useEffect, useState } from 'react';
import { ProductIS } from '../../types/ProductIS';
import { ProductList } from '../../components/ProductList';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductIS[] | []>([]);

  const loadData = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();

    setProducts(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};

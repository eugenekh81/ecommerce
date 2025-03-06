import './App.css';
import { useEffect, useState } from 'react';
import { ProductIS } from './types/ProductIS';
import { ProductCard } from './components/ProductCard';

export const App: React.FC = () => {
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
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </>
  );
};

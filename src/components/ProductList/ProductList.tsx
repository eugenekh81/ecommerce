import React from 'react';
import { ProductIS } from '../../types/ProductIS';
import { ProductCard } from '../ProductCard';

type Props = {
  products: ProductIS[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <ul className='flex flex-wrap gap-4 justify-center'>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ul>
  );
};

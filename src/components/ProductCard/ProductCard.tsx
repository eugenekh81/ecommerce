import { ProductIS } from '../../types/ProductIS';

export const ProductCard: React.FC<ProductIS> = ({
  title,
  description,
  image,
  price,
  rating,
}) => {
  return (
    <div className='flex flex-col items-center justify-center bg-[#fff] w-[300px] gap-[30px]' >
      <img src={image} alt={title} className='h-[160px]' />
      <h2 className='text-[#212121]'>{title}</h2>
      <p className='text-[#212121]'>{description}</p>
      <p className='text-[#212121]'>${price}</p>
      <p className='text-[#212121]'>{rating.rate}</p>
      <p className='text-[#212121]'>{rating.count}</p>
    </div>
  );
};

import { ProductIS } from '../../types/ProductIS';
import { Rating } from '@mui/material'

export const ProductCard: React.FC<ProductIS> = ({
  title,
  description,
  image,
  price,
  rating,
}) => {
  return (
    <div className='flex flex-col items-center  bg-[#fff] w-[300px] gap-[30px] p-8'>
      <img src={image} alt={title} className='h-[160px]' />
      <h2 className='text-[#212121] font-bold text-[18px]'>{title}</h2>
      <p className='text-[#212121]'>{description}</p>
      <div className='text-[#212121] flex justify-between w-full'>
        <p>Price:</p>
        <p>${price}</p>
      </div>
      <div className='text-[#212121] flex justify-between w-full'>
        <Rating name='read-only' value={rating.rate} readOnly precision={0.1} />
        <p>Reviews: {rating.count}</p>
      </div>
    </div>
  );
};

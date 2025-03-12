import { Link } from 'react-router';
import { ProductIS } from '../../types/ProductIS';
import {
  Card,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Rating,
  Stack,
} from '@mui/material';

export const ProductCard: React.FC<ProductIS> = ({
  id,
  title,
  description,
  image,
  price,
  rating,
}) => {
  return (
    <Card className='flex flex-col items-center  bg-[#fff] w-[370px] gap-[30px] p-8 rounded-2xl'>
      <CardMedia
        component='img'
        src={image}
        alt={title}
        className='h-[160px] object-contain'
        height='160'
        sx={{ objectFit: 'contain' }}
      />
      <Stack direction='column' justifyContent='space-between' gap='18px'>
        <Typography
          component='h2'
          fontWeight={700}
          className='text-[#212121] font-bold text-[18px]'
        >
          {title}
        </Typography>
        <Typography component='p' className='text-[#212121]'>
          {description}
        </Typography>
        <Stack
          direction='row'
          className='text-[#212121] flex justify-between w-full'
        >
          <Typography component='p'>Price:</Typography>
          <Typography component='p'>${price}</Typography>
        </Stack>
        <Stack
          direction='row'
          className='text-[#212121] flex justify-between w-full'
        >
          <Rating
            name='read-only'
            value={rating.rate}
            readOnly
            precision={0.1}
          />
          <Typography component='p'>Reviews: {rating.count}</Typography>
        </Stack>
        <CardActions>
          <Button component={Link} to={`product/${id}`} size='small'>
            View product
          </Button>
        </CardActions>
      </Stack>
    </Card>
  );
};

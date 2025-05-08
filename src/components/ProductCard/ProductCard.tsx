import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
  updateQuantity,
  removeFromCart,
  addToCart,
} from '../../pages/CartPage/redux/cartSlice';
import { Link } from 'react-router';
import { ProductIS } from '../../types/ProductType';
import {
  Card,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Rating,
  Stack,
  IconButton,
} from '@mui/material';

import {
  Add,
  Remove,
  Delete,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import { toggleFavorite } from '../../pages/FavoritesPage/redux/favoritesSlice';
import { cartSelector } from '../../pages/CartPage/redux/selectors';
import { favoritesSelector } from '../../pages/FavoritesPage/redux/selectors';

export const ProductCard: React.FC<ProductIS> = (product) => {
  const { id, image, title, description, price, rating } = product;

  const dispatch = useDispatch<AppDispatch>();
  const { items: products } = useSelector(cartSelector, shallowEqual);
  const { items: favorites } = useSelector(favoritesSelector, shallowEqual);
  const isFavorite = favorites.some((f) => f.id === id);
  const cartItem = products.find((p) => p.id === id);

  return (
    <Card className='flex flex-col items-center bg-[#fff] w-[370px] gap-[30px] p-8 rounded-2xl'>
      <CardMedia
        component='img'
        src={image}
        alt={title}
        height='160'
        sx={{ objectFit: 'contain', height: '160px' }}
      />
      <Stack direction='column' justifyContent='space-between' gap='18px'>
        <Typography
          component='h2'
          fontWeight={700}
          sx={{
            height: '48px',
            color: '#212121',
            fontWeight: 'bold',
            fontSize: '18px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Typography>
        <Typography
          component='p'
          className='text-[#212121] h-[164px]'
          sx={{
            height: '164px',
            color: '#212121',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {description}
        </Typography>
        <Stack
          direction='row'
          sx={{
            color: '#212121',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
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
            value={rating?.rate}
            readOnly
            precision={0.1}
          />
          <Typography component='p'>Reviews: {rating?.count}</Typography>
        </Stack>
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant='contained'
            component={Link}
            to={`/ecommerce/products/${id}`}
            size='small'
          >
            View
          </Button>
          <IconButton
            color={isFavorite ? 'primary' : 'default'}
            onClick={() => dispatch(toggleFavorite(product))}
          >
            {isFavorite ? <Favorite color={'error'} /> : <FavoriteBorder />}
          </IconButton>
          {cartItem ? (
            <Stack direction='row' gap={1} alignItems={'center'}>
              <IconButton
                onClick={() => {
                  dispatch(
                    updateQuantity({ id, quantity: cartItem.quantity - 1 })
                  );
                }}
              >
                <Remove />
              </IconButton>
              <Typography component='span'>{cartItem.quantity}</Typography>
              <IconButton
                onClick={() => {
                  dispatch(
                    updateQuantity({ id, quantity: cartItem.quantity + 1 })
                  );
                }}
              >
                <Add />
              </IconButton>

              <IconButton
                color='error'
                onClick={() => dispatch(removeFromCart(product.id))}
              >
                <Delete />
              </IconButton>
            </Stack>
          ) : (
            <Button
              variant='contained'
              onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
              size='small'
            >
              Add to Cart
            </Button>
          )}
        </CardActions>
      </Stack>
    </Card>
  );
};

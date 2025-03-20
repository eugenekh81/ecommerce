import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useParams } from 'react-router';
import { RootState } from '../../redux/store';
import { useEffect } from 'react';
import {
  clearProduct,
  fetchProductDetails,
} from '../../redux/slices/productDetailsSlice';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { addToCart } from '../../redux/slices/cartSlice';

export const ProductDetailsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useSelector(
    (state: RootState) => state.productDetails
  );

  useEffect(() => {
    if (id) dispatch(fetchProductDetails(+id));

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color='error'>Error: {error}</Typography>;
  if (!product) return <Typography>No product found</Typography>;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component='img'
          height='400'
          image={product.image}
          alt={product.title}
          sx={{ objectFit: 'contain', height: 400 }}
        />
        <CardContent>
          <Typography variant='h4'>{product.title}</Typography>
          <Typography variant='h6' color='textSecondary'>
            ${product.price}
          </Typography>
          <Typography variant='body1' sx={{ mt: 2 }}>
            {product.description}
          </Typography>
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 3 }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

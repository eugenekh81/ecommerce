import { useEffect } from 'react';
import { ProductList } from '../../components/ProductList';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { CircularProgress, Typography } from '@mui/material';
import { getProducts } from '../ProductsPage/redux/productsSlice';
import { productsSelector } from '../ProductsPage/redux/selectors';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(productsSelector, shallowEqual);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading)
    return (
      <CircularProgress
        size='160px'
        sx={{
          display: 'block',
          position: 'fixed',
          top: '50%',
          left: '50%',
          translate: '-50% -50%',
        }}
      />
    );

  if (error) return <Typography color='error'>Error: {error}</Typography>;

  return items.length > 0 && <ProductList products={items} />;
};

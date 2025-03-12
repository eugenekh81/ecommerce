import { useEffect } from 'react';
import { ProductList } from '../../components/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchProducts } from '../../store/productsSlice';
import { CircularProgress, Typography } from '@mui/material';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
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

  return (
    <>
      <ProductList products={items} />
    </>
  );
};

import { useEffect } from 'react';
import { ProductList } from '../../components/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { CircularProgress, Typography } from '@mui/material';
import { setLoading } from '../../redux/slices/productsSlice';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(setLoading(true));
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

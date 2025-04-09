import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Box, Typography, Grid } from '@mui/material';
import { ProductCard } from '../../components/ProductCard'; // Assuming you already have the ProductCard component
import { ProductIS } from '../../types/ProductIS';

export const FavoritesPage: React.FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const { items: favorites } = useSelector(
    (state: RootState) => state.favorites
  );

  // Filter products that are in the favorites list
  console.log(favorites, 'favorites');

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' sx={{ mb: 3 }}>
        Your Favorites
      </Typography>

      {/* Display favorite products */}
      <Grid container spacing={3}>
        {favorites.length > 0 ? (
          favorites.map((product: ProductIS) => {
            console.log(product, 'product');

            return (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard {...product} key={product.id} />
              </Grid>
            );
          })
        ) : (
          <Typography variant='body1'>
            No products in your favorites yet.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

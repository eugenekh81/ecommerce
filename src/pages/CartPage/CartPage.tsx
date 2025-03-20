import React from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromCart,
  clearCart,
  updateQuantity,
} from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  IconButton,
  ButtonGroup,
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    console.log('id', id, 'quantity', quantity);

    if (quantity >= 1) {
      console.log('dispatching updateQuantity');

      dispatch(updateQuantity({ id, quantity }));
    }
  };

  if (items.length === 0) {
    return (
      <Typography variant='h5' sx={{ textAlign: 'center', mt: 4 }}>
        Your cart is empty.
      </Typography>
    );
  }

  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <Typography variant='h4'>Shopping Cart</Typography>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
              <CardMedia
                component='img'
                sx={{ width: 80, height: 80, mr: 2 }}
                image={item.image}
                alt={item.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h6'>{item.title}</Typography>
                <Typography variant='body2'>
                  ${item.price} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </Typography>
              </CardContent>
              <IconButton
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                <Remove />
              </IconButton>
              <Typography>{item.quantity}</Typography>
              <IconButton
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                <Add />
              </IconButton>
              <IconButton color='error' onClick={() => handleRemove(item.id)}>
                <Delete />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant='h5' sx={{ mt: 4 }}>
        Total: ${totalAmount.toFixed(2)}
      </Typography>
      <ButtonGroup variant='text' sx={{ mt: 3 }} size='large'>
        <Button
          color='primary'
          sx={{ mt: 3 }}
          disabled={items.length === 0}
          onClick={() => navigate('/ecommerce/checkout')}
        >
          Proceed to Checkout
        </Button>
        <Button
          color='secondary'
          sx={{ mt: 3 }}
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </Button>
      </ButtonGroup>
    </Container>
  );
};

import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { clearCart } from '../CartPage/redux/cartSlice';
import { cartSelector } from '../CartPage/redux/selectors';

export const CheckoutPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalAmount } = useSelector(cartSelector, shallowEqual);

  const [formData, setFormData] = React.useState({
    name: '',
    address: '',
    cardNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    dispatch(clearCart());
  };

  const handleOrder = () => {
    console.log('Order Placed', formData);
  };

  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <Typography variant='h4' gutterBottom>
        Checkout
      </Typography>

      <Grid container spacing={3}>
        {/* Order Summary */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6'>Order Summary</Typography>
              <List>
                {items.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemText
                      primary={item.title}
                      secondary={`$${item.price} x ${item.quantity}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant='h6'>
                Total: ${totalAmount.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Shipping & Payment Form */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6'>Shipping & Payment</Typography>
              <TextField
                fullWidth
                label='Full Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                margin='normal'
              />
              <TextField
                fullWidth
                label='Address'
                name='address'
                value={formData.address}
                onChange={handleChange}
                margin='normal'
              />
              <TextField
                fullWidth
                label='Card Number'
                name='cardNumber'
                value={formData.cardNumber}
                onChange={handleChange}
                margin='normal'
              />
              <Button
                variant='contained'
                color='primary'
                sx={{ mt: 3 }}
                fullWidth
                onClick={handleOrder}
                disabled={
                  !formData.name || !formData.address || !formData.cardNumber
                }
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

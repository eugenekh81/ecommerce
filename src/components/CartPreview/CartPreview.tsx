import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import {
  removeFromCart,
  updateQuantity,
} from '../../pages/CartPage/redux/cartSlice';
import { useNavigate } from 'react-router';

import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Button,
} from '@mui/material';

import { Delete, Remove, Add } from '@mui/icons-material';
import { cartSelector } from '../../pages/CartPage/redux/selectors';

type Props = {
  handleCartClose: () => void;
};

export const CartPreview: React.FC<Props> = ({ handleCartClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items } = useSelector(cartSelector, shallowEqual);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const totalPrice = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <Box>
      {items.length === 0 ? (
        <ListItem>
          <Typography variant='body2'>Cart is empty</Typography>
        </ListItem>
      ) : (
        <List dense>
          {items.slice(0, 3).map((item) => (
            <ListItem
              key={item.id}
              sx={{ display: 'flex', alignItems: 'center' }}
              secondaryAction={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    size='small'
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                  >
                    <Remove />
                  </IconButton>
                  <Typography component='span' sx={{ mx: 1 }}>
                    {item.quantity}
                  </Typography>
                  <IconButton
                    size='small'
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    <Add />
                  </IconButton>
                  <IconButton
                    edge='end'
                    color='error'
                    onClick={() => dispatch(removeFromCart(item.id))}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'background 0.2s',
                      '&:hover': { backgroundColor: 'action.hover' },
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={item.title}
                secondary={`x${item.quantity} - $${(
                  item.price * item.quantity
                ).toFixed(2)}`}
                sx={{
                  maxWidth: 200,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
      <Typography
        variant='subtitle1'
        sx={{ mt: 2, textAlign: 'center', fontWeight: 'bold' }}
      >
        Total: ${totalPrice.toFixed(2)}
      </Typography>
      <Button
        fullWidth
        variant='contained'
        color='primary'
        sx={{ mt: 2 }}
        onClick={() => {
          handleCartClose();
          navigate('/ecommerce/cart');
        }}
      >
        View Cart
      </Button>
    </Box>
  );
};

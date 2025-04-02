import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router';

import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';

import { Delete, Remove, Add } from '@mui/icons-material';

type Props = {
  handleCartClose: () => void;
  isCartOpen: boolean;
};

export const CartPreview: React.FC<Props> = ({
  handleCartClose,
  isCartOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  console.log(isCartOpen, 'is cart open');

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

          <ListItem
            onClick={() => {
              handleCartClose();
              navigate('/ecommerce/cart');
            }}
            sx={{
              justifyContent: 'center',
              fontWeight: 'bold',
              color: 'primary.main',
              transition: 'background 0.2s',
              '&:hover': { backgroundColor: 'action.selected' },
              cursor: 'pointer',
            }}
          >
            View Cart
          </ListItem>
        </List>
      )}
    </Box>
  );
};

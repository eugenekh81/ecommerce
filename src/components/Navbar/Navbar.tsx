import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { useNavigate } from 'react-router';
import {
  AppBar,
  Badge,
  IconButton,
  List,
  Menu,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import {
  ShoppingCart,
  Menu as MenuIcon,
  Delete,
  Remove,
  Add,
} from '@mui/icons-material';

type Props = {
  open: boolean;
  drawerWidth: number;
  toggleDrawer: () => void;
};

export const Navbar: React.FC<Props> = ({
  open,
  drawerWidth,
  toggleDrawer,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isCartOpen = Boolean(anchorEl);
  const handleCartClose = () => setAnchorEl(null);

  const handleCartDropdownToggle = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(isCartOpen ? null : e.currentTarget);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        width: `calc(100% - ${open ? drawerWidth : 0}px)`,
        ml: `${open ? drawerWidth : 0}px`,
        transition: 'width 0.3s ease-in-out',
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          edge='start'
          onClick={toggleDrawer}
          sx={{
            transition: 'transform 0.2s',
            '&:hover': { transform: 'scale(1.1)' },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6'>My eCommerce</Typography>

        <IconButton
          color='inherit'
          sx={{ ml: 'auto' }}
          onClick={handleCartDropdownToggle}
        >
          <Badge badgeContent={totalItems} color='error'>
            <ShoppingCart />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={isCartOpen}
          onClose={handleCartClose}
          MenuListProps={{ disablePadding: true }}
          PaperProps={{
            sx: {
              width: 400,
              p: 1,
              boxShadow: 5,
              borderRadius: 2,
              backgroundColor: 'background.paper',
            },
          }}
        >
          {items.length > 0 ? (
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
                  setAnchorEl(null);
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
          ) : (
            <ListItem>
              <Typography variant='body2'>Cart is empty</Typography>
            </ListItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

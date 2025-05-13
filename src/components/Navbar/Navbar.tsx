import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Menu,
  Badge,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { ShoppingCart, Menu as MenuIcon, Favorite } from '@mui/icons-material';
import { CartPreview } from '../CartPreview';
import { useNavigate } from 'react-router';
import { cartSelector } from '../../pages/CartPage/redux/selectors';
import { favoritesSelector } from '../../pages/FavoritesPage/redux/selectors';
import {
  isLoggedInSelector,
  userSelector,
} from '../../pages/RegisterPage/redux/selectors';

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
  const navigate = useNavigate();

  const { items } = useSelector(cartSelector, shallowEqual);
  const { items: favorites } = useSelector(favoritesSelector, shallowEqual);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalFavorites = favorites.length;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isCartOpen = Boolean(anchorEl);
  const handleCartClose = () => setAnchorEl(null);

  const handleCartDropdownToggle = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(isCartOpen ? null : e.currentTarget);

  const { user } = useSelector(userSelector, shallowEqual);
  const isLoggedIn = useSelector(isLoggedInSelector, shallowEqual);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('login');
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
        <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
          <IconButton
            color='inherit'
            sx={{ ml: 'auto' }}
            onClick={() => navigate('favorites')}
          >
            <Badge badgeContent={totalFavorites} color='error'>
              <Favorite />
            </Badge>
          </IconButton>

          <IconButton
            color='inherit'
            sx={{ ml: 'auto' }}
            onClick={handleCartDropdownToggle}
          >
            <Badge badgeContent={totalItems} color='error'>
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>

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
          <CartPreview handleCartClose={handleCartClose} />
        </Menu>

        {!isLoggedIn ? (
          <Box>
            <Button color='inherit' onClick={() => navigate('login')}>
              Login
            </Button>
            <Button color='inherit' onClick={() => navigate('register')}>
              Register
            </Button>
          </Box>
        ) : (
          <Box display='flex' alignItems='center' gap={1}>
            <Typography variant='body1'>{user?.email}</Typography>
            <Button color='inherit' onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

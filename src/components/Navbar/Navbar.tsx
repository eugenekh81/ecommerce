import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  AppBar,
  Menu,
  Badge,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import { CartPreview } from '../CartPreview';

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
  const { items } = useSelector((state: RootState) => state.cart);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isCartOpen = Boolean(anchorEl);
  const handleCartClose = () => setAnchorEl(null);

  const handleCartDropdownToggle = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(isCartOpen ? null : e.currentTarget);

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
          <CartPreview handleCartClose={handleCartClose} />
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

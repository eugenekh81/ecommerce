import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import { AppDispatch } from '../../redux/store';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router';
import { restoreAuth } from '../../api/auth';

import { Navbar } from '../Navbar/';
import { isLoggedInSelector } from '../../pages/RegisterPage/redux/selectors';

const drawerWidth = 240;

export const Layout: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(isLoggedInSelector, shallowEqual);

  useEffect(() => {
    restoreAuth(dispatch);
  }, [dispatch]);

  console.log(isLoggedIn);
  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />

      <Navbar
        open={open}
        drawerWidth={drawerWidth}
        toggleDrawer={toggleDrawer}
      />

      {/* Sidebar (Persistent Drawer) */}
      <Drawer
        variant='persistent'
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: open ? drawerWidth : 0,
          transition: 'width 0.3s ease-in-out',
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 1000, // Ensure it stays above content
          },
        }}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
      >
        <List>
          <ListItem component={Link} to='/ecommerce'>
            <ListItemText primary='Home' />
          </ListItem>
          <ListItem component={Link} to='products'>
            <ListItemText primary='Products' />
          </ListItem>
          <ListItem component={Link} to='cart'>
            <ListItemText primary='Cart' />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <main
        style={{
          flexGrow: 1,
          padding: '64px 20px 20px',
          transition: 'margin-left 0.3s ease-in-out', // Smooth transition when opening/closing drawer
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

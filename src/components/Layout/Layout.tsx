import {
  AppBar,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
import { Menu } from '@mui/icons-material';
import { useState } from 'react';
import { Link, Outlet } from 'react-router';

const drawerWidth = 240;

export const Layout: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    // <div className='grid grid-cols-[48px_1fr] h-full'>
    //   <aside className='flex-shrink-0 row-start-1'>
    //     <IconButton onClick={() => setIsOpen(true)} size='large' className='fixed! top-0 z-10'>
    //       <MenuIcon color='info' />
    //     </IconButton>
    //     <Drawer
    //       anchor='left'
    //       open={isOpen}
    //       onClose={() => setIsOpen(false)}
    //       className='w-[100%]'
    //     >
    //       <nav className='w-[240px]'>
    //         <ul>
    //           <li>
    //             <NavLink to='/ecommerce/'>Home</NavLink>
    //           </li>
    //           <li>
    //             <NavLink to='/ecommerce/about'>About</NavLink>
    //           </li>
    //         </ul>
    //       </nav>
    //     </Drawer>
    //   </aside>
    //   <main className='flex col-span-2 row-start-1'>
    //     <Outlet />
    //   </main>

    //   <footer className='col-span-full'>(C) 2025</footer>
    // </div>

    <div style={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position='fixed'
        sx={{
          width: `calc(100% - ${open ? drawerWidth : 0}px)`,
          ml: `${open ? drawerWidth : 0}px`,
          transition: 'width 0.3s ease-in-out',
        }}
      >
        <Toolbar>
          <IconButton color='inherit' edge='start' onClick={toggleDrawer}>
            <Menu />
          </IconButton>
          <Typography variant='h6'>My eCommerce</Typography>
        </Toolbar>
      </AppBar>

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

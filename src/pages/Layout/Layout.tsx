import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';

export const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex h-screen'>
      <aside className='flex-shrink-0'>
        <IconButton onClick={() => setIsOpen(true)} size='large'>
          <MenuIcon color='info' />
        </IconButton>
        <Drawer
          anchor='left'
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className='w-[100%]'
        >
          <nav className='w-[240px]'>
            <ul>
              <li>
                <NavLink to='/ecommerce/'>Home</NavLink>
              </li>
              <li>
                <NavLink to='/ecommerce/about'>About</NavLink>
              </li>
            </ul>
          </nav>
        </Drawer>
      </aside>
      <main className='flex flex-shrink-0'>
        <Outlet />
      </main>

      <footer>(C) 2025</footer>
    </div>
  );
};

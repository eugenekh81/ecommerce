import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router';

export const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='grid grid-cols-[48px_1fr] h-full'>
      <aside className='flex-shrink-0 row-start-1'>
        <IconButton onClick={() => setIsOpen(true)} size='large' className='fixed! top-0 z-10'>
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
      <main className='flex col-span-2 row-start-1'>
        <Outlet />
      </main>

      <footer className='col-span-full'>(C) 2025</footer>
    </div>
  );
};

import React from 'react';

import { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';

import { useNavigate } from 'react-router';
import { authSelector } from './redux/selectors';
import { loginStart } from './redux/authSlice';
import { userSelector } from '../RegisterPage/redux/selectors';

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loginLoading, loginError } = useSelector(authSelector, shallowEqual);

  const { user } = useSelector(userSelector, shallowEqual);

  const [{ username, password }, setFormData] = useState({
    username: 'johnd',
    password: 'm38rmF$',
  });

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart({ username, password }));
  };

  if (user) {
    navigate('/ecommerce');
    return null;
  }

  return (
    <Container maxWidth='xs'>
      <Box sx={{ mt: 8 }}>
        <Typography variant='h5' gutterBottom>
          Login
        </Typography>
        {loginError && <Alert severity='error'>{loginError}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin='normal'
            label='Username'
            type='text'
            required
            value={username}
            onChange={handleFormInputChange}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Password'
            name='password'
            type='password'
            required
            value={password}
            onChange={handleFormInputChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 2 }}
            disabled={loginLoading}
          >
            {loginLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

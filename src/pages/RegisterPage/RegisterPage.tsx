import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userSelector } from './redux/selectors';
import { register } from './redux/userSlice';

export const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { registerLoading, registerError, user } = useSelector(
    userSelector,
    shallowEqual
  );

  const [{ username, email, password }, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
  });

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(register({ username, password, email }));
    setFormData({ username: '', email: '', password: '' });
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/ecommerce');
    }
  }, [user, navigate]);

  return (
    <Container maxWidth='xs'>
      <Box sx={{ mt: 8 }}>
        <Typography variant='h5' gutterBottom>
          Register
        </Typography>
        {registerError && <Alert severity='error'>{registerError}</Alert>}
        <form onSubmit={handleRegister}>
          <TextField
            fullWidth
            margin='normal'
            label='Email'
            type='email'
            name='email'
            required
            value={email}
            onChange={handleFormInputChange}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Username'
            name='username'
            type='text'
            required
            value={username}
            onChange={handleFormInputChange}
          />
          <TextField
            fullWidth
            margin='normal'
            label='Password'
            type='password'
            name='password'
            required
            value={password}
            onChange={handleFormInputChange}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 2 }}
            disabled={registerLoading}
          >
            {registerLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

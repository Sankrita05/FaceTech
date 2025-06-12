import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Avatar,
  Paper,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import useStyles from '../styles/mainStyles';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email,
        password
      });

      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      setError('');
      navigate('/home'); // Redirect after login
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <Box className={classes.container}>
      <Paper elevation={2} className={classes.paper}>
        <Box className={classes.header}>
          <ManageAccountsIcon style={{ fontSize: 50, color: '#131d41' }} />
          <Typography variant="h6" className={classes.title}>
            FaceTech
          </Typography>
        </Box>
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {error && (
            <Typography color="error" variant="body2" style={{ marginTop: 5 }}>
              {error}
            </Typography>
          )}
          <Box className={classes.optionsRow}>
            <Typography></Typography>
            <Link href="/forgot-password" variant="body2" className={classes.forgot}>
              Forgot Password?
            </Link>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Login
          </Button>
          <Box mt={2} className={classes.footer}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link href="/signup" variant="body2" className={classes.link}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;

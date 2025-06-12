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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useStyles from '../styles/mainStyles';
import { initiateRegistration } from '../services/authService';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const SignUpForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await initiateRegistration(formData);
      navigate('/verify-otp', {
        state: { email: formData.email }
      });
    } catch (err) {
      if (err.response?.data) {
        const serverErrors = err.response.data;
        const firstError = Object.values(serverErrors)[0];
        setError(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        setError("Registration failed. Please try again.");
      }
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

        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            name="confirm_password"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={formData.confirm_password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    aria-label="toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Box className={classes.optionsRow}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link href="/login" variant="body2" className={classes.loginLink}>
                Login
              </Link>
            </Typography>
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
            Sign Up
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUpForm;

import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Paper,
  Link
} from '@mui/material';
import useStyles from '../styles/mainStyles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetOtp } from '../services/authService';  // import axios call
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const ForgotPasswordForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetOtp(email);
      setLoading(false);
      navigate('/reset-password', { state: { email } });  // << navigate here
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.detail || 'Failed to send OTP. Please try again.');
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
        <Typography variant="h6" className={classes.heading}>
          Forgot Password
        </Typography>
        <Typography variant="body2" className={classes.subText}>
          Enter your registered email to receive an OTP for password reset.
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          {error && (
            <Typography color="error" variant="body2" style={{ marginTop: '8px' }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
          <Box mt={2} className={classes.footer}>
            <Typography variant="body2">
              Remembered your password?{' '}
              <Link href="/login" variant="body2" className={classes.link}>
                Login
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPasswordForm;

import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Paper
} from '@mui/material';
import useStyles from '../styles/mainStyles';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/authService';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const ResetPasswordForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await resetPassword(email, otp, newPassword);
      setSuccessMsg('Password reset successful!');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      const errMsg =
        err.response?.data?.detail || 'Invalid OTP or error during password reset.';
      setError(errMsg);
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
          Reset Password
        </Typography>
        <Typography variant="body2" className={classes.subText}>
          Enter the OTP sent to <strong>{email}</strong> and your new password.
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="OTP"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          {successMsg && (
            <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
              {successMsg}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPasswordForm;

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
import { verifyRegistrationOtp } from '../services/authService';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const OtpVerificationForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      await verifyRegistrationOtp(email, otp);
      setSuccessMsg('Registration successful! You can now log in.');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // delay to show message
    } catch (err) {
      const errMsg =
        err.response?.data?.detail || 'Invalid OTP or verification failed.';
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
          Verify OTP
        </Typography>
        <Typography variant="body2" className={classes.subText}>
          Enter the OTP sent to <strong>{email}</strong>.
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
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          {successMsg && (
            <Typography variant="body2" color="primary">
              {successMsg}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Verify OTP
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default OtpVerificationForm;

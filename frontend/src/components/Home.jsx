// src/components/Home.jsx
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useStyles from '../styles/homeStyles';


const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4" className={classes.title}>
          Welcome to FaceTech!
        </Typography>
        <Typography variant="body1" className={classes.subtitle}>
          Explore our cutting-edge face detection and recognition features.
        </Typography>
        <Box className={classes.actions}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => navigate('/face-detection')}
          >
            Face Detection
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => navigate('/face-recognition')}
          >
            Face Recognition
          </Button>
          <Button
            variant="contained"
            color="success"
            className={classes.button}
            onClick={() => navigate('/expression-recognition')}
          >
            Expression Recognition
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default HomePage;

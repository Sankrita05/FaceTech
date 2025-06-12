import { Box, Typography, Button, Paper } from '@mui/material';
import { useState } from 'react';
import useStyles from '../styles/faceStyles';

const FaceRecognition= () => {
  const classes = useStyles();
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      // You can send this image to the backend API for face detection
    }
  };

  return (
    <Box className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4" className={classes.title}>
          Face Recognition
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className={classes.uploadButton}
        />
        {image && <img src={image} alt="uploaded face" className={classes.imagePreview} />}
        <Button variant="contained" color="primary" className={classes.button}>
          Detect Faces
        </Button>
      </Paper>
    </Box>
  );
};

export default FaceRecognition;

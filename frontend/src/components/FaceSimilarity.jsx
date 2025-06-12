import { Box, Typography, Button, Paper } from '@mui/material';
import { useState } from 'react';
import useStyles from '../styles/faceStyles';

const FaceSimilarity = () => {
  const classes = useStyles();
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const handleImageUpload = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Box className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4" className={classes.title}>
          Face Similarity
        </Typography>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, setImage1)}
          className={classes.uploadButton}
        />
        {image1 && <img src={image1} alt="first face" className={classes.imagePreview} />}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, setImage2)}
          className={classes.uploadButton}
        />
        {image2 && <img src={image2} alt="second face" className={classes.imagePreview} />}
        <Button variant="contained" color="primary" className={classes.button}>
          Check Similarity
        </Button>
      </Paper>
    </Box>
  );
};

export default FaceSimilarity;

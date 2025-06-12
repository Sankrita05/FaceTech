import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Avatar } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const ExpressionMatching = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [expressionResult, setExpressionResult] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleExpressionMatch = async () => {
  if (!selectedImage) return;

  const formData = new FormData();
  const fileInput = document.querySelector('input[type="file"]');
  formData.append('image', fileInput.files[0]);

  try {
    const response = await fetch('http://localhost:8000/api/emotion-detection/', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    if (data.expression) {
      setExpressionResult(data.expression);
    } else {
      setExpressionResult('No expression detected');
    }
  } catch (error) {
    setExpressionResult('Error detecting expression');
  }
};


  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#F4F7FF',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: '600px',
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <EmojiEmotionsIcon sx={{ fontSize: 100, color: '#4287f5', mb: 1 }} />
          <Typography variant="h6" sx={{ color: '#6B6BFF', fontWeight: 800 }}>
            Image2Emotion
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Button variant="contained" component="label" sx={{ backgroundColor: '#6B6BFF' }}>
            Upload Image
            <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
          </Button>
        </Box>

        {selectedImage && (
          <Box sx={{ mb: 2 }}>
            <img
              src={selectedImage}
              alt="Uploaded"
              style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 10 }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          onClick={handleExpressionMatch}
          sx={{
            backgroundColor: '#6B6BFF',
            color: 'white',
            '&:hover': { backgroundColor: '#5757d1' },
            mb: 2,
          }}
        >
          Get Expression
        </Button>

        {expressionResult && (
          <Typography variant="h6" sx={{ color: '#6B6BFF', fontWeight: 600 }}>
            Expression: {expressionResult}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ExpressionMatching;

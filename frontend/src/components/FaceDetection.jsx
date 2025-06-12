import React, { useState, useRef } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';
import axios from 'axios';

const FaceDetection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [processedVideo, setProcessedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedVideo(file);
      setProcessedVideo(null);
    }
  };

  const handleFaceDetection = async () => {
    if (!selectedVideo) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('video', selectedVideo);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/face-detection/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob',
        }
      );

      const videoBlob = new Blob([response.data], { type: 'video/mp4' });
      const videoURL = URL.createObjectURL(videoBlob);
      setProcessedVideo(videoURL);
    } catch (error) {
      console.error('Face detection failed:', error);
      alert('Failed to detect faces in the video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden', // prevents scroll
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4F7FF',
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 3,
          width: '100%',
          maxWidth: '560px',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
          <FaceIcon sx={{ fontSize: 36, color: '#131d41', mb: 0.5 }} />
          <Typography variant="subtitle1" sx={{ color: '#6B6BFF', fontWeight: 700 }}>
            Video2FaceDetect
          </Typography>
        </Box>

        <Box sx={{ mb: 1 }}>
          <Button variant="contained" component="label" sx={{ backgroundColor: '#6B6BFF', fontSize: 12 }}>
            Upload Video
            <input type="file" accept="video/*" hidden onChange={handleVideoUpload} />
          </Button>
        </Box>

        {!processedVideo && selectedVideo && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>Original Video:</Typography>
            <video
              ref={videoRef}
              src={URL.createObjectURL(selectedVideo)}
              controls
              style={{ width: '100%', borderRadius: 8, maxHeight: '200px' }}
            />
          </Box>
        )}

        {!processedVideo && (
          <Button
            variant="contained"
            onClick={handleFaceDetection}
            disabled={loading || !selectedVideo}
            sx={{
              backgroundColor: '#6B6BFF',
              fontSize: 12,
              color: 'white',
              '&:hover': { backgroundColor: '#5757d1' },
              mb: 1,
            }}
          >
            {loading ? 'Processing...' : 'Detect Faces'}
          </Button>
        )}

        {processedVideo && (
          <Box>
            <Typography variant="body2" sx={{ mb: 0.5, color: '#6B6BFF', fontWeight: 600 }}>
              Processed Video:
            </Typography>
            <video
              src={processedVideo}
              controls
              style={{ width: '100%', borderRadius: 8, maxHeight: '200px' }}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default FaceDetection;

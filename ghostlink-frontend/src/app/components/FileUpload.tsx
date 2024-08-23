'use client';
import { useState } from 'react';
import axios from 'axios';
import { Button, LinearProgress, Typography, Box } from '@mui/material';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: number; type: string; transcript?: string } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);  // Set processing state to true
    setUploadProgress(0);   // Reset progress to 0

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setUploadProgress(percentCompleted);
        },
      });

      setFileDetails({
        name: response.data.file_name,
        size: response.data.file_size,
        type: response.data.file_type,
        transcript: response.data.transcript,
      });

      setIsProcessing(false);  // Set processing state to false after completion
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsProcessing(false);  // Set processing state to false in case of error
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Box display="flex" justifyContent="center" mb={2}>
        <input
          accept="*/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" color="primary" component="span">
            Choose File
          </Button>
        </label>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleFileUpload}
          disabled={!selectedFile || isProcessing}
          style={{ marginLeft: '10px' }}
        >
          Upload
        </Button>
      </Box>
      {uploadProgress > 0 && (
        <Box mb={2}>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            style={{
              backgroundColor: '#90caf9', // Blue background when not complete
              color: '#4caf50',            // Green progress bar
            }}
          />
          <Typography variant="body1" style={{ marginTop: '10px' }}>
            {uploadProgress < 100 ? `Processing video... (${uploadProgress}%)` : 'Processing complete!'}
          </Typography>
        </Box>
      )}
      {fileDetails && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">File Details:</Typography>
          <Typography><strong>Name:</strong> {fileDetails.name}</Typography>
          <Typography><strong>Size:</strong> {(fileDetails.size / 1024).toFixed(2)} KB</Typography>
          <Typography><strong>Type:</strong> {fileDetails.type}</Typography>
          {fileDetails.transcript && (
            <div style={{ marginTop: '20px' }}>
              <Typography variant="h6">Transcript:</Typography>
              <Typography>{fileDetails.transcript}</Typography>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
'use client';
import { useState } from 'react';
import axios from 'axios';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [fileDetails, setFileDetails] = useState<{ name: string; size: number; type: string } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

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

      // Set file details after successful upload
      setFileDetails({
        name: response.data.file_name,
        size: response.data.file_size,
        type: response.data.file_type,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Upload File</h1>
      <input type="file" onChange={handleFileChange} style={{ margin: '10px 0' }} />
      <button onClick={handleFileUpload} style={{ marginLeft: '10px' }}>Upload</button>
      {uploadProgress > 0 && <p>Uploading: {uploadProgress}%</p>}
      {fileDetails && (
        <div style={{ marginTop: '20px' }}>
          <h2>File Details:</h2>
          <p><strong>Name:</strong> {fileDetails.name}</p>
          <p><strong>Size:</strong> {(fileDetails.size / 1024).toFixed(2)} KB</p>
          <p><strong>Type:</strong> {fileDetails.type}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
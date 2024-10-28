import React, { useEffect } from 'react';
import $ from 'jquery';
import 'dropify/dist/css/dropify.min.css';
import 'dropify/dist/js/dropify.min.js';
import { useState } from 'react';
import toast from 'react-hot-toast';

const FileUpload = ({ inputName, allowedExtensions, onFileSelect }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize Dropify
    const dropifyInstance = $('.dropify').dropify({
      messages: {
        'default': 'Drag and drop a attachment here or click',
        'replace': 'Drag and drop or click to replace',
        'remove': 'Remove',
        'error': 'Oops, something wrong happened.'
      },
      error: {
        'fileSize': 'The file size is too big ({{ value }} max).'
      }
    });

    // Store the instance for later use
    const drInstance = dropifyInstance.data('dropify');

    return () => {
      // Cleanup: destroy the Dropify instance
      // if (dropifyInstance) {
      //   dropifyInstance.destroy();
      // }
    };
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const fileExtension = selectedFile?.name.split('.').pop().toLowerCase();
    const dropifyElement = $(e.target).data('dropify'); // Get the Dropify instance for the specific input

    if (allowedExtensions.includes(fileExtension)) {
      setFile(selectedFile);
      setError('');
      onFileSelect(selectedFile); // Pass the selected file to the parent component
    } else {
      setFile(null);
      setError(`Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`);
      onFileSelect(null); // Pass the selected file to the parent component
      // Reset the Dropify input field
      dropifyElement.resetPreview();
      dropifyElement.clearElement();

      // Show a toast notification (optional)
      toast.error(`Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`);
    }
  };

  return (
    <div className="form-group font-weight-b">
      <label htmlFor="fileInput">Upload File</label>
      <input
        type="file"
        id="fileInput"
        name={inputName}
        className="dropify"
        onChange={handleFileChange}
        accept={allowedExtensions.map(ext => `.${ext}`).join(',')}
        style={{ color: 'red' }}
      />
      {error && (
        <div style={{ color: 'red', wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
          {error}
        </div>
      )}
      {file && (
        <div style={{ wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal', }}>
          Selected file: {file.name}
        </div>
      )}
    </div>
  );
};

export default FileUpload;

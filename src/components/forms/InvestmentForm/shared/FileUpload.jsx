// src/components/forms/shared/FileUpload.jsx
import React, { useState, useCallback } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';
import FormField from './FormField';

const FileUpload = ({
  label,
  description,
  accept = '.pdf,.doc,.docx,.xls,.xlsx',
  maxSize = 10 * 1024 * 1024, // 10MB
  required,
  error,
  onChange,
  value,
  helpText
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState('');

  const validateFile = (file) => {
    if (file.size > maxSize) {
      setFileError('File size exceeds maximum limit');
      return false;
    }

    const acceptedTypes = accept.split(',');
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      setFileError('File type not supported');
      return false;
    }

    setFileError('');
    return true;
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onChange(file);
      }
    }
  }, [onChange]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleChange = useCallback((e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onChange(file);
      }
    }
  }, [onChange]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <FormField
      label={label}
      description={description}
      required={required}
      error={error || fileError}
      helpText={helpText}
    >
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 ${
          dragActive 
            ? 'border-sw-blue bg-blue-50' 
            : 'border-gray-300 hover:border-sw-blue'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {value ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <File className="h-8 w-8 text-sw-blue" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{value.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(value.size)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label className="relative cursor-pointer rounded-md font-semibold text-sw-blue hover:text-sw-blue-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-sw-blue focus-within:ring-offset-2">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  onChange={handleChange}
                  accept={accept}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {accept.split(',').join(', ')} up to {formatFileSize(maxSize)}
            </p>
          </div>
        )}
      </div>
    </FormField>
  );
};

export default FileUpload;
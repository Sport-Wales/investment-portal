// src/components/forms/InvestmentForm/tasks/AdditionalDocs.jsx
import React, { useState } from 'react';
import { useForm } from '../../../../context/FormContext';
import FormField from '../shared/FormField';
import { 
  Upload, 
  FileText, 
  Info, 
  X, 
  Check,
  AlertCircle
} from 'lucide-react';

const AdditionalDocs = () => {
  const { state, dispatch } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [note, setNote] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const formData = state.formData.additionalDocs || {
    documents: []
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.length) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (files) => {
    if (files?.length) {
      setSelectedFile(files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const newDocument = {
      id: Date.now() + Math.random(),
      file: {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        lastModified: selectedFile.lastModified
      },
      uploadDate: new Date().toISOString(),
      note: note
    };

    dispatch({
      type: 'SET_FORM_DATA',
      section: 'additionalDocs',
      data: {
        ...formData,
        documents: [...(formData.documents || []), newDocument]
      }
    });

    // Reset form
    setSelectedFile(null);
    setNote('');
  };

  const removeDocument = (docId) => {
    dispatch({
      type: 'SET_FORM_DATA',
      section: 'additionalDocs',
      data: {
        ...formData,
        documents: formData.documents.filter(doc => doc.id !== docId)
      }
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Introduction */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start space-x-3">
          <FileText className="h-6 w-6 text-sw-blue flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Additional Documentation</h2>
            <p className="mt-1 text-sm text-gray-500">
              Upload any additional documents or evidence to support your submission.
            </p>
          </div>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-base font-medium text-gray-900 mb-4">Upload Document</h3>
        
        {/* File Selection */}
        <div
          className={`
            border-2 border-dashed rounded-lg p-6
            ${dragActive ? 'border-sw-blue bg-blue-50' : 'border-gray-300'}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label className="relative cursor-pointer">
                <span className="rounded-md font-medium text-sw-blue hover:text-sw-blue-dark">
                  Select file
                </span>
                <input
                  type="file"
                  className="sr-only"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                />
              </label>
              <span className="text-gray-500"> or drag and drop</span>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, CSV up to 10MB
            </p>
          </div>
        </div>

        {/* Selected File Preview */}
        {selectedFile && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Note Input */}
            <div className="mt-4">
              <FormField
                label="Add a note"
                description="Provide context or description for this document"
              >
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-sw-blue focus:border-sw-blue sm:text-sm"
                  placeholder="Add any relevant notes about this document..."
                />
              </FormField>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleUpload}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sw-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sw-blue"
                >
                  Upload Document
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Document List */}
      {formData.documents?.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
          <div className="px-6 py-4 bg-gray-50">
            <h3 className="text-base font-medium text-gray-900">Uploaded Documents</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {formData.documents.map((doc) => (
              <div key={doc.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {doc.file.name}
                      </p>
                      <div className="mt-1 flex items-center space-x-2 text-xs text-gray-500">
                        <span>{formatFileSize(doc.file.size)}</span>
                        <span>•</span>
                        <span>
                          Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                      {doc.note && (
                        <div className="mt-2 text-sm text-gray-600 bg-gray-50 rounded-md p-3">
                          {doc.note}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
        <div className="flex">
          <Info className="h-5 w-5 text-sw-blue flex-shrink-0" />
          <div className="ml-3">
            <h4 className="text-sm font-medium text-sw-blue">Supporting Documentation</h4>
            <div className="mt-2 text-sm text-gray-600">
              <ul className="list-disc pl-5 space-y-1">
                <li>Include a note with each document for context</li>
                <li>Ensure files are clear and readable</li>
                <li>Maximum file size is 10MB per document</li>
                <li>You can remove documents if needed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDocs;
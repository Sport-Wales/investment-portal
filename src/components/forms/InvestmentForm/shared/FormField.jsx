// src/components/forms/shared/FormField.jsx
import React from 'react';
import { AlertCircle, Info } from 'lucide-react';

const FormField = ({ 
  label, 
  description, 
  error, 
  required, 
  children, 
  helpText,
  className = '' 
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="flex justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-sw-red ml-1">*</span>}
        </label>
        {helpText && (
          <div className="group relative">
            <Info className="h-4 w-4 text-gray-400 cursor-help" />
            <div className="hidden group-hover:block absolute right-0 z-10 w-64 mt-2 p-2 text-xs text-white bg-gray-900 rounded shadow-lg">
              {helpText}
            </div>
          </div>
        )}
      </div>
      
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}

      <div className="mt-1">{children}</div>

      {error && (
        <div className="mt-2 flex items-center text-sm text-sw-red">
          <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;
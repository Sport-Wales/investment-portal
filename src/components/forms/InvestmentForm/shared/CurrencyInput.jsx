// src/components/forms/shared/CurrencyInput.jsx
import React from 'react';
import { PoundSterling } from 'lucide-react';
import FormField from './FormField';

const CurrencyInput = ({
  label,
  value,
  onChange,
  error,
  required,
  disabled,
  placeholder = '0.00',
  description,
  helpText,
  min,
  max
}) => {
  const handleChange = (e) => {
    const value = e.target.value;
    
    // Only allow numbers and decimals
    if (!/^\d*\.?\d{0,2}$/.test(value)) {
      return;
    }

    // Convert to number for validation
    const numValue = parseFloat(value || 0);

    // Check min/max if provided
    if ((min !== undefined && numValue < min) || 
        (max !== undefined && numValue > max)) {
      return;
    }

    onChange(value);
  };

  const formatValue = (value) => {
    if (!value) return '';
    return parseFloat(value).toFixed(2);
  };

  return (
    <FormField
      label={label}
      error={error}
      required={required}
      description={description}
      helpText={helpText}
    >
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <PoundSterling className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={formatValue(value)}
          onChange={handleChange}
          disabled={disabled}
          className={`
            block w-full pl-10 pr-3 py-2 rounded-md 
            ${disabled ? 'bg-gray-100' : 'bg-white'}
            ${error ? 'border-sw-red' : 'border-gray-300'}
            focus:outline-none focus:ring-sw-blue focus:border-sw-blue
            sm:text-sm
          `}
          placeholder={placeholder}
        />
      </div>
      {(min !== undefined || max !== undefined) && (
        <p className="mt-1 text-xs text-gray-500">
          {min !== undefined && max !== undefined
            ? `Value must be between £${min} and £${max}`
            : min !== undefined
            ? `Minimum value: £${min}`
            : `Maximum value: £${max}`}
        </p>
      )}
    </FormField>
  );
};

export default CurrencyInput;




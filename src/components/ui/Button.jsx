// src/components/ui/Button.jsx
import React from 'react';

const Button = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = 'sw-button';
  const variantClasses = {
    primary: 'sw-button-primary',
    secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
import React from 'react';

const Input = ({ label, type = 'text', ...props }) => {
  return (
    <label className="block">
      <span className="text-gray-700">{label}</span>
      <input
        type={type}
        className="sw-input"
        {...props}
      />
    </label>
  );
};

export default Input;
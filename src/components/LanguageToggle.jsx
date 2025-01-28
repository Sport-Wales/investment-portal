// src/components/LanguageToggle.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LanguageToggle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isWelsh = location.pathname.includes('/cy');

  const toggleLanguage = () => {
    const newPath = isWelsh 
      ? location.pathname.replace('/cy', '/en')
      : location.pathname.replace('/en', '/cy');
    navigate(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 px-4 py-2 bg-[--color-sw-blue] text-white rounded-lg hover:opacity-90 transition-opacity"
    >
      {isWelsh ? 'English' : 'Cymraeg'}
    </button>
  );
};

export default LanguageToggle;
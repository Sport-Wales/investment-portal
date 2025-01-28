import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="text-center">
          <p>© {new Date().getFullYear()} Sport Wales Digital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
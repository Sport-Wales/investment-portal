import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Calculator from './pages/Calculator';
import LanguageToggle from './components/LanguageToggle';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <main>
          {/* <LanguageToggle /> */}
          <Routes>
            <Route path="/" element={<Calculator />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
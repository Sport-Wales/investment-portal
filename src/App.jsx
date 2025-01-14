// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Portal from './pages/Portal';
import InvestmentForm from './components/forms/InvestmentForm';
import { FormProvider } from './context/FormContext';

// Mock user types
const mockUsers = {
  partner: {
    id: 1,
    name: "Welsh Athletics",
    role: "partner",
    organisation: "Welsh Athletics",
    orgId: "welsh-athletics",
    token: "PnCqXcNPF2E"
  },
  staff: {
    id: 2,
    name: "Sport Wales Staff",
    role: "staff",
    department: "Investment"
  }
};

// Get partner token from URL
const getPartnerTokenFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('v');
};

// Authentication Context
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const token = getPartnerTokenFromURL();
      setIsLoading(false);
    };
    checkToken();
  }, []); // Empty dependency array

  const login = async (credentials) => {
    const token = getPartnerTokenFromURL();
    
    if (token) {
      setUser({ ...mockUsers.partner, token });
    } else {
      setUser(mockUsers.staff);
    }
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  return { user, isAuthenticated, login, logout, isLoading };
};


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Layout>{children}</Layout>;
};

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isPartnerLogin = !!getPartnerTokenFromURL();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const success = await onLogin({ email, password });
      if (!success) {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        {/* Logo and Title Section */}
        <div className="text-center mb-12">
        
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-900">
            Sport Wales Investment Portal
          </h1>
          {isPartnerLogin ? (
            <p className="mt-3 text-gray-500">Partner Access Portal</p>
          ) : (
            <p className="mt-3 text-gray-500">Staff Access Portal</p>
          )}
        </div>

        {/* Login Card */}
        <div className="backdrop-blur-sm bg-white/90 px-6 py-8 shadow-xl rounded-xl border border-gray-100">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-400 rounded">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sw-blue sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sw-blue sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-sw-blue focus:ring-sw-blue"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-sw-blue hover:text-sw-blue-dark">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sw-blue hover:bg-sw-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sw-blue transition-colors duration-200"
            >
              Sign in to portal
            </button>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <div className="text-sm">
            <span className="text-gray-500">Need assistance? </span>
            <a 
              href="#" 
              className="font-medium text-sw-blue hover:text-sw-blue-dark"
            >
              Contact our support team
            </a>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="mt-6 text-center">
          <button className="text-sm text-gray-500 hover:text-sw-blue">
            Cymraeg
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
// src/App.jsx
const App = () => {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-sw-blue border-t-transparent" />
      </div>
    );
  }

  return (
    <Router>
      <FormProvider>
        <Routes>
          {/* Base route for staff */}
          <Route 
            path="/" 
            element={
              !isAuthenticated ? (
                <Login onLogin={login} />
              ) : (
                <Portal user={user} onLogout={logout} />
              )
            } 
          />
          
          {/* Partner specific route */}
          <Route 
            path="/sw" 
            element={
              !isAuthenticated ? (
                <Login onLogin={login} />
              ) : (
                <Portal user={user} onLogout={logout} />
              )
            } 
          />
  
          <Route
            path="/form/*"
            element={
              !isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <InvestmentForm />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </FormProvider>
    </Router>
  );
};

export default App;
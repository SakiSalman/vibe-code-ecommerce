import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Page } from '../types';
import { Eye, EyeOff, Lock, Phone, ArrowRight, AlertCircle } from 'lucide-react';

interface LoginProps {
  onNavigate: (page: Page) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const success = login(mobile, password);
      setIsLoading(false);
      
      if (success) {
        onNavigate('DASHBOARD');
      } else {
        setError('Invalid credentials. Please check the demo accounts below.');
      }
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary rounded-xl flex items-center justify-center text-white text-xl font-bold mb-4">
            L
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-txt">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-txt/70">
            Sign in to access your account and dashboard.
          </p>
          <div className="mt-4 text-xs text-left bg-gray-50 p-3 rounded text-gray-500">
             <p><strong>Admin:</strong> 01408971554 / 123456</p>
             <p><strong>User:</strong> 01408971555 / 123456</p>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="relative">
                <label className="text-sm font-medium text-txt mb-1 block">Mobile Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Phone size={18} />
                  </div>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg text-txt placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                    placeholder="Enter mobile number"
                  />
                </div>
            </div>

            <div className="relative">
                <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-txt">Password</label>
                    <a href="#" className="text-xs font-medium text-primary hover:text-green-800">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg text-txt placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
          
          <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
              <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-txt bg-white hover:bg-background">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>
                  Google
              </button>
              <button type="button" className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-txt bg-white hover:bg-background">
                  <svg className="h-5 w-5 mr-2 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
              </button>
          </div>
        </form>
        
        <p className="mt-8 text-center text-sm text-txt/70">
          Don't have an account?{' '}
          <button onClick={() => onNavigate('REGISTER')} className="font-medium text-primary hover:text-green-800 transition-colors inline-flex items-center">
            Register now <ArrowRight size={14} className="ml-1" />
          </button>
        </p>
      </div>
    </div>
  );
};
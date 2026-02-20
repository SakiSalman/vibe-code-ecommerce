import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Page } from '../types';
import { Eye, EyeOff, Lock, Phone, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface LoginProps {
  onNavigate: (page: Page) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await login(mobile, password);
    setIsLoading(false);
    
    if (result.success) {
      toast.success('Welcome back!');
      onNavigate('DASHBOARD');
    } else {
      toast.error(result.error || 'Invalid credentials.');
    }
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
            Sign in with your mobile number to continue.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                    placeholder="1234567890"
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
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Page } from '../types';
import { Eye, EyeOff, Lock, Phone, User, ArrowRight, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

interface RegisterProps {
  onNavigate: (page: Page) => void;
}

export const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Removed email argument
    const result = await register(name, mobile, password, address);
    setIsLoading(false);

    if (result.success) {
        toast.success('Account created! Please log in.');
        onNavigate('LOGIN');
    } else {
        toast.error(result.error || 'Registration failed.');
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
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-txt/70">
            Join Lumina for exclusive offers and faster checkout.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
                <label className="text-sm font-medium text-txt mb-1 block">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg text-txt placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm"
                    placeholder="John Doe"
                  />
                </div>
            </div>

            <div className="relative">
                <label className="text-sm font-medium text-txt mb-1 block">Mobile Number <span className="text-red-500">*</span></label>
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
                <p className="text-xs text-gray-400 mt-1">This will be your login ID.</p>
            </div>

             <div className="relative">
                <label className="text-sm font-medium text-txt mb-1 block">Address <span className="text-gray-400 font-normal">(Optional)</span></label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none text-gray-400">
                    <MapPin size={18} />
                  </div>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 bg-white border border-gray-300 rounded-lg text-txt placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm resize-none"
                    placeholder="123 Main St, New York, NY"
                  />
                </div>
            </div>

            <div className="relative">
                <label className="text-sm font-medium text-txt mb-1 block">Password</label>
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
                <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters.</p>
            </div>
            
            <div className="flex items-center">
                <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-txt">
                    I agree to the <a href="#" className="text-primary hover:text-green-800">Terms of Service</a> and <a href="#" className="text-primary hover:text-green-800">Privacy Policy</a>
                </label>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
        
        <p className="mt-8 text-center text-sm text-txt/70">
          Already have an account?{' '}
          <button onClick={() => onNavigate('LOGIN')} className="font-medium text-primary hover:text-green-800 transition-colors inline-flex items-center">
            Sign In <ArrowRight size={14} className="ml-1" />
          </button>
        </p>
      </div>
    </div>
  );
};
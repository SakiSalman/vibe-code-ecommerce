import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Search, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Page } from '../types';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', value: 'HOME' as Page },
    { name: 'Shop All', value: 'HOME' as Page }, // Simplify for demo
    { name: 'New Arrivals', value: 'HOME' as Page },
    { name: 'About', value: 'HOME' as Page },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('HOME')}>
            <h1 className="text-2xl font-bold tracking-tighter text-txt flex items-center gap-2">
              <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-lg">L</span>
              Lumina
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => onNavigate(link.value)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPage === link.value && idx === 0 ? 'text-primary' : 'text-txt'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-txt hover:text-primary transition-colors p-2 hidden sm:block">
              <Search size={20} />
            </button>
            
            <button 
              className="text-txt hover:text-primary transition-colors relative p-2"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
               <div className="relative group">
                 <button className="flex items-center gap-2 text-txt hover:text-primary transition-colors p-2 font-medium">
                   <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center text-primary">
                      <User size={18} />
                   </div>
                   <span className="hidden sm:inline">{user?.name.split(' ')[0]}</span>
                 </button>
                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-bold text-txt">{user?.name}</p>
                      <p className="text-xs text-txt/70 truncate">{user?.mobile}</p>
                      <span className="inline-block mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-secondary/10 text-secondary">
                        {user?.role}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => onNavigate('DASHBOARD')}
                      className="w-full text-left px-4 py-2 text-sm text-txt hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </button>
                    
                    <div className="border-t border-gray-100 my-1"></div>

                    <button 
                      onClick={() => { logout(); onNavigate('HOME'); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                 </div>
               </div>
            ) : (
              <button 
                onClick={() => onNavigate('LOGIN')}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-btn-primary hover:bg-btn-hover transition-colors"
              >
                Login
              </button>
            )}

            <button 
              className="md:hidden text-txt p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg p-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onNavigate(link.value);
                  setMobileMenuOpen(false);
                }}
                className="text-left font-medium text-txt hover:text-primary"
              >
                {link.name}
              </button>
            ))}
            <div className="border-t border-gray-100 pt-4">
              {!isAuthenticated ? (
                <button 
                  onClick={() => { onNavigate('LOGIN'); setMobileMenuOpen(false); }}
                  className="w-full text-center px-4 py-2 border border-primary text-primary font-medium rounded-md hover:bg-background transition-colors"
                >
                  Sign In
                </button>
              ) : (
                 <>
                   <button 
                    onClick={() => { onNavigate('DASHBOARD'); setMobileMenuOpen(false); }}
                    className="w-full text-center px-4 py-2 border border-gray-200 text-txt font-medium rounded-md hover:bg-gray-50 transition-colors mb-2"
                   >
                    My Dashboard
                   </button>
                   <button 
                    onClick={() => { logout(); setMobileMenuOpen(false); onNavigate('HOME'); }}
                    className="w-full text-center px-4 py-2 border border-red-200 text-red-600 font-medium rounded-md hover:bg-red-50 transition-colors"
                   >
                    Sign Out
                   </button>
                 </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
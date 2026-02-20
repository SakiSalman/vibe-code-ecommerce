import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Page } from './types';
import { CheckCircle } from 'lucide-react';
import { Button } from './components/Button';
import { Toaster } from 'react-hot-toast';

// Wrapper component to provide context to the rest of the app
const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('HOME');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // Cart drawer logic can be added here, but for now we rely on the Cart Page

  const navigateTo = (page: Page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
    setOrderComplete(false);
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    navigateTo('PRODUCT_DETAILS');
  };

  const handleOrderSuccess = () => {
    setOrderComplete(true);
    window.scrollTo(0,0);
  };

  if (orderComplete) {
      return (
          <div className="min-h-screen flex flex-col font-sans text-txt">
             <Header onNavigate={navigateTo} currentPage={currentPage} />
             <main className="flex-grow bg-background flex items-center justify-center p-4">
                 <div className="bg-white p-12 rounded-2xl shadow-lg max-w-md w-full text-center animate-fade-in">
                     <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                         <CheckCircle size={40} />
                     </div>
                     <h2 className="text-3xl font-bold text-txt mb-2">Order Confirmed!</h2>
                     <p className="text-txt/70 mb-8">Thank you for your purchase. We've sent a confirmation email to your inbox.</p>
                     <Button onClick={() => navigateTo('HOME')} fullWidth>Continue Shopping</Button>
                 </div>
             </main>
             <Footer />
          </div>
      )
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-txt bg-white">
      <Toaster position="top-center" reverseOrder={false} />
      <Header onNavigate={navigateTo} currentPage={currentPage} />
      
      <main className="flex-grow pt-16">
        {currentPage === 'HOME' && (
          <Home onProductClick={handleProductClick} />
        )}
        
        {currentPage === 'PRODUCT_DETAILS' && selectedProductId && (
          <ProductDetails 
            productId={selectedProductId} 
            onBack={() => navigateTo('HOME')}
            onNavigateToCart={() => navigateTo('CART')}
            onProductClick={handleProductClick}
          />
        )}
        
        {currentPage === 'CART' && (
          <Cart 
            onCheckout={() => navigateTo('CHECKOUT')} 
            onContinueShopping={() => navigateTo('HOME')}
          />
        )}
        
        {currentPage === 'CHECKOUT' && (
          <Checkout 
            onBackToCart={() => navigateTo('CART')}
            onSuccess={handleOrderSuccess}
          />
        )}

        {currentPage === 'LOGIN' && (
          <Login onNavigate={navigateTo} />
        )}

        {currentPage === 'REGISTER' && (
          <Register onNavigate={navigateTo} />
        )}

        {currentPage === 'DASHBOARD' && (
          <Dashboard onNavigate={navigateTo} />
        )}
      </main>

      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
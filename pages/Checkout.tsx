import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';
import { CheckCircle, Lock } from 'lucide-react';

interface CheckoutProps {
  onBackToCart: () => void;
  onSuccess: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onBackToCart, onSuccess }) => {
  const { items, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const shipping = cartTotal > 50 ? 0 : 15;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
        setIsProcessing(false);
        clearCart();
        onSuccess();
    }, 2000);
  };

  const InputGroup = ({ label, type = "text", placeholder, required = true, className = "" }: any) => (
      <div className={`flex flex-col ${className}`}>
          <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
          <input 
            type={type} 
            placeholder={placeholder}
            required={required}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-txt focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
      </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-center mb-10 text-secondary">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        {/* Forms */}
        <div className="lg:col-span-7">
           <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
               
               {/* Billing/Shipping */}
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                   <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                       <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm">1</span>
                       Shipping Information
                   </h2>
                   <div className="grid grid-cols-2 gap-4">
                       <InputGroup label="First Name" placeholder="John" />
                       <InputGroup label="Last Name" placeholder="Doe" />
                       <InputGroup label="Email Address" type="email" placeholder="john@example.com" className="col-span-2" />
                       <InputGroup label="Address" placeholder="123 Main St" className="col-span-2" />
                       <InputGroup label="City" placeholder="New York" />
                       <InputGroup label="Postal Code" placeholder="10001" />
                       <InputGroup label="Country" placeholder="United States" className="col-span-2" />
                   </div>
               </div>

               {/* Payment */}
               <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                   <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                       <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm">2</span>
                       Payment Details
                   </h2>
                   
                   <div className="mb-4 flex gap-4">
                       <div className="flex-1 border border-primary bg-indigo-50 text-primary font-medium py-3 rounded-lg text-center cursor-pointer">Credit Card</div>
                       <div className="flex-1 border border-gray-200 text-gray-500 py-3 rounded-lg text-center cursor-pointer hover:bg-gray-50">PayPal</div>
                   </div>

                   <div className="space-y-4">
                       <InputGroup label="Card Number" placeholder="0000 0000 0000 0000" />
                       <div className="grid grid-cols-2 gap-4">
                           <InputGroup label="Expiry Date" placeholder="MM/YY" />
                           <InputGroup label="CVV" placeholder="123" />
                       </div>
                       <InputGroup label="Name on Card" placeholder="John Doe" />
                   </div>
                   
                   <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                       <Lock size={14} /> Your payment information is secure and encrypted.
                   </div>
               </div>
           </form>
        </div>

        {/* Summary */}
        <div className="lg:col-span-5">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 no-scrollbar">
                    {items.map(item => (
                        <div key={item.id} className="flex gap-4 items-start">
                            <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                                <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                    <div className="flex justify-between text-gray-600 text-sm">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-sm">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-sm">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <Button 
                    type="submit" 
                    form="checkout-form"
                    fullWidth 
                    size="lg" 
                    className="mt-6"
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                </Button>
                
                <button onClick={onBackToCart} className="w-full text-center text-sm text-gray-500 hover:text-primary mt-4">
                    Return to Cart
                </button>
           </div>
        </div>
      </div>
    </div>
  );
};
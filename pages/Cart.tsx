import React from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/Button';

interface CartProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export const Cart: React.FC<CartProps> = ({ onCheckout, onContinueShopping }) => {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();
  const shipping = cartTotal > 50 ? 0 : 15;
  const total = cartTotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6 text-gray-400">
            <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet. Browse our products to find something you love.</p>
        <Button onClick={onContinueShopping}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-secondary mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
            </div>
            
            <div className="divide-y divide-gray-100">
                {items.map((item) => (
                <div key={item.cartItemId} className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Product Info */}
                    <div className="col-span-1 md:col-span-6 flex gap-4">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                            <div className="flex flex-col gap-1 mt-1">
                                <p className="text-sm text-gray-500">{item.category}</p>
                                {item.selectedVariant && (
                                    <p className="text-sm font-medium text-primary bg-primary/5 px-2 py-0.5 rounded w-fit">
                                        {item.variationType || 'Option'}: {item.selectedVariant.name}
                                    </p>
                                )}
                            </div>
                            <button 
                                onClick={() => removeFromCart(item.cartItemId)}
                                className="text-red-500 text-xs font-medium mt-2 flex items-center hover:text-red-700 transition-colors md:hidden"
                            >
                                <Trash2 size={12} className="mr-1" /> Remove
                            </button>
                        </div>
                    </div>

                    {/* Price (Desktop) */}
                    <div className="hidden md:block col-span-2 text-center text-gray-700">
                        ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1 md:col-span-2 flex justify-center">
                        <div className="flex items-center border border-gray-300 rounded-lg h-9">
                            <button 
                                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                className="px-2 h-full hover:bg-gray-50 text-gray-500 transition-colors"
                            >
                                <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                className="px-2 h-full hover:bg-gray-50 text-gray-500 transition-colors"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Subtotal & Actions */}
                    <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                         <span className="font-bold text-gray-900 md:hidden">Total:</span>
                         <div className="text-right">
                             <div className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
                             <button 
                                onClick={() => removeFromCart(item.cartItemId)}
                                className="text-red-500 text-xs mt-1 hover:text-red-700 transition-colors hidden md:inline-block"
                                aria-label="Remove item"
                            >
                                Remove
                            </button>
                         </div>
                    </div>
                </div>
                ))}
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
              <button 
                onClick={onContinueShopping}
                className="text-primary font-medium hover:underline flex items-center gap-2"
              >
                  <ArrowRight size={16} className="rotate-180" /> Continue Shopping
              </button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.length} items)</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax Estimate</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4 mb-8">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${(total + cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Taxes and shipping calculated at checkout</p>
            </div>
            
            <Button onClick={onCheckout} fullWidth size="lg">
              Proceed to Checkout
            </Button>
            
            <div className="mt-6 flex justify-center gap-2 grayscale opacity-50">
               {/* Payment Icons Mock */}
               <div className="w-8 h-5 bg-blue-900 rounded"></div>
               <div className="w-8 h-5 bg-red-600 rounded"></div>
               <div className="w-8 h-5 bg-blue-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
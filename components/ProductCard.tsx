
import React, { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../types';
import { StarRating } from './StarRating';
import { ShoppingCart, Plus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
  onClick: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Reset selection when product changes (recycling components)
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(undefined);
    }
    setIsAdded(false);
  }, [product]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, selectedVariant);
    
    // Visual feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const variantId = e.target.value;
    const variant = product.variants?.find(v => v.id === variantId);
    setSelectedVariant(variant);
  };

  // Determine display values
  const currentPrice = selectedVariant?.price !== undefined ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
  const currentDiscount = selectedVariant ? selectedVariant.discountPercentage : product.discountPercentage;
  
  // Calculate discount if only original price is present
  const calculatedDiscount = currentOriginalPrice 
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100) 
    : 0;
    
  const displayDiscount = currentDiscount || calculatedDiscount;

  return (
    <div 
      className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
      onClick={() => onClick(product.id)}
    >
      {/* Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 p-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              HOT
            </span>
          )}
          {displayDiscount > 0 && (
             <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
               {displayDiscount}% OFF
             </span>
          )}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-gray-400 mb-1">{product.category}</div>
        <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[40px] leading-tight">
          {product.name}
        </h3>
        
        <div className="mb-3 flex items-center gap-1">
            <StarRating rating={product.rating} size={12} />
            <span className="text-xs text-gray-400">({product.reviewsCount})</span>
        </div>
        
        {/* Weight/Variant Display */}
        <div className="mt-auto">
            {product.variants && product.variants.length > 0 ? (
                <div 
                    className="mb-3"
                    onClick={(e) => e.stopPropagation()} // Prevent card click when changing variant
                >
                    <select 
                        className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-gray-50 focus:outline-none focus:border-primary text-gray-700"
                        value={selectedVariant?.id}
                        onChange={handleVariantChange}
                    >
                        {product.variants.map(v => (
                            <option key={v.id} value={v.id}>{v.name}</option>
                        ))}
                    </select>
                </div>
            ) : (
                <div className="text-xs text-gray-500 mb-3 font-medium">
                    {product.weight || 'Each'}
                </div>
            )}

            <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-900">${currentPrice.toFixed(2)}</span>
                    {currentOriginalPrice && (
                        <span className="text-xs text-gray-400 line-through">${currentOriginalPrice.toFixed(2)}</span>
                    )}
                </div>
                
                <Button 
                    variant={isAdded ? "secondary" : "outline"} 
                    size="sm" 
                    className={`rounded-full h-9 w-9 p-0 flex items-center justify-center transition-all ${
                        isAdded 
                        ? 'bg-green-600 border-green-600 text-white' 
                        : 'border-green-600 text-green-700 hover:bg-green-50'
                    }`}
                    onClick={handleAddToCart}
                    aria-label="Add to cart"
                >
                    {isAdded ? <Check size={16} /> : <Plus size={18} />}
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

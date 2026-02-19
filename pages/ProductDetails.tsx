import React, { useState, useEffect } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingCart, CreditCard, Heart, Share2, Star } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { PRODUCTS } from '../constants';
import { Button } from '../components/Button';
import { StarRating } from '../components/StarRating';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { AiAssistant } from '../components/AiAssistant';

interface ProductDetailsProps {
  productId: string;
  onBack: () => void;
  onNavigateToCart: () => void;
  onProductClick: (id: string) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ productId, onBack, onNavigateToCart, onProductClick }) => {
  const product = PRODUCTS.find((p) => p.id === productId);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [mainImage, setMainImage] = useState(product?.image);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);

  useEffect(() => {
    // Select first variant by default if variants exist
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    } else {
      setSelectedVariant(undefined);
    }
  }, [product]);

  if (!product) return <div className="p-8 text-center">Product not found</div>;

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  // Strictly check undefined to allow 0 price
  const currentPrice = (selectedVariant?.price !== undefined) ? selectedVariant.price : product.price;
  const currentOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
  const currentDiscount = selectedVariant ? selectedVariant.discountPercentage : product.discountPercentage;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    onNavigateToCart();
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={18} className="mr-1" /> Back to shopping
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Gallery Section */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 relative group">
            <img 
              src={mainImage || product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.isNew && (
                <span className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    NEW ARRIVAL
                </span>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setMainImage(img)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${mainImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-300'}`}
              >
                <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div>
          <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="text-sm font-bold text-primary tracking-wider uppercase mb-1">{product.category}</h3>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
             </div>
             <button className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-50">
                 <Heart size={24} />
             </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <StarRating rating={product.rating} count={product.reviewsCount} showCount size={20} />
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> In Stock
            </span>
          </div>

          <div className="flex items-end gap-3 mb-6">
            <span className="text-4xl font-bold text-gray-900">${currentPrice.toFixed(2)}</span>
            {currentOriginalPrice && (
                <>
                <span className="text-xl text-gray-400 line-through mb-1">${currentOriginalPrice.toFixed(2)}</span>
                <span className="mb-2 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">
                    SAVE {Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)}%
                </span>
                </>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 border-b border-gray-100 pb-8">
            {product.description}
          </p>

          <div className="space-y-6 mb-8">
            
            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
                <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                        Select {product.variationType || 'Option'}: <span className="text-primary font-bold">{selectedVariant?.name}</span>
                    </h4>
                    <div className="flex flex-wrap gap-3">
                        {product.variants.map((variant) => (
                            <button
                                key={variant.id}
                                onClick={() => setSelectedVariant(variant)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                    selectedVariant?.id === variant.id 
                                    ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary' 
                                    : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {variant.name}
                                {variant.price !== undefined && variant.price !== product.price && (
                                    <span className="text-xs ml-1 text-gray-400">(${variant.price})</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 text-gray-500 transition-colors"
                >
                    <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium text-gray-900">{quantity}</span>
                <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50 text-gray-500 transition-colors"
                >
                    <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleAddToCart} size="lg" className="flex-1 gap-2">
                <ShoppingCart size={20} /> Add to Cart
              </Button>
              <Button onClick={handleBuyNow} size="lg" variant="secondary" className="flex-1 gap-2">
                <CreditCard size={20} /> Buy Now
              </Button>
            </div>
            
            <div className="text-center">
                <p className="text-xs text-gray-500 mt-2">Free shipping on orders over $50 • 30-day returns</p>
            </div>
          </div>

          <AiAssistant productName={product.name} productDescription={product.description} />

          <div className="mt-10 border-t border-gray-100 pt-8">
             <div className="flex gap-1 mb-4">
                 <span className="text-sm text-gray-500">Share:</span>
                 <button className="text-gray-400 hover:text-primary"><Share2 size={16} /></button>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-20">
        <div className="border-b border-gray-200">
            <div className="flex gap-8">
                {['desc', 'specs', 'reviews'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`pb-4 text-sm font-medium transition-colors relative ${
                            activeTab === tab ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        {tab === 'desc' && 'Description'}
                        {tab === 'specs' && 'Specifications'}
                        {tab === 'reviews' && `Reviews (${product.reviewsCount})`}
                        {activeTab === tab && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></span>
                        )}
                    </button>
                ))}
            </div>
        </div>
        <div className="py-8">
            {activeTab === 'desc' && (
                <div className="prose max-w-none text-gray-600">
                    <p className="mb-4">{product.description}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            )}
            {activeTab === 'specs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            <span className="text-gray-700">{feature}</span>
                        </div>
                    ))}
                    {product.weight && (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            <span className="text-gray-700">Weight: {product.weight}</span>
                        </div>
                    )}
                    {product.dimensions && (
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            <span className="text-gray-700">Dimensions: {product.dimensions}</span>
                        </div>
                    )}
                </div>
            )}
            {activeTab === 'reviews' && (
                <div className="space-y-6">
                    <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl mb-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                            <StarRating rating={product.rating} />
                            <div className="text-sm text-gray-500 mt-1">{product.reviewsCount} reviews</div>
                        </div>
                        <div className="flex-1 border-l border-gray-200 pl-6">
                             <div className="space-y-2">
                                 {[5,4,3,2,1].map(num => (
                                     <div key={num} className="flex items-center gap-2 text-sm">
                                         <span className="w-3">{num}</span>
                                         <Star size={12} className="text-gray-400" />
                                         <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                             <div className="h-full bg-yellow-400" style={{ width: num === 5 ? '70%' : num === 4 ? '20%' : '5%' }}></div>
                                         </div>
                                     </div>
                                 ))}
                             </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onClick={onProductClick} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
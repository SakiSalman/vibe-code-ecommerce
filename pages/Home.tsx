
import React from 'react';
import { ArrowRight, ShoppingBag, Carrot, Milk, Beef, Coffee, Wheat, Search, Percent } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';

interface HomeProps {
  onProductClick: (id: string) => void;
}

const CATEGORIES = [
    { name: 'Fruits & Veg', icon: Carrot, color: 'bg-orange-100 text-orange-600' },
    { name: 'Dairy & Eggs', icon: Milk, color: 'bg-blue-100 text-blue-600' },
    { name: 'Meat & Seafood', icon: Beef, color: 'bg-red-100 text-red-600' },
    { name: 'Bakery', icon: Wheat, color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Beverages', icon: Coffee, color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Offers', icon: Percent, color: 'bg-purple-100 text-purple-600' },
];

export const Home: React.FC<HomeProps> = ({ onProductClick }) => {
  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-primary text-white pt-8 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl space-y-6">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold text-green-50 border border-green-400/30">
                        Free delivery on first order
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                        Fresh Groceries <br/>
                        <span className="text-green-200">Delivered To You</span>
                    </h1>
                    <p className="text-lg text-green-100 max-w-md">
                        Shop fresh produce, organic dairy, and pantry staples. Delivered straight to your doorstep within 2 hours.
                    </p>
                    
                    <div className="bg-white p-2 rounded-lg shadow-lg max-w-md flex gap-2">
                         <div className="flex-1 flex items-center px-3 bg-gray-50 rounded border border-gray-100">
                             <Search size={20} className="text-gray-400" />
                             <input 
                                type="text" 
                                placeholder="Search for 'organic apples'..." 
                                className="w-full bg-transparent border-none focus:outline-none px-3 py-2 text-gray-800 placeholder-gray-400"
                             />
                         </div>
                         <Button>Search</Button>
                    </div>
                </div>
                
                <div className="relative hidden md:block">
                    {/* Abstract shapes or images for grocery feel */}
                    <img 
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        alt="Grocery Bag"
                        className="relative z-10 w-[400px] h-auto object-cover rounded-2xl shadow-2xl rotate-3 border-4 border-white/20"
                    />
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-primary font-bold text-center shadow-lg animate-bounce leading-tight text-sm z-20 border-4 border-white">
                        Fresh<br/>Daily
                    </div>
                </div>
            </div>
        </div>
        {/* Decorative background curve */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-50 rounded-t-[50%] scale-x-150 translate-y-8"></div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 mb-12">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Shop by Category</h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  {CATEGORIES.map((cat) => (
                      <div key={cat.name} className="flex flex-col items-center gap-2 cursor-pointer group">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${cat.color}`}>
                              <cat.icon size={28} />
                          </div>
                          <span className="text-xs font-medium text-gray-700 text-center group-hover:text-primary transition-colors">{cat.name}</span>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Main Product Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <ShoppingBag className="text-primary" /> Popular Items
            </h2>
             <Button variant="ghost" className="text-primary hover:bg-green-50">View All</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
             {PRODUCTS.map((product) => (
                 <ProductCard key={product.id} product={product} onClick={onProductClick} />
             ))}
        </div>
      </section>
      
      {/* Banner */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-gradient-to-r from-orange-100 to-amber-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-orange-200">
              <div className="max-w-lg">
                  <span className="text-orange-600 font-bold tracking-wider text-sm uppercase mb-2 block">Weekly Offer</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get 20% Off Organic Fruits</h2>
                  <p className="text-gray-700 mb-6">Start your healthy lifestyle with our premium selection of organic fruits. Sourced directly from local farmers.</p>
                  <Button className="bg-orange-500 hover:bg-orange-600 border-none text-white">Shop Organic</Button>
              </div>
              <img 
                 src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                 alt="Organic Fruits" 
                 className="w-64 md:w-80 object-contain drop-shadow-xl"
              />
          </div>
      </section>
    </div>
  );
};

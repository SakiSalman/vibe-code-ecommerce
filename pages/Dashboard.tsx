import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Page, Product } from '../types';
import { PRODUCTS } from '../constants';
import { Package, Users, Settings, Plus, LayoutGrid, ShoppingBag, LogOut, BarChart3, Box, DollarSign, Calendar, MapPin, Phone, X, Upload, Tag, Award, Scale, Ruler, Layers, Trash2 } from 'lucide-react';
import { Button } from '../components/Button';

interface DashboardProps {
    onNavigate: (page: Page) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center flex-col">
                <h2 className="text-2xl font-bold mb-4">Please log in to view the dashboard.</h2>
                <Button onClick={() => onNavigate('LOGIN')}>Go to Login</Button>
            </div>
        )
    }

    return (
        <div className="bg-background min-h-screen pb-12">
            <div className="bg-primary pt-20 pb-12 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
                            <p className="opacity-80">Welcome back, {user.name}!</p>
                        </div>
                        <div className="text-right hidden sm:block">
                            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider">
                                {user.role} Account
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-6">
                 {user.role === 'ADMIN' ? <AdminDashboard /> : <CustomerDashboard user={user} />}
            </div>
        </div>
    );
};

const CustomerDashboard: React.FC<{ user: any }> = ({ user }) => {
    const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-6">
                <nav className="space-y-2">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <ShoppingBag size={18} /> My Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <Users size={18} /> My Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                        <MapPin size={18} /> Addresses
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                        <Award size={18} /> Loyalty Points
                    </button>
                </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-8">
                {activeTab === 'orders' && (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>
                         <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-3 px-4 text-sm font-semibold text-gray-600">Order ID</th>
                                        <th className="py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                                        <th className="py-3 px-4 text-sm font-semibold text-gray-600">Total</th>
                                        <th className="py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                                        <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[2001, 2002].map((id) => (
                                        <tr key={id} className="hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm font-medium text-gray-900">#{id}</td>
                                            <td className="py-3 px-4 text-sm text-gray-600">Customer {id - 1000}</td>
                                            <td className="py-3 px-4 text-sm text-gray-600">Oct {id - 1990}, 2023</td>
                                            <td className="py-3 px-4 text-sm text-gray-900">${(Math.random() * 100 + 20).toFixed(2)}</td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${id % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                                    {id % 2 === 0 ? 'Delivered' : 'Shipped'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <button className="text-primary hover:text-green-800 text-sm font-medium">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="animate-fade-in max-w-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" readOnly value={user.name} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" readOnly value={user.email || 'N/A'} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input type="tel" readOnly value={user.mobile} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <textarea readOnly rows={3} value={user.address || 'N/A'} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 resize-none" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
    const [products, setProducts] = useState(PRODUCTS);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    
    // Comprehensive Form State
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: '',
        expiryDate: '',
        manufacturingDate: '',
        weight: '',
        dimensions: '',
        discountPercentage: '',
        loyaltyPoints: ''
    });

    // Variations State
    const [hasVariations, setHasVariations] = useState(false);
    const [variationType, setVariationType] = useState('Size');
    const [variants, setVariants] = useState<{id: number, name: string, price: string, salePrice: string, stock: string}[]>([
        { id: Date.now(), name: '', price: '', salePrice: '', stock: '' }
    ]);

    const handleAddVariantRow = () => {
        setVariants([...variants, { id: Date.now(), name: '', price: '', salePrice: '', stock: '' }]);
    };

    const handleRemoveVariantRow = (id: number) => {
        if (variants.length > 1) {
            setVariants(variants.filter(v => v.id !== id));
        }
    };

    const handleVariantChange = (id: number, field: string, value: string) => {
        setVariants(variants.map(v => v.id === id ? { ...v, [field]: value } : v));
    };

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        
        // If variations are disabled, use the main form fields
        let finalPrice = 0;
        let originalPrice: number | undefined = undefined;
        let discount = 0;

        if (!hasVariations) {
            const basePrice = parseFloat(newProduct.price);
            discount = parseFloat(newProduct.discountPercentage) || 0;
            
            if (!newProduct.name || isNaN(basePrice)) return;

            finalPrice = discount > 0 ? basePrice * (1 - discount / 100) : basePrice;
            originalPrice = discount > 0 ? basePrice : undefined;
        }

        // Process variants
        const processedVariants = hasVariations ? variants
            .filter(v => v.name.trim() !== '')
            .map(v => {
                const regularPrice = parseFloat(v.price) || 0;
                const salePriceVal = parseFloat(v.salePrice);
                
                let finalPrice = regularPrice;
                let originalPrice = undefined;
                let discountPct = undefined;

                // If sale price is provided and valid (lower than regular price)
                if (!isNaN(salePriceVal) && salePriceVal > 0 && salePriceVal < regularPrice) {
                    finalPrice = salePriceVal;
                    originalPrice = regularPrice;
                    discountPct = Math.round(((regularPrice - salePriceVal) / regularPrice) * 100);
                }

                return {
                    id: v.id.toString(),
                    name: v.name,
                    price: finalPrice, // Selling price
                    originalPrice: originalPrice, // MSRP
                    discountPercentage: discountPct,
                    stock: v.stock ? parseInt(v.stock) : undefined
                };
            }) : undefined;
        
        // If variations are enabled, we might set the product's main price to the lowest variant price for display
        if (hasVariations && processedVariants && processedVariants.length > 0) {
             const minPrice = Math.min(...processedVariants.map(v => v.price || 0));
             finalPrice = minPrice;
             // We don't set a main discount percentage if it varies by variant
             discount = 0; 
        }

        const product: Product = {
            id: Date.now().toString(),
            name: newProduct.name,
            price: finalPrice,
            originalPrice: originalPrice,
            category: newProduct.category || 'Uncategorized',
            image: newProduct.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
            images: [newProduct.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'],
            description: newProduct.description || 'No description provided.',
            features: [],
            rating: 0,
            reviewsCount: 0,
            isNew: true,
            
            // New Fields
            stock: parseInt(newProduct.stock) || 0,
            expiryDate: newProduct.expiryDate,
            manufacturingDate: newProduct.manufacturingDate,
            weight: newProduct.weight,
            dimensions: newProduct.dimensions,
            discountPercentage: discount > 0 ? discount : undefined,
            loyaltyPoints: parseInt(newProduct.loyaltyPoints) || 0,
            
            // Variation Fields
            variants: processedVariants,
            variationType: hasVariations ? variationType : undefined
        };

        setProducts([product, ...products]);
        setIsAddProductOpen(false);
        // Reset form
        setNewProduct({
            name: '',
            description: '',
            price: '',
            category: '',
            image: '',
            stock: '',
            expiryDate: '',
            manufacturingDate: '',
            weight: '',
            dimensions: '',
            discountPercentage: '',
            loyaltyPoints: ''
        });
        setHasVariations(false);
        setVariants([{ id: Date.now(), name: '', price: '', salePrice: '', stock: '' }]);
    };

    const stats = [
        { label: 'Total Sales', value: '$12,450', icon: DollarSign, color: 'bg-green-100 text-green-600' },
        { label: 'Active Orders', value: '24', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
        { label: 'Total Products', value: products.length.toString(), icon: Box, color: 'bg-purple-100 text-purple-600' },
        { label: 'Customers', value: '156', icon: Users, color: 'bg-orange-100 text-orange-600' },
    ];

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px] flex flex-col md:flex-row">
                {/* Sidebar */}
                <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-6">
                    <nav className="space-y-2">
                        <button 
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <LayoutGrid size={18} /> Overview
                        </button>
                        <button 
                            onClick={() => setActiveTab('products')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <Box size={18} /> Products & Inventory
                        </button>
                        <button 
                            onClick={() => setActiveTab('orders')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'orders' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <ShoppingBag size={18} /> Orders
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                            <Users size={18} /> Customers
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                            <Settings size={18} /> Settings
                        </button>
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 p-8">
                    {activeTab === 'overview' && (
                        <div className="animate-fade-in">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="p-6 rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                                <stat.icon size={20} />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                                        <p className="text-sm text-gray-500">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100">
                                <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">Analytics Preview</h3>
                                <p className="text-gray-500">Sales charts and visitor analytics would appear here.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'products' && (
                        <div className="animate-fade-in">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Product Inventory</h2>
                                <Button size="sm" onClick={() => setIsAddProductOpen(true)}>
                                    <Plus size={16} className="mr-2" /> Add Product
                                </Button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Product</th>
                                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Category</th>
                                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Price</th>
                                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Stock</th>
                                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Variations</th>
                                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Loyalty Pts</th>
                                            <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {products.map((p) => (
                                            <tr key={p.id} className="hover:bg-gray-50">
                                                <td className="py-3 px-4 flex items-center gap-3">
                                                    <img src={p.image} alt="" className="w-10 h-10 rounded object-cover" />
                                                    <div>
                                                        <span className="font-medium text-gray-900 block">{p.name}</span>
                                                        {p.discountPercentage ? (
                                                            <span className="text-xs text-red-500 font-medium">-{p.discountPercentage}% Off</span>
                                                        ) : null}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600">{p.category}</td>
                                                <td className="py-3 px-4 text-sm text-gray-900">
                                                    <div className="flex flex-col">
                                                        <span>${p.price.toFixed(2)}</span>
                                                        {p.originalPrice && <span className="text-xs text-gray-400 line-through">${p.originalPrice.toFixed(2)}</span>}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600">
                                                    {p.stock !== undefined ? p.stock : Math.floor(Math.random() * 50) + 5}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-gray-600">
                                                    {p.variants && p.variants.length > 0 ? (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            {p.variants.length} {p.variationType}(s)
                                                        </span>
                                                    ) : '-'}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                                                        <Award size={10} className="mr-1" />
                                                        {p.loyaltyPoints || 10} pts
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <button className="text-primary hover:text-green-800 text-sm font-medium">Edit</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'orders' && (
                        <div className="animate-fade-in">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Order ID</th>
                                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Customer</th>
                                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Total</th>
                                            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                                            <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[1001, 1002, 1003, 1004, 1005].map((id) => (
                                            <tr key={id} className="hover:bg-gray-50">
                                                <td className="py-3 px-4 text-sm font-medium text-gray-900">#{id}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600">Customer {id - 1000}</td>
                                                <td className="py-3 px-4 text-sm text-gray-600">Oct {id - 990}, 2023</td>
                                                <td className="py-3 px-4 text-sm text-gray-900">${(Math.random() * 200 + 50).toFixed(2)}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${id % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {id % 2 === 0 ? 'Delivered' : 'Processing'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <button className="text-primary hover:text-green-800 text-sm font-medium">View</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Product Modal */}
            {isAddProductOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Add New Product</h3>
                                <p className="text-xs text-gray-500 mt-1">Fill in the details to add a new item to inventory.</p>
                            </div>
                            <button onClick={() => setIsAddProductOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleAddProduct} className="p-6 space-y-8">
                            
                            {/* Section 1: Basic Info */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Basic Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
                                        <input 
                                            required 
                                            type="text" 
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-txt"
                                            placeholder="e.g. Organic Almond Milk"
                                            value={newProduct.name}
                                            onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <select 
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-txt"
                                            value={newProduct.category}
                                            onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Electronics">Electronics</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Home">Home & Living</option>
                                            <option value="Groceries">Groceries</option>
                                            <option value="Fresh Produce">Fresh Produce</option>
                                            <option value="Bakery">Bakery</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                                        <input 
                                            type="number" 
                                            min="0"
                                            disabled={hasVariations}
                                            className={`w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-txt ${hasVariations ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
                                            placeholder={hasVariations ? "Set in variations" : "e.g. 50"}
                                            value={newProduct.stock}
                                            onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea 
                                            rows={3}
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-txt"
                                            placeholder="Enter product description..."
                                            value={newProduct.description}
                                            onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Pricing & Loyalty */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2 flex items-center gap-2">
                                    <Tag size={16} /> Pricing & Loyalty
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) <span className="text-red-500">*</span></label>
                                        <input 
                                            required={!hasVariations}
                                            type="number" 
                                            step="0.01"
                                            min="0"
                                            disabled={hasVariations}
                                            className={`w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-txt ${hasVariations ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
                                            placeholder={hasVariations ? "Set in variations" : "0.00"}
                                            value={newProduct.price}
                                            onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                                        <input 
                                            type="number" 
                                            step="1"
                                            min="0"
                                            max="100"
                                            disabled={hasVariations}
                                            className={`w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-txt ${hasVariations ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}`}
                                            placeholder={hasVariations ? "Set in variations" : "0%"}
                                            value={newProduct.discountPercentage}
                                            onChange={e => setNewProduct({...newProduct, discountPercentage: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-indigo-700 mb-1 flex items-center gap-1">
                                            <Award size={14} /> Loyalty Points
                                        </label>
                                        <input 
                                            type="number" 
                                            min="0"
                                            className="w-full px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-indigo-900 placeholder-indigo-300"
                                            placeholder="Points per purchase"
                                            value={newProduct.loyaltyPoints}
                                            onChange={e => setNewProduct({...newProduct, loyaltyPoints: e.target.value})}
                                        />
                                        <p className="text-xs text-indigo-400 mt-1">Points awarded to customer.</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Section 2.5: Product Variations */}
                            <div>
                                <div className="flex justify-between items-center mb-4 border-b pb-2">
                                    <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                                        <Layers size={16} /> Product Variations
                                    </h4>
                                    <label className="flex items-center cursor-pointer">
                                        <div className="relative">
                                            <input type="checkbox" className="sr-only" checked={hasVariations} onChange={() => setHasVariations(!hasVariations)} />
                                            <div className={`block w-10 h-6 rounded-full transition-colors ${hasVariations ? 'bg-primary' : 'bg-gray-300'}`}></div>
                                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${hasVariations ? 'transform translate-x-4' : ''}`}></div>
                                        </div>
                                        <span className="ml-3 text-sm font-medium text-gray-700">Enable Variations</span>
                                    </label>
                                </div>

                                {hasVariations && (
                                    <div className="bg-gray-50 rounded-lg p-4 animate-fade-in border border-gray-200">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Variation Type</label>
                                            <select 
                                                className="w-full md:w-1/2 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-txt"
                                                value={variationType}
                                                onChange={e => setVariationType(e.target.value)}
                                            >
                                                <option value="Size">Size (e.g., S, M, L)</option>
                                                <option value="Color">Color (e.g., Red, Blue)</option>
                                                <option value="Material">Material</option>
                                                <option value="Weight">Weight</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                                <div className="col-span-3">Option Name</div>
                                                <div className="col-span-3">Regular Price ($)</div>
                                                <div className="col-span-2">Sale Price ($)</div>
                                                <div className="col-span-2">Stock</div>
                                                <div className="col-span-2 text-center">Action</div>
                                            </div>
                                            {variants.map((variant) => (
                                                <div key={variant.id} className="grid grid-cols-12 gap-2 items-center">
                                                    <div className="col-span-3">
                                                        <input 
                                                            type="text" 
                                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm focus:border-primary outline-none"
                                                            placeholder={`e.g. ${variationType === 'Size' ? 'Large' : 'Red'}`}
                                                            value={variant.name}
                                                            onChange={(e) => handleVariantChange(variant.id, 'name', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-span-3">
                                                        <input 
                                                            type="number" 
                                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm focus:border-primary outline-none"
                                                            placeholder="Regular Price"
                                                            value={variant.price}
                                                            onChange={(e) => handleVariantChange(variant.id, 'price', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-span-2">
                                                        <input 
                                                            type="number" 
                                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm focus:border-primary outline-none"
                                                            placeholder="Optional"
                                                            value={variant.salePrice}
                                                            onChange={(e) => handleVariantChange(variant.id, 'salePrice', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-span-2">
                                                        <input 
                                                            type="number" 
                                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-sm focus:border-primary outline-none"
                                                            placeholder="0"
                                                            value={variant.stock}
                                                            onChange={(e) => handleVariantChange(variant.id, 'stock', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-span-2 text-center">
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleRemoveVariantRow(variant.id)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                            disabled={variants.length === 1}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <p className="text-xs text-gray-400 mt-2 mb-2 italic">
                                                * All variations must have a regular price. Sale price is optional.
                                            </p>
                                            <Button type="button" size="sm" variant="outline" onClick={handleAddVariantRow} className="mt-2 text-xs">
                                                <Plus size={14} className="mr-1" /> Add Option
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Section 3: Specifications & Media */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2 flex items-center gap-2">
                                    <Box size={16} /> Specs & Media
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Scale size={14} /> Weight</label>
                                        <input 
                                            type="text" 
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-txt"
                                            placeholder="e.g. 1.5 kg"
                                            value={newProduct.weight}
                                            onChange={e => setNewProduct({...newProduct, weight: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Ruler size={14} /> Dimensions</label>
                                        <input 
                                            type="text" 
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-txt"
                                            placeholder="L x W x H (cm)"
                                            value={newProduct.dimensions}
                                            onChange={e => setNewProduct({...newProduct, dimensions: e.target.value})}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturing Date</label>
                                        <input 
                                            type="date" 
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-txt"
                                            value={newProduct.manufacturingDate}
                                            onChange={e => setNewProduct({...newProduct, manufacturingDate: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                        <input 
                                            type="date" 
                                            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-txt"
                                            value={newProduct.expiryDate}
                                            onChange={e => setNewProduct({...newProduct, expiryDate: e.target.value})}
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                        <div className="flex gap-2">
                                            <input 
                                                type="url" 
                                                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-txt"
                                                placeholder="https://example.com/image.jpg"
                                                value={newProduct.image}
                                                onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                                            />
                                            <button type="button" className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200" title="Upload Image (Demo)">
                                                <Upload size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-8">
                                <Button type="button" variant="ghost" onClick={() => setIsAddProductOpen(false)}>Cancel</Button>
                                <Button type="submit">Add Product</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
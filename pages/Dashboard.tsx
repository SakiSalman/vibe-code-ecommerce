import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Page, Product, ProductVariant } from '../types';
import { PRODUCTS } from '../constants';
import { supabase } from '../lib/supabase';
import { 
    Package, Users, Settings, Plus, LayoutGrid, ShoppingBag, 
    LogOut, BarChart3, Box, DollarSign, Calendar, MapPin, 
    Phone, X, Upload, Tag, Award, Search, Edit2, Trash2, CheckCircle, Info, List
} from 'lucide-react';
import { Button } from '../components/Button';
import toast from 'react-hot-toast';

interface DashboardProps {
    onNavigate: (page: Page) => void;
}

// Mock Data Sources as fallback
const MOCK_BRANDS = ['Lumina Choice', 'GreenValley', 'OrganicLife', 'FarmFresh', 'NaturesBest', 'DairyKing'];
const MOCK_CATEGORIES = ['Fruits & Veg', 'Dairy & Eggs', 'Bakery', 'Meat & Seafood', 'Beverages', 'Pantry', 'Snacks'];

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center flex-col animate-fade-in">
                <h2 className="text-2xl font-bold mb-4">Please log in to view the dashboard.</h2>
                <Button onClick={() => onNavigate('LOGIN')}>Go to Login</Button>
            </div>
        )
    }

    return (
        <div className="bg-background min-h-screen pb-12">
            <div className="bg-primary pt-24 pb-12 text-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
                            <p className="opacity-80">Welcome back, {user.name}!</p>
                        </div>
                        <div className="text-right">
                            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                                {user.role} Account
                            </span>
                            {user.role === 'CUSTOMER' && (
                                <div className="flex items-center justify-end gap-2 text-yellow-300 font-bold">
                                    <Award size={18} />
                                    <span>{user.rewardPoints || 0} Points</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8">
                 {user.role === 'ADMIN' ? <AdminDashboard /> : <CustomerDashboard user={user} />}
            </div>
        </div>
    );
};

const CustomerDashboard: React.FC<{ user: any }> = ({ user }) => {
    const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden min-h-[600px] flex flex-col md:flex-row animate-slide-up">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-6">
                <div className="mb-6 bg-indigo-50 p-4 rounded-xl border border-indigo-100 text-center md:hidden">
                     <p className="text-sm text-indigo-800 font-semibold uppercase tracking-wide">Reward Balance</p>
                     <p className="text-2xl font-bold text-indigo-600 mt-1">{user.rewardPoints || 0} pts</p>
                </div>

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
                                        <tr key={id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-4 text-sm font-medium text-gray-900">#{id}</td>
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
                        <div className="flex justify-between items-center mb-6">
                             <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
                             <div className="bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-100">
                                 <span className="text-xs text-yellow-700 font-bold uppercase block">Reward Points</span>
                                 <span className="text-xl font-bold text-yellow-600">{user.rewardPoints || 0}</span>
                             </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input type="text" readOnly value={user.name} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
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
    const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'users' | 'orders'>('overview');
    const [products, setProducts] = useState<Product[]>(PRODUCTS);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    
    // Data Sources
    const [categories, setCategories] = useState<string[]>(MOCK_CATEGORIES);
    const [brands, setBrands] = useState<string[]>(MOCK_BRANDS);

    // Fetch dynamic data from Supabase
    useEffect(() => {
        const fetchMetadata = async () => {
            // Categories
            const { data: catData, error: catError } = await supabase.from('categories').select('name');
            if (!catError && catData && catData.length > 0) {
                setCategories(catData.map(c => c.name));
            }

            // Brands
            const { data: brandData, error: brandError } = await supabase.from('brands').select('name');
            if (!brandError && brandData && brandData.length > 0) {
                setBrands(brandData.map(b => b.name));
            }
        };

        const fetchProducts = async () => {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (data && data.length > 0) {
                // Map Database columns (snake_case) to Frontend types (camelCase)
                const dbProducts: Product[] = data.map((p: any) => ({
                    id: p.id,
                    name: p.name,
                    price: Number(p.price),
                    originalPrice: p.original_price ? Number(p.original_price) : undefined,
                    rating: Number(p.rating),
                    reviewsCount: p.reviews_count,
                    image: p.image,
                    images: p.images || [p.image],
                    description: p.description,
                    shortDescription: p.short_description,
                    brand: p.brand,
                    features: p.features || [],
                    category: p.category,
                    isNew: p.is_new,
                    isBestSeller: p.is_best_seller,
                    stock: p.stock,
                    discountPercentage: p.discount_percentage,
                    loyaltyPoints: p.loyalty_points, // Map from snake_case
                    variants: p.variants,
                    variationType: p.variation_type
                }));
                // Combine mocked products with DB products (or replace them)
                setProducts(prev => {
                    return [...dbProducts]; 
                });
            } else if (error) {
                console.warn("Could not fetch products from DB (using local mocks):", error.message);
            }
        };

        fetchMetadata();
        fetchProducts();
    }, []);

    // Form State
    const [isVariedProduct, setIsVariedProduct] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        shortDescription: '',
        description: '',
        category: '',
        brand: '',
        image: '',
        stock: 0,
        regularPrice: 0,
        salePrice: 0,
        loyaltyPoints: 0, // Added loyaltyPoints
        variationType: 'Size',
    });
    
    const [variations, setVariations] = useState<{name: string, regularPrice: number, salePrice: number, stock: number, loyaltyPoints: number}[]>([]);

    // Reset form when modal closes or switches to add mode
    const resetForm = () => {
        setFormData({
            name: '',
            shortDescription: '',
            description: '',
            category: '',
            brand: '',
            image: '',
            stock: 0,
            regularPrice: 0,
            salePrice: 0,
            loyaltyPoints: 0,
            variationType: 'Size',
        });
        setVariations([]);
        setIsVariedProduct(false);
        setEditingProduct(null);
    };

    const handleAddClick = () => {
        resetForm();
        setShowAddModal(true);
    };

    const handleEditClick = (product: Product) => {
        setEditingProduct(product);
        const hasVariants = !!(product.variants && product.variants.length > 0);
        setIsVariedProduct(hasVariants);

        // Map existing data to form
        const formUpdates = {
            name: product.name,
            shortDescription: product.shortDescription || '',
            description: product.description,
            category: product.category,
            brand: product.brand || '',
            image: product.image,
            variationType: product.variationType || 'Size',
            stock: product.stock || 0,
            regularPrice: 0,
            salePrice: 0,
            loyaltyPoints: product.loyaltyPoints || 0
        };

        if (hasVariants && product.variants) {
             // Populate variations
             const mappedVars = product.variants.map(v => ({
                 name: v.name,
                 regularPrice: v.originalPrice || v.price || 0,
                 salePrice: v.originalPrice ? (v.price || 0) : 0,
                 stock: v.stock || 0,
                 loyaltyPoints: v.loyaltyPoints || 0
             }));
             setVariations(mappedVars);
        } else {
             // Populate simple product price
             formUpdates.regularPrice = product.originalPrice || product.price;
             formUpdates.salePrice = product.originalPrice ? product.price : 0;
             setVariations([]);
        }

        setFormData(formUpdates);
        setShowAddModal(true);
    };

    const handleCloseModal = () => {
        setShowAddModal(false);
        resetForm();
    };

    const handleVariationChange = (index: number, field: string, value: any) => {
        const newVariations = [...variations];
        (newVariations[index] as any)[field] = value;
        setVariations(newVariations);
    };

    const addVariation = () => {
        setVariations([...variations, { name: '', regularPrice: 0, salePrice: 0, stock: 0, loyaltyPoints: 0 }]);
    };

    const removeVariation = (index: number) => {
        setVariations(variations.filter((_, i) => i !== index));
    };

    const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const errors: string[] = [];
        if (!formData.name.trim()) errors.push("Product Name is required");
        if (!formData.shortDescription.trim()) errors.push("Short Description is required");
        if (!formData.description.trim()) errors.push("Full Description is required");
        if (!formData.category) errors.push("Category is required");
        if (!formData.image.trim()) errors.push("Product Image URL is required");

        if (isVariedProduct) {
            if (variations.length === 0) {
                errors.push("At least one variation is required for varied products");
            } else {
                variations.forEach((v, idx) => {
                    if (!v.name.trim()) errors.push(`Variation #${idx+1} name is required`);
                    if (!v.regularPrice || v.regularPrice <= 0) errors.push(`Variation #${idx+1} regular price must be > 0`);
                });
            }
        } else {
            if (!formData.regularPrice || formData.regularPrice <= 0) {
                errors.push("Regular Price must be greater than 0");
            }
        }

        if (errors.length > 0) {
            toast.error(errors[0]);
            return;
        }

        // 1. Construct Product Data for Database (Snake Case)
        const baseProduct = {
            name: formData.name,
            short_description: formData.shortDescription,
            description: formData.description,
            category: formData.category,
            brand: formData.brand,
            image: formData.image || 'https://via.placeholder.com/300',
            images: [formData.image || 'https://via.placeholder.com/300'],
            rating: editingProduct ? editingProduct.rating : 5, // Keep rating if editing, default 5 if new
            reviews_count: editingProduct ? editingProduct.reviewsCount : 0,
            features: [],
            is_new: editingProduct ? editingProduct.isNew : true,
            is_best_seller: editingProduct ? editingProduct.isBestSeller : false
        };

        let finalProductData: any = { ...baseProduct };

        if (isVariedProduct) {
             // Map UI variations to ProductVariant type
             const productVariants: ProductVariant[] = variations.map((v, idx) => ({
                 id: `v-${Date.now()}-${idx}`,
                 name: v.name,
                 price: v.salePrice > 0 ? v.salePrice : v.regularPrice,
                 originalPrice: v.salePrice > 0 ? v.regularPrice : undefined,
                 stock: v.stock,
                 discountPercentage: v.salePrice > 0 ? Math.round(((v.regularPrice - v.salePrice) / v.regularPrice) * 100) : 0,
                 loyaltyPoints: v.loyaltyPoints || 0
             }));

             finalProductData = {
                 ...finalProductData,
                 variation_type: formData.variationType,
                 variants: productVariants,
                 price: productVariants[0]?.price || 0, // Fallback for list view
                 stock: productVariants.reduce((acc, curr) => acc + (curr.stock || 0), 0),
                 loyalty_points: 0 // Variations carry their own points
             };
        } else {
            // Simple Product
            const price = formData.salePrice > 0 ? formData.salePrice : formData.regularPrice;
            const originalPrice = formData.salePrice > 0 ? formData.regularPrice : undefined;
            
            finalProductData = {
                ...finalProductData,
                price: price,
                original_price: originalPrice,
                stock: formData.stock,
                discount_percentage: formData.salePrice > 0 ? Math.round(((formData.regularPrice - formData.salePrice) / formData.regularPrice) * 100) : 0,
                loyalty_points: formData.loyaltyPoints || 0
            };
        }

        // Prepare payload for Supabase - Removing loyalty_points specifically as it seems to be missing in some DB instances
        const supabasePayload: any = { ...finalProductData };
        delete supabasePayload.loyalty_points;

        // 2. Attempt to Save to Supabase (Insert or Update)
        let savedProduct: any = null;
        let isLocalFallback = false;
        
        const loadingToast = toast.loading(editingProduct ? 'Updating product...' : 'Creating product...');

        try {
            let data, error;
            if (editingProduct) {
                // Update
                const result = await supabase
                    .from('products')
                    .update(supabasePayload)
                    .eq('id', editingProduct.id)
                    .select();
                data = result.data;
                error = result.error;
            } else {
                // Insert
                const result = await supabase
                    .from('products')
                    .insert([supabasePayload])
                    .select();
                data = result.data;
                error = result.error;
            }
            
            if (error) {
                throw error;
            } else if (data) {
                savedProduct = data[0];
                // Restore loyalty points for local usage if DB didn't return them
                if (savedProduct && finalProductData.loyalty_points !== undefined) {
                    savedProduct.loyalty_points = finalProductData.loyalty_points;
                }
            }
        } catch (error: any) {
            console.error("Database save failed (using local fallback):", error.message);
            isLocalFallback = true;
            
            // Mock the response object that DB would have returned
            savedProduct = {
                ...finalProductData,
                id: editingProduct ? editingProduct.id : `local-${Date.now()}`,
                created_at: new Date().toISOString()
            };
            
            toast.error(`Database error: ${error.message}. Saving locally.`, { id: loadingToast });
        }

        // 3. Update Local State (CamelCase mapping)
        if (savedProduct) {
             const mappedProduct: Product = {
                 id: savedProduct.id,
                 name: savedProduct.name,
                 price: Number(savedProduct.price),
                 description: savedProduct.description,
                 image: savedProduct.image,
                 images: savedProduct.images,
                 category: savedProduct.category,
                 rating: Number(savedProduct.rating),
                 reviewsCount: savedProduct.reviews_count,
                 features: savedProduct.features || [],
                 stock: savedProduct.stock,
                 variants: savedProduct.variants,
                 variationType: savedProduct.variation_type,
                 originalPrice: savedProduct.original_price ? Number(savedProduct.original_price) : undefined,
                 shortDescription: savedProduct.short_description,
                 brand: savedProduct.brand,
                 isNew: savedProduct.is_new,
                 isBestSeller: savedProduct.is_best_seller,
                 discountPercentage: savedProduct.discount_percentage,
                 loyaltyPoints: savedProduct.loyalty_points
             };
             
             if (editingProduct) {
                 setProducts(prev => prev.map(p => p.id === editingProduct.id ? mappedProduct : p));
             } else {
                 setProducts([mappedProduct, ...products]);
             }

             handleCloseModal();
             
             if (!isLocalFallback) {
                 toast.success(editingProduct ? "Product updated!" : "Product added!", { id: loadingToast });
             }
        } else {
            toast.dismiss(loadingToast);
        }
    };
    
    // Mock Data for Admin
    const users = [
        { id: 'u1', name: 'John Doe', mobile: '1234567890', role: 'CUSTOMER', joined: '2023-10-01', status: 'Active' },
        { id: 'u2', name: 'Admin User', mobile: '0000000000', role: 'ADMIN', joined: '2023-09-15', status: 'Active' },
        { id: 'u3', name: 'Sarah Smith', mobile: '9876543210', role: 'CUSTOMER', joined: '2023-11-20', status: 'Blocked' },
        { id: 'u4', name: 'Mike Johnson', mobile: '5551234567', role: 'CUSTOMER', joined: '2023-12-05', status: 'Active' },
    ];

    const orders = [
        { id: 1001, customer: 'John Doe', amount: 45.99, status: 'Completed', date: '2023-12-10' },
        { id: 1002, customer: 'Sarah Smith', amount: 12.50, status: 'Processing', date: '2023-12-11' },
        { id: 1003, customer: 'Mike Johnson', amount: 89.99, status: 'Shipped', date: '2023-12-12' },
        { id: 1004, customer: 'John Doe', amount: 24.00, status: 'Completed', date: '2023-12-12' },
    ];

    const confirmDelete = async (id: string) => {
        // Keep a backup of current products in case we need to revert
        const previousProducts = [...products];

        // Optimistic update
        setProducts(prev => prev.filter(p => p.id !== id));
        const toastId = toast.loading('Deleting product...');

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) {
                throw error;
            }
            toast.success('Product deleted', { id: toastId });
        } catch (error: any) {
            console.error("Delete failed:", error.message);
            toast.error(`Failed to delete: ${error.message}`, { id: toastId });
            // Revert state
            setProducts(previousProducts);
        }
    };

    const handleDeleteProduct = (id: string) => {
        toast((t) => (
            <div className="flex flex-col gap-3 min-w-[200px]">
                <div className="font-medium text-gray-900">Delete this product?</div>
                <div className="text-sm text-gray-500">This action cannot be undone.</div>
                <div className="flex gap-2 justify-end mt-2">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            confirmDelete(id);
                        }}
                        className="px-3 py-1.5 text-sm font-medium bg-red-600 text-white hover:bg-red-700 rounded-md transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
            style: {
                background: '#fff',
                color: '#333',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderRadius: '0.75rem',
                padding: '1rem',
            },
        });
    };

    const OverviewCard = ({ title, value, icon: Icon, color }: any) => (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
            <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
                <Icon size={24} className={color.replace('bg-', 'text-')} />
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden min-h-[600px] flex flex-col lg:flex-row animate-slide-up">
            {/* Sidebar */}
            <div className="w-full lg:w-64 bg-gray-900 text-gray-300 flex-shrink-0">
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-white font-bold tracking-wider uppercase text-xs">Admin Panel</h2>
                </div>
                <nav className="p-4 space-y-1">
                    {[
                        { id: 'overview', icon: LayoutGrid, label: 'Overview' },
                        { id: 'products', icon: Package, label: 'Products & Inventory' },
                        { id: 'orders', icon: ShoppingBag, label: 'Orders' },
                        { id: 'users', icon: Users, label: 'User Management' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                                activeTab === item.id 
                                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                : 'hover:bg-gray-800 hover:text-white'
                            }`}
                        >
                            <item.icon size={18} /> {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-50/50 overflow-y-auto max-h-[800px]">
                
                {/* Overview */}
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-fade-in">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                            <span className="text-sm text-gray-500">Last updated: Just now</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                            <OverviewCard title="Total Revenue" value="$12,456" icon={DollarSign} color="bg-green-500" />
                            <OverviewCard title="Active Orders" value="24" icon={ShoppingBag} color="bg-blue-500" />
                            <OverviewCard title="Total Products" value={products.length} icon={Package} color="bg-orange-500" />
                            <OverviewCard title="Total Users" value={users.length} icon={Users} color="bg-purple-500" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-4">Recent Orders</h3>
                                <div className="space-y-3">
                                    {orders.slice(0, 3).map(order => (
                                        <div key={order.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs">
                                                    #{order.id}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                                                    <p className="text-xs text-gray-500">{order.date}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-gray-900">${order.amount}</p>
                                                <span className={`text-[10px] uppercase font-bold ${order.status === 'Completed' ? 'text-green-600' : 'text-amber-600'}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-4">Low Stock Alert</h3>
                                <div className="space-y-3">
                                    {products.slice(0, 3).map(p => (
                                        <div key={p.id} className="flex items-center gap-3 p-2">
                                            <img src={p.image} className="w-10 h-10 rounded-md object-cover bg-gray-100" alt={p.name} />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                                                <p className="text-xs text-gray-500">Stock: {p.stock || 'N/A'}</p>
                                            </div>
                                            <Button size="sm" variant="outline" className="h-8 text-xs">Restock</Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products */}
                {activeTab === 'products' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-2xl font-bold text-gray-900">Products & Inventory</h2>
                            <Button onClick={handleAddClick} className="flex items-center gap-2">
                                <Plus size={18} /> Add Product
                            </Button>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                            <th className="py-4 px-6">Product</th>
                                            <th className="py-4 px-6">Category</th>
                                            <th className="py-4 px-6 text-right">Price</th>
                                            <th className="py-4 px-6 text-center">Stock</th>
                                            <th className="py-4 px-6 text-center">Points</th>
                                            <th className="py-4 px-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {products.map((p) => (
                                            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-gray-100" alt={p.name} />
                                                        <span className="font-medium text-gray-900 text-sm line-clamp-1 max-w-[200px]">{p.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        {p.category}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right font-medium text-gray-900">
                                                    ${p.price.toFixed(2)}
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <div className="inline-flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1 bg-white">
                                                        <input 
                                                            type="number" 
                                                            defaultValue={p.stock || 0} 
                                                            className="w-12 text-center text-sm outline-none bg-white text-gray-900"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className="text-yellow-600 font-bold text-sm">
                                                        {p.variants && p.variants.length > 0 ? 'Var.' : p.loyaltyPoints || 0}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => handleEditClick(p)}
                                                            className="p-1.5 text-gray-400 hover:text-primary transition-colors"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteProduct(p.id)}
                                                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* User Management */}
                {activeTab === 'users' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
                            <div className="relative">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search users..." 
                                    className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                            <th className="py-4 px-6">Name</th>
                                            <th className="py-4 px-6">Contact</th>
                                            <th className="py-4 px-6">Role</th>
                                            <th className="py-4 px-6">Joined Date</th>
                                            <th className="py-4 px-6">Status</th>
                                            <th className="py-4 px-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {users.map((u) => (
                                            <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                                            {u.name.charAt(0)}
                                                        </div>
                                                        <span className="font-medium text-gray-900 text-sm">{u.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500">
                                                    {u.mobile}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                                                        u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-50 text-blue-700'
                                                    }`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-sm text-gray-500">
                                                    {u.joined}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                        u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                                            u.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                                                        }`}></span>
                                                        {u.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button className="text-gray-400 hover:text-gray-600 font-medium text-sm">Manage</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                 {/* Orders Management */}
                 {activeTab === 'orders' && (
                    <div className="space-y-6 animate-fade-in">
                         <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
                         <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
                             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                 <ShoppingBag size={32} />
                             </div>
                             <h3 className="text-lg font-bold text-gray-900">All caught up!</h3>
                             <p className="text-gray-500 max-w-sm mx-auto mt-2">There are no pending orders requiring attention right now.</p>
                         </div>
                    </div>
                 )}
            </div>

            {/* Add/Edit Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8 flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                                <p className="text-xs text-gray-500">Enter product details and inventory info.</p>
                            </div>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 p-1">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto p-6 space-y-6">
                            
                            {/* General Info */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2 mb-4">General Information</h4>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name <span className="text-red-500">*</span></label>
                                    <input 
                                        required 
                                        type="text" 
                                        className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="e.g., Organic Bananas"
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Short Description <span className="text-red-500">*</span></label>
                                    <textarea 
                                        required
                                        className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                                        rows={2}
                                        placeholder="Brief summary for listings..."
                                        value={formData.shortDescription}
                                        onChange={e => setFormData({...formData, shortDescription: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Description <span className="text-red-500">*</span></label>
                                    <textarea 
                                        required
                                        className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
                                        rows={4}
                                        placeholder="Detailed product description..."
                                        value={formData.description}
                                        onChange={e => setFormData({...formData, description: e.target.value})}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                                        <select 
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-gray-900"
                                            value={formData.category}
                                            onChange={e => setFormData({...formData, category: e.target.value})}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                                        <select 
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white text-gray-900"
                                            value={formData.brand}
                                            onChange={e => setFormData({...formData, brand: e.target.value})}
                                        >
                                            <option value="">Select Brand</option>
                                            {brands.map(b => <option key={b} value={b}>{b}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image URL <span className="text-red-500">*</span></label>
                                    <input 
                                        required
                                        type="url" 
                                        className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        placeholder="https://example.com/image.jpg"
                                        value={formData.image}
                                        onChange={e => setFormData({...formData, image: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Pricing & Inventory */}
                            <div className="space-y-4 pt-4">
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-2 mb-4">Pricing & Inventory</h4>
                                
                                <div className="flex items-center mb-4">
                                    <input
                                        id="isVaried"
                                        type="checkbox"
                                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                        checked={isVariedProduct}
                                        onChange={e => setIsVariedProduct(e.target.checked)}
                                    />
                                    <label htmlFor="isVaried" className="ml-2 block text-sm text-gray-900">
                                        This product has options (e.g. Size, Color)
                                    </label>
                                </div>

                                {isVariedProduct ? (
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Variation Type</label>
                                            <input 
                                                type="text" 
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
                                                placeholder="e.g. Size, Weight, Color"
                                                value={formData.variationType}
                                                onChange={e => setFormData({...formData, variationType: e.target.value})}
                                            />
                                        </div>
                                        
                                        <div className="space-y-3">
                                            {variations.map((v, idx) => (
                                                <div key={idx} className="flex gap-2 items-start bg-white p-2 rounded border border-gray-200 shadow-sm">
                                                    <div className="flex-1">
                                                        <input 
                                                            placeholder="Option Name" 
                                                            className="w-full p-2 text-sm border border-gray-300 rounded bg-white text-gray-900"
                                                            value={v.name}
                                                            onChange={e => handleVariationChange(idx, 'name', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="w-24">
                                                        <input 
                                                            type="number" 
                                                            placeholder="Reg. Price" 
                                                            className="w-full p-2 text-sm border border-gray-300 rounded bg-white text-gray-900"
                                                            value={v.regularPrice || ''}
                                                            onChange={e => handleVariationChange(idx, 'regularPrice', parseFloat(e.target.value))}
                                                        />
                                                    </div>
                                                    <div className="w-24">
                                                        <input 
                                                            type="number" 
                                                            placeholder="Sale Price" 
                                                            className="w-full p-2 text-sm border border-gray-300 rounded bg-white text-gray-900"
                                                            value={v.salePrice || ''}
                                                            onChange={e => handleVariationChange(idx, 'salePrice', parseFloat(e.target.value))}
                                                        />
                                                    </div>
                                                     <div className="w-20">
                                                        <input 
                                                            type="number" 
                                                            placeholder="Stock" 
                                                            className="w-full p-2 text-sm border border-gray-300 rounded bg-white text-gray-900"
                                                            value={v.stock || ''}
                                                            onChange={e => handleVariationChange(idx, 'stock', parseInt(e.target.value))}
                                                        />
                                                    </div>
                                                    <div className="w-20">
                                                        <input 
                                                            type="number" 
                                                            placeholder="Points" 
                                                            className="w-full p-2 text-sm border border-gray-300 rounded bg-white text-gray-900"
                                                            value={v.loyaltyPoints || ''}
                                                            onChange={e => handleVariationChange(idx, 'loyaltyPoints', parseInt(e.target.value))}
                                                        />
                                                    </div>
                                                    <button type="button" onClick={() => removeVariation(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                            <Button type="button" size="sm" variant="outline" onClick={addVariation} className="mt-2 text-xs">
                                                <Plus size={14} className="mr-1" /> Add Option
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price ($) <span className="text-red-500">*</span></label>
                                            <input 
                                                required 
                                                type="number" 
                                                step="0.01" 
                                                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                                placeholder="0.00"
                                                value={formData.regularPrice || ''}
                                                onChange={e => setFormData({...formData, regularPrice: parseFloat(e.target.value)})}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price ($)</label>
                                            <input 
                                                type="number" 
                                                step="0.01" 
                                                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                                placeholder="Optional"
                                                value={formData.salePrice || ''}
                                                onChange={e => setFormData({...formData, salePrice: parseFloat(e.target.value)})}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                                            <input 
                                                required 
                                                type="number" 
                                                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                                placeholder="0"
                                                value={formData.stock || ''}
                                                onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Loyalty Points</label>
                                            <input 
                                                type="number" 
                                                className="w-full px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                                placeholder="e.g. 10"
                                                value={formData.loyaltyPoints || ''}
                                                onChange={e => setFormData({...formData, loyaltyPoints: parseInt(e.target.value)})}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                        </form>

                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                             <Button variant="outline" onClick={handleCloseModal}>Cancel</Button>
                             <Button onClick={handleSaveProduct}>{editingProduct ? 'Update Product' : 'Save Product'}</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
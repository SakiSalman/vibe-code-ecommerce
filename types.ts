export interface ProductVariant {
  id: string;
  name: string;
  price?: number;
  stock?: number;
  originalPrice?: number;
  discountPercentage?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  category: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  // Extended fields
  stock?: number;
  expiryDate?: string;
  manufacturingDate?: string;
  weight?: string;
  dimensions?: string;
  discountPercentage?: number;
  loyaltyPoints?: number;
  // Variation fields
  variants?: ProductVariant[];
  variationType?: string; // e.g., "Size", "Color"
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: ProductVariant;
  cartItemId: string; // Unique ID for cart entry (productId + variantId)
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface User {
  name: string;
  mobile: string;
  role: 'ADMIN' | 'CUSTOMER';
  email?: string;
  address?: string;
}

export type Page = 'HOME' | 'PRODUCT_DETAILS' | 'CART' | 'CHECKOUT' | 'LOGIN' | 'REGISTER' | 'DASHBOARD';

import { Product, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Fresh Organic Bananas',
    price: 1.49,
    rating: 4.8,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Sweet, creamy, and packed with energy. Our organic bananas are perfect for snacking, smoothies, or baking.',
    features: ['Organic', 'Rich in Potassium', 'Ethically Sourced'],
    category: 'Fruits & Veg',
    weight: '1 bunch (approx. 6)',
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Farm Fresh Whole Milk',
    price: 3.99,
    rating: 4.9,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Rich and creamy whole milk from grass-fed cows. Delivered fresh from local farms.',
    features: ['Grass-fed', 'Pasteurized', 'Vitamin D Fortified'],
    category: 'Dairy & Eggs',
    variationType: 'Size',
    variants: [
        { id: 'v2-1', name: '1 Gallon', price: 5.99, stock: 50 },
        { id: 'v2-2', name: 'Half Gallon', price: 3.99, stock: 40 }
    ]
  },
  {
    id: '3',
    name: 'Artisan Sourdough Bread',
    price: 5.49,
    rating: 4.7,
    reviewsCount: 89,
    image: 'https://images.unsplash.com/photo-1585476263060-85527d05888d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1585476263060-85527d05888d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Freshly baked sourdough with a perfect crust and soft, airy interior. Made with natural yeast starter.',
    features: ['Freshly Baked', 'No Preservatives', 'Natural Yeast'],
    category: 'Bakery',
    weight: '1 loaf',
    isNew: true,
  },
  {
    id: '4',
    name: 'Free-Range Large Brown Eggs',
    price: 4.99,
    originalPrice: 5.99,
    rating: 4.8,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Large brown eggs from free-range hens. Rich yolks and superior flavor for your breakfast.',
    features: ['Free Range', 'Grade A', 'Large Size'],
    category: 'Dairy & Eggs',
    variationType: 'Pack',
    variants: [
        { id: 'v4-1', name: '12 Count', price: 4.99, originalPrice: 5.99, discountPercentage: 17 },
        { id: 'v4-2', name: '6 Count', price: 2.99 }
    ]
  },
  {
    id: '5',
    name: 'Premium Basmati Rice',
    price: 12.99,
    rating: 4.6,
    reviewsCount: 75,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Aromatic long-grain basmati rice, aged for perfection. Ideal for biryani and pilaf.',
    features: ['Aged Rice', 'Long Grain', 'Aromatic'],
    category: 'Pantry',
    variationType: 'Weight',
    variants: [
        { id: 'v5-1', name: '5 kg', price: 12.99, stock: 100 },
        { id: 'v5-2', name: '10 kg', price: 22.99, stock: 50 }
    ]
  },
  {
    id: '6',
    name: 'Fresh Red Tomatoes',
    price: 2.49,
    rating: 4.5,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Juicy, ripe red tomatoes. Perfect for salads, sandwiches, or cooking.',
    features: ['Locally Grown', 'Vine Ripened'],
    category: 'Fruits & Veg',
    weight: '1 lb',
  },
  {
    id: '7',
    name: 'Chicken Breast Fillets',
    price: 8.99,
    rating: 4.7,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: 'Boneless, skinless chicken breast fillets. High protein and versatile for any meal.',
    features: ['No Antibiotics', 'Air Chilled', 'High Protein'],
    category: 'Meat & Seafood',
    variationType: 'Weight',
    variants: [
        { id: 'v7-1', name: '1 lb', price: 8.99 },
        { id: 'v7-2', name: '2 lbs', price: 16.99, discountPercentage: 5, originalPrice: 17.98 }
    ]
  },
  {
    id: '8',
    name: 'Orange Juice',
    price: 4.29,
    rating: 4.6,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'],
    description: '100% pure squeezed orange juice. No added sugar or preservatives.',
    features: ['High Vitamin C', 'No Pulp', 'Pasteurized'],
    category: 'Beverages',
    variationType: 'Size',
    variants: [
        { id: 'v8-1', name: '52 oz', price: 4.29 },
        { id: 'v8-2', name: '89 oz', price: 7.49 }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Home Chef',
    content: 'The freshness of the produce is unmatched. I love that I can get everything from organic veggies to artisan bread in one place.',
    avatar: 'https://picsum.photos/id/1011/100/100',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Busy Parent',
    content: 'Lumina Grocery saves me so much time. The app is easy to use, and the delivery is always punctual. Highly recommend!',
    avatar: 'https://picsum.photos/id/1012/100/100',
  },
  {
    id: '3',
    name: 'Emma Davis',
    role: 'Nutritionist',
    content: 'I appreciate the detailed product information and the variety of healthy, organic options available. Quality you can trust.',
    avatar: 'https://picsum.photos/id/1027/100/100',
  },
];

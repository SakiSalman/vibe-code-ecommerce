-- Enable UUID extension for generating unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Brands Table
CREATE TABLE IF NOT EXISTS brands (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Basic Info
  name TEXT NOT NULL,
  short_description TEXT,
  description TEXT,
  category TEXT, -- Storing category name for simplicity
  brand TEXT,    -- Storing brand name for simplicity
  
  -- Media
  image TEXT,
  images TEXT[], -- Array of image URLs
  
  -- Pricing & Inventory
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  discount_percentage INTEGER,
  stock INTEGER DEFAULT 0,
  loyalty_points INTEGER DEFAULT 0, -- Added loyalty points column
  
  -- Stats
  rating NUMERIC DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  
  -- Attributes
  features TEXT[],
  is_new BOOLEAN DEFAULT true,
  is_best_seller BOOLEAN DEFAULT false,
  
  -- Variations (JSONB to store complex nested array)
  variation_type TEXT,
  variants JSONB 
);

-- Seed Data: Categories
INSERT INTO categories (name) VALUES 
('Fruits & Veg'), 
('Dairy & Eggs'), 
('Bakery'), 
('Meat & Seafood'), 
('Beverages'), 
('Pantry'), 
('Snacks')
ON CONFLICT (name) DO NOTHING;

-- Seed Data: Brands
INSERT INTO brands (name) VALUES 
('Lumina Choice'), 
('GreenValley'), 
('OrganicLife'), 
('FarmFresh'), 
('NaturesBest'), 
('DairyKing')
ON CONFLICT (name) DO NOTHING;

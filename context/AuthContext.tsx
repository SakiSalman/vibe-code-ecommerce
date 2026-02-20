import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { supabase, getUserProfile } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  login: (mobile: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, mobile: string, password: string, address?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper: Remove non-numeric characters for consistent auth keys
  const cleanMobile = (mobile: string) => mobile.replace(/\D/g, '');

  // Helper to map DB profile to User object
  const fetchUserMap = async (authSessionUser: any) => {
    // 1. Try fetching from 'profiles' table
    // We await this, but if it fails/returns null, we proceed to metadata
    const dbProfile = await getUserProfile(authSessionUser.id);
    
    if (dbProfile) {
      return {
        ...dbProfile,
        role: dbProfile.role as 'ADMIN' | 'CUSTOMER',
        rewardPoints: dbProfile.reward_points || 0,
      };
    }

    // 2. Fallback to Auth Metadata
    // This is crucial for initial session load if DB fetch is slow or fails
    const meta = authSessionUser.user_metadata;
    if (meta) {
      return {
        id: authSessionUser.id,
        name: meta.name || '',
        email: meta.real_email || '', 
        mobile: meta.mobile || authSessionUser.email?.replace('@lumina.local', ''),
        address: meta.address || '',
        role: (meta.role as 'ADMIN' | 'CUSTOMER') || 'CUSTOMER',
        rewardPoints: 0
      };
    }
    
    // 3. Absolute fallback if metadata is somehow missing (rare)
    return {
        id: authSessionUser.id,
        name: 'User',
        email: authSessionUser.email,
        mobile: authSessionUser.email?.replace('@lumina.local', '') || '',
        role: 'CUSTOMER',
        rewardPoints: 0
    };
  };

  useEffect(() => {
    let mounted = true;

    // Function to handle setting user state
    const handleUserSession = async (session: any) => {
      if (session?.user) {
        const mappedUser = await fetchUserMap(session.user);
        if (mounted) setUser(mappedUser);
      } else {
        if (mounted) setUser(null);
      }
      if (mounted) setLoading(false);
    };

    // 1. Check active session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleUserSession(session);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      handleUserSession(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (mobile: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    if (!password) return { success: false, error: "Password is required" };
    if (!mobile) return { success: false, error: "Mobile number is required" };

    const cleanedMobile = cleanMobile(mobile);
    const proxyEmail = `${cleanedMobile}@lumina.local`;

    const { error } = await supabase.auth.signInWithPassword({
      email: proxyEmail,
      password,
    });

    if (error) {
      console.error("Login failed:", error);
      return { success: false, error: "Invalid mobile number or password." };
    }

    return { success: true };
  };

  const register = async (name: string, mobile: string, password: string, address?: string): Promise<{ success: boolean; error?: string }> => {
    if (!password) return { success: false, error: "Password is required" };
    if (!mobile) return { success: false, error: "Mobile number is required" };

    const cleanedMobile = cleanMobile(mobile);
    // Construct the proxy email for Supabase Auth
    const proxyEmail = `${cleanedMobile}@lumina.local`;

    // Determine role: If name is 'admin', grant ADMIN role, otherwise CUSTOMER
    const assignedRole = name.trim().toLowerCase() === 'admin' ? 'ADMIN' : 'CUSTOMER';

    // 1. Sign up with Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email: proxyEmail,
      password,
      options: {
        data: {
          name,
          mobile: cleanedMobile, // Store cleaned mobile
          address,
          role: assignedRole
        }
      }
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (data.user) {
      // 2. Create Profile entry
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            name,
            email: null, // No email stored
            mobile: cleanedMobile,
            address,
            role: assignedRole,
            reward_points: 0
          }
        ]);

      if (profileError) {
        console.warn("Profile creation warning:", profileError.message);
      }
      
      // Explicitly sign out to enforce the "Redirect to Login" flow
      await supabase.auth.signOut();

      return { success: true };
    }

    return { success: false, error: "Unknown error occurred" };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
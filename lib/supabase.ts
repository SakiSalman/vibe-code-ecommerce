import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wazggzhhckapuzvzofba.supabase.co';
const supabaseKey = 'sb_publishable_XLQpZadGSXHMy-52Nd_McA_1f3Udunp';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper to fetch user profile
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (error) {
      console.warn('Error fetching profile:', error.message);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error fetching profile:', error);
    return null;
  }
};
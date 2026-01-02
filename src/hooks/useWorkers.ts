import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type WorkerCategory = Database['public']['Enums']['worker_category'];
type LocationArea = Database['public']['Enums']['location_area'];

interface WorkersFilters {
  category?: WorkerCategory | null;
  location?: LocationArea | null;
  search?: string;
}

export function useWorkers(filters: WorkersFilters = {}) {
  return useQuery({
    queryKey: ['workers', filters],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*')
        .eq('is_available', true);
      
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters.location) {
        query = query.or(`location.eq.${filters.location},areas_served.cs.{${filters.location}}`);
      }
      
      if (filters.search) {
        query = query.ilike('full_name', `%${filters.search}%`);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Profile[];
    },
  });
}

export function useWorker(id: string | undefined) {
  return useQuery({
    queryKey: ['worker', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Profile | null;
    },
    enabled: !!id,
  });
}

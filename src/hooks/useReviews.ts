import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Review = Database['public']['Tables']['reviews']['Row'];
type ReviewInsert = Database['public']['Tables']['reviews']['Insert'];

export function useReviews(workerId: string | undefined) {
  return useQuery({
    queryKey: ['reviews', workerId],
    queryFn: async () => {
      if (!workerId) return [];
      
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('worker_id', workerId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Review[];
    },
    enabled: !!workerId,
  });
}

export function useAverageRating(workerId: string | undefined) {
  const { data: reviews } = useReviews(workerId);
  
  if (!reviews || reviews.length === 0) return null;
  
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (review: ReviewInsert) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert(review)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.worker_id] });
    },
  });
}

import { Database } from '@/integrations/supabase/types';

type WorkerCategory = Database['public']['Enums']['worker_category'];

// Category background images from Unsplash
// High-quality images matching each profession
export const categoryImages: Record<WorkerCategory, string> = {
  plumber: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1920&q=80&auto=format&fit=crop',
  electrician: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&q=80&auto=format&fit=crop',
  painter: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1920&q=80&auto=format&fit=crop',
  carpenter: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1920&q=80&auto=format&fit=crop',
  mason: 'https://images.unsplash.com/photo-1504307651254-35680f784045?w=1920&q=80&auto=format&fit=crop',
  laborer: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80&auto=format&fit=crop',
  maid: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1920&q=80&auto=format&fit=crop',
  cook: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1920&q=80&auto=format&fit=crop',
  driver: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1920&q=80&auto=format&fit=crop',
  gardener: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=80&auto=format&fit=crop',
  security_guard: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80&auto=format&fit=crop',
  other: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80&auto=format&fit=crop',
};

export const defaultBackgroundImage = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80&auto=format&fit=crop';


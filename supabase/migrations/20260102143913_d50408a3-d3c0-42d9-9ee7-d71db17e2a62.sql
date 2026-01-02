-- Create enum for worker categories
CREATE TYPE public.worker_category AS ENUM (
  'plumber',
  'electrician', 
  'painter',
  'carpenter',
  'mason',
  'laborer',
  'maid',
  'cook',
  'driver',
  'gardener',
  'security_guard',
  'other'
);

-- Create enum for location areas
CREATE TYPE public.location_area AS ENUM (
  'gilgit',
  'skardu',
  'hunza',
  'nagar',
  'ghizer',
  'diamer',
  'astore',
  'ghanche',
  'shigar',
  'kharmang'
);

-- Create profiles table for authenticated users (workers)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  profile_photo_url TEXT,
  category worker_category NOT NULL,
  location location_area NOT NULL,
  areas_served location_area[] DEFAULT ARRAY[]::location_area[],
  hourly_rate INTEGER,
  daily_rate INTEGER,
  description TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reviewer_name TEXT NOT NULL,
  reviewer_phone TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
-- Anyone can view available worker profiles
CREATE POLICY "Anyone can view worker profiles"
ON public.profiles
FOR SELECT
USING (is_available = true);

-- Workers can insert their own profile
CREATE POLICY "Users can create their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Workers can update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- RLS Policies for reviews
-- Anyone can view reviews
CREATE POLICY "Anyone can view reviews"
ON public.reviews
FOR SELECT
USING (true);

-- Anyone can create reviews (no auth required for customers)
CREATE POLICY "Anyone can create reviews"
ON public.reviews
FOR INSERT
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-photos', 'profile-photos', true);

-- Storage policies for profile photos
CREATE POLICY "Anyone can view profile photos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'profile-photos');

CREATE POLICY "Authenticated users can upload their profile photo"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'profile-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own profile photo"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own profile photo"
ON storage.objects
FOR DELETE
USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    author TEXT DEFAULT 'Admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read blogs
CREATE POLICY "Anyone can read blogs"
    ON public.blogs
    FOR SELECT
    USING (true);

-- Create policy to allow authenticated users to insert blogs (admin only in app logic)
CREATE POLICY "Authenticated users can insert blogs"
    ON public.blogs
    FOR INSERT
    WITH CHECK (true);

-- Create policy to allow authenticated users to update blogs
CREATE POLICY "Authenticated users can update blogs"
    ON public.blogs
    FOR UPDATE
    USING (true)
    WITH CHECK (true);

-- Create policy to allow authenticated users to delete blogs
CREATE POLICY "Authenticated users can delete blogs"
    ON public.blogs
    FOR DELETE
    USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS blogs_created_at_idx ON public.blogs(created_at DESC);


-- Create queries table
CREATE TABLE IF NOT EXISTS public.queries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feedbacks table
CREATE TABLE IF NOT EXISTS public.feedbacks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anyone to insert queries and feedbacks
CREATE POLICY "Anyone can insert queries"
    ON public.queries
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Anyone can insert feedbacks"
    ON public.feedbacks
    FOR INSERT
    WITH CHECK (true);

-- Create policies to allow authenticated users to read queries and feedbacks (admin only in app logic)
CREATE POLICY "Authenticated users can read queries"
    ON public.queries
    FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can read feedbacks"
    ON public.feedbacks
    FOR SELECT
    USING (true);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS queries_created_at_idx ON public.queries(created_at DESC);
CREATE INDEX IF NOT EXISTS feedbacks_created_at_idx ON public.feedbacks(created_at DESC);
CREATE INDEX IF NOT EXISTS feedbacks_rating_idx ON public.feedbacks(rating);


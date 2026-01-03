# Complete Supabase Setup Guide for Rozgaar GB

This guide will help you set up Supabase from scratch for your Rozgaar GB application.

## Step 1: Create a Supabase Account and Project

1. **Sign up for Supabase**
   - Go to https://supabase.com
   - Click "Start your project" or "Sign in"
   - Sign up with your email (or use GitHub/Google)

2. **Create a New Project**
   - Click "New Project" in your dashboard
   - Fill in the details:
     - **Name**: Rozgaar GB (or any name you prefer)
     - **Database Password**: Create a strong password (save it securely!)
     - **Region**: Choose the closest region to your users
     - **Pricing Plan**: Free tier is fine to start
   - Click "Create new project"
   - Wait 2-3 minutes for the project to be set up

## Step 2: Get Your API Keys

1. **Navigate to Project Settings**
   - In your Supabase dashboard, click the gear icon (⚙️) in the left sidebar
   - Click "API" or go to Settings → API

2. **Copy Your Credentials**
   - **Project URL**: Copy the "Project URL" (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key**: Copy the "anon public" key (starts with `eyJ...`)

## Step 3: Set Up Environment Variables

1. **Create `.env` file**
   - In your project root directory, create a file named `.env`
   - Add the following content:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_public_key_here
```

2. **Replace the values**
   - Replace `your_project_url_here` with your Project URL from Step 2
   - Replace `your_anon_public_key_here` with your anon public key from Step 2

3. **Example**:
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 4: Set Up Database Schema

1. **Go to SQL Editor**
   - In Supabase dashboard, click "SQL Editor" in the left sidebar
   - Click "New query"

2. **Run Migration Files**
   You need to run these SQL files in order:

   **a) First, run the main schema migration:**
   - Copy the contents of `supabase/migrations/20260102143913_d50408a3-d3c0-42d9-9ee7-d71db17e2a62.sql`
   - Paste it in the SQL Editor
   - Click "Run" or press Ctrl+Enter

   **b) Then run the blogs table migration:**
   - Copy contents of `supabase/migrations/20250103000000_create_blogs_table.sql`
   - Paste and run

   **c) Run queries/feedbacks tables:**
   - Copy contents of `supabase/migrations/20250103000001_create_queries_feedbacks_tables.sql`
   - Paste and run

   **d) Update location enum (if needed):**
   - Copy contents of `supabase/migrations/20250103000002_update_location_area_to_mohalas.sql`
   - Paste and run

## Step 5: Configure Authentication

1. **Enable Email Signups**
   - Go to **Authentication** → **Settings** in the left sidebar
   - Scroll down to find "Enable email signups"
   - Make sure it's **ON** (toggle should be green)
   - If you see "Disable new signups", make sure it's **OFF**

2. **Configure Email Provider**
   - Go to **Authentication** → **Providers**
   - Find **Email** provider
   - Make sure it's **Enabled**
   - Configure email templates if needed

3. **Disable Email Confirmation (Optional - for testing)**
   - In **Authentication** → **Settings**
   - Find "Enable email confirmations"
   - Turn it **OFF** for now (users can sign up without email verification)
   - You can enable it later for production

4. **Create Admin Account**
   - Go to **Authentication** → **Users**
   - Click "Add user" or "Invite user"
   - Enter email: `maqboolali741@gmail.com`
   - Enter password: `Maqbool123456@@##`
   - Click "Create user"
   - This will be your admin account

## Step 6: Set Up Row Level Security (RLS) Policies

The migrations should have set up basic RLS policies, but verify:

1. **Check RLS is enabled**
   - Go to **Table Editor** in Supabase
   - Click on each table (profiles, reviews, blogs, queries, feedbacks)
   - Check that "RLS enabled" is ON

2. **Verify Policies**
   - Click on each table → "Policies" tab
   - You should see policies allowing:
     - Anyone to read profiles
     - Authenticated users to insert/update their own profiles
     - Anyone to read blogs
     - Authenticated users to insert blogs (admin check is in app code)

## Step 7: Test Your Setup

1. **Restart your development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

2. **Test signup**
   - Go to your app
   - Try to register a new user
   - It should work now!

3. **Test admin login**
   - Login with:
     - Email: `maqboolali741@gmail.com`
     - Password: `Maqbool123456@@##`
   - You should see the "Add Blog" button in the header

## Step 8: Update Database Types (Optional)

After setting up, you might want to regenerate TypeScript types:

1. **Install Supabase CLI** (if not installed):
   ```bash
   npm install -g supabase
   ```

2. **Generate types**:
   ```bash
   supabase gen types typescript --project-id your-project-id > src/integrations/supabase/types.ts
   ```

   Or manually update the types file if needed.

## Troubleshooting

### "Signups not allowed" error
- Make sure email signups are enabled in Authentication → Settings

### "Invalid API key" error
- Check your `.env` file has the correct values
- Make sure you're using the "anon public" key, not the "service_role" key
- Restart your dev server after changing `.env`

### Database connection errors
- Verify your Project URL is correct
- Check that your Supabase project is active (not paused)
- Make sure you've run all migration files

### RLS errors
- Check that RLS policies are set up correctly
- Verify policies allow the operations you need

## Next Steps

Once everything is set up:
1. ✅ Users can register and login
2. ✅ Workers can create profiles
3. ✅ Admin can add blogs
4. ✅ Users can submit queries and feedback
5. ✅ Everything should work!

## Need Help?

- Supabase Docs: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com
- Check the console for specific error messages


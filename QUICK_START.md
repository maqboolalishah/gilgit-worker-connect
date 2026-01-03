# Quick Start Guide - Supabase Setup

## 🚀 Quick Setup (5 minutes)

### 1. Create Supabase Project
1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Name: `Rozgaar GB`
4. Set a database password (save it!)
5. Choose region closest to you
6. Click "Create new project"
7. Wait 2-3 minutes

### 2. Get API Keys
1. In Supabase dashboard → Click ⚙️ Settings → API
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### 3. Create `.env` File
In your project root, create a file named `.env`:

```env
VITE_SUPABASE_URL=paste_your_project_url_here
VITE_SUPABASE_PUBLISHABLE_KEY=paste_your_anon_public_key_here
```

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxOTMxODE1MDIyfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Set Up Database
1. In Supabase → Click **SQL Editor** (left sidebar)
2. Click **New query**
3. Copy and paste the SQL from these files (in order):

   **a) Main Schema:**
   - Open: `supabase/migrations/20260102143913_d50408a3-d3c0-42d9-9ee7-d71db17e2a62.sql`
   - Copy all SQL → Paste in SQL Editor → Click **Run**

   **b) Blogs Table:**
   - Open: `supabase/migrations/20250103000000_create_blogs_table.sql`
   - Copy all SQL → Paste → Run

   **c) Queries/Feedbacks:**
   - Open: `supabase/migrations/20250103000001_create_queries_feedbacks_tables.sql`
   - Copy all SQL → Paste → Run

### 5. Enable Signups
1. Go to **Authentication** → **Settings**
2. Find "Enable email signups" → Turn it **ON**
3. (Optional) Turn **OFF** "Enable email confirmations" for testing

### 6. Create Admin Account
1. Go to **Authentication** → **Users**
2. Click **Add user** or **Invite user**
3. Email: `maqboolali741@gmail.com`
4. Password: `Maqbool123456@@##`
5. Click **Create user**

### 7. Start Your App
```bash
npm run dev
# or
bun dev
```

### 8. Test It!
- ✅ Try signing up a new user
- ✅ Login as admin (`maqboolali741@gmail.com`)
- ✅ You should see "Add Blog" button

## ✅ Done!

Your app should now be fully functional!

## 📝 Need More Details?

See `SETUP_GUIDE.md` for detailed instructions and troubleshooting.


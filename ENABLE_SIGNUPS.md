# How to Enable User Signups in Supabase

The error "Signups not allowed for this instance" occurs when email signups are disabled in your Supabase project settings.

## Steps to Enable Signups:

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Select your project

2. **Navigate to Authentication Settings**
   - Click on **Authentication** in the left sidebar
   - Click on **Providers** or **Settings**

3. **Enable Email Provider**
   - Find **Email** provider in the list
   - Make sure it's **Enabled**
   - If disabled, toggle it to **Enabled**

4. **Check Auth Settings**
   - Go to **Authentication** → **Settings**
   - Scroll down to **User Signups**
   - Make sure **Enable email signups** is turned **ON**
   - If you see "Disable new signups", make sure it's **OFF**

5. **Configure Email Templates (Optional)**
   - Go to **Authentication** → **Email Templates**
   - Customize the confirmation email if needed
   - Make sure email confirmation is set according to your needs:
     - **Enable email confirmations**: ON (recommended for production)
     - **Enable email confirmations**: OFF (for development/testing)

6. **Save Changes**
   - Click **Save** if there's a save button
   - Changes should apply immediately

## Alternative: Disable Email Confirmation (For Testing)

If you want to allow signups without email confirmation:

1. Go to **Authentication** → **Settings**
2. Find **Enable email confirmations**
3. Turn it **OFF**
4. Users can now sign up and use the app immediately without confirming their email

## After Enabling:

1. Try signing up again from your app
2. The signup should work now
3. If email confirmation is enabled, users will need to check their email and click the confirmation link

## Troubleshooting:

- If signups still don't work, check:
  - Your Supabase project is active (not paused)
  - You have the correct project selected
  - API keys are correct in your `.env` file
  - No rate limiting is blocking the requests


# Deploy NEONMIND to Cloudflare Pages

## Connect the GitHub repository
1. Open the Cloudflare dashboard: https://dash.cloudflare.com/
2. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the GitHub repository `musclank/neonmind` and authorize access if prompted.
4. Use these build settings:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |

5. Add the environment variables below in **Settings → Variables and Secrets** for both Preview and Production:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Save and deploy. Future pushes to `main` will trigger deployments.

## Configure Supabase
1. Create a project at https://supabase.com/dashboard.
2. Open **Project Settings → API** and copy the Project URL and anon/publishable key.
3. Add those values to Cloudflare Pages as the two environment variables above.
4. In **Authentication → URL Configuration**, set the Site URL to your deployed Cloudflare Pages URL.
5. Add the same URL to the Redirect URLs allowlist. Add your eventual custom domain too.
6. In **Authentication → Providers**, enable Email. Choose whether email confirmation is required.
7. Run the SQL in `supabase/schema.sql` from the Supabase SQL Editor.

## Important
The browser anon/publishable key is designed to be public when Row Level Security is correctly configured. Never put a Supabase service-role key or any AI provider secret in a `VITE_*` variable. AI provider keys must be stored in server-side functions/secrets.

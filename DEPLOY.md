# Deploying this portfolio to Vercel

No database, no environment variables, no special settings needed — the site
is fully static. Everything below takes about 10 minutes.

## Step 1 - Put the code on GitHub

1. Unzip this folder on your computer.
2. Go to github.com -> sign in -> click **+** (top right) -> **New repository**.
3. Name it `portfolio` (or anything), set **Private** or Public, click **Create**.
4. Upload the files - pick whichever way is easiest:
   - **Web upload (easiest one-time):** on the new empty repo page click
     **"uploading an existing file"**, then drag-select ALL files/folders from
     inside the unzipped folder (src, public, package.json, ...) into the page.
     Wait for the upload to finish -> click **Commit changes**.
   - **Terminal (better for future updates):** from inside the unzipped folder run:
     ```bash
     git init
     git add .
     git commit -m "Portfolio site"
     git branch -M main
     git remote add origin https://github.com/heinhtoonaing/portfolio.git
     git push -u origin main
     ```

## Step 2 - Import the repo into Vercel

1. Go to vercel.com -> **Sign up / Log in with GitHub** (use the same account
   you used for your other deployed projects if you like).
2. Click **Add New... -> Project**.
3. Find the `portfolio` repo in the list -> click **Import**.
4. Leave everything as the default:
   - Framework Preset: **Next.js** (auto-detected)
   - Build Command / Output / Install: **leave untouched**
   - Environment Variables: **add nothing** - this site needs none
5. Click **Deploy** and wait ~1 minute.

## Step 3 - Done

- Your site goes live at `https://portfolio-<your-name>.vercel.app`
  (the exact URL is shown on the dashboard).
- Optional: rename the URL under **Settings -> Domains**, or add a custom
  domain (e.g. heinhtoonaing.dev) there later.

## Updating the site later

Any change pushed to the repo's `main` branch redeploys automatically.
If you edit the site through a chat session, just download the updated files,
replace them in your local folder, then commit + push (or upload again).

## Notes

- `node_modules`, `.next`, and `.env` are intentionally NOT in this package -
  Vercel installs dependencies itself from `package.json` / `bun.lock`.
- The folder contains no secrets of any kind.

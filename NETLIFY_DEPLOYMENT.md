# Netlify Deployment Guide — Ignacio Avas Portfolio

This guide walks you through deploying the portfolio to Netlify.

## Prerequisites

- A Netlify account (sign up at [netlify.com](https://netlify.com))
- A GitHub account with this repository pushed to it
- Git installed locally

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select GitHub and authorize Netlify
   - Choose your repository

3. **Configure Build Settings**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - Click "Deploy site"

Netlify will automatically use the `netlify.toml` configuration file for additional settings.

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Authenticate**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Configuration Details

The `netlify.toml` file includes:

- **Build command:** Runs `npm run build` to create the production bundle
- **Publish directory:** Points to `dist/` where Vite outputs the static site
- **Client-side routing:** Redirects all non-file requests to `index.html` for React Router
- **Security headers:** Prevents clickjacking, XSS, and MIME sniffing
- **Cache control:** Optimizes performance with appropriate cache headers

## Custom Domain Setup

1. In Netlify dashboard, go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter your domain (e.g., `ignacioavas.com`)
4. Follow the DNS configuration instructions
5. Update your domain registrar's nameservers or DNS records

## Environment Variables (if needed in future)

To add environment variables:

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **Edit variables**
3. Add your variables
4. Redeploy the site

## Troubleshooting

### Build fails with "command not found: npm"
- Ensure Node.js 18+ is installed
- Netlify should auto-detect the correct Node version from `.nvmrc` or `package.json`

### 404 errors on page refresh
- The `netlify.toml` redirect rule should handle this
- Verify the `publish` directory is set to `dist`

### Assets not loading
- Check that all image URLs use the correct paths from the `public/` directory
- Ensure no local file paths are hardcoded in components

### Slow performance
- Check the cache headers in `netlify.toml`
- Use Netlify's Analytics to identify bottlenecks
- Consider enabling Netlify's image optimization

## Performance Optimization

- **Minification:** Vite automatically minifies CSS and JavaScript
- **Code splitting:** React components are code-split by default
- **Image optimization:** Use CDN URLs for all images
- **Caching:** Static assets are cached for 1 year; HTML is always fresh

## Monitoring

After deployment:

1. Check the **Deploys** tab in Netlify for build logs
2. Use **Analytics** to track page views and performance
3. Set up **Notifications** for deployment failures
4. Monitor **Functions** (if using serverless functions in future)

## Next Steps

- Set up a custom domain
- Enable automatic deployments on push to `main`
- Configure branch previews for staging deployments
- Add form handling with Netlify Forms (if needed)
- Set up redirects for SEO (301 redirects from old URLs)

---

**Questions?** Check the [Netlify docs](https://docs.netlify.com) or contact Netlify support.

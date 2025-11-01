# 🚀 Deploy to abhati27.github.io/portfolio/

Your website is configured to deploy to **https://abhati27.github.io/portfolio/**

## ✅ Configuration Complete

- ✅ `basePath: '/portfolio'` added to Next.js config
- ✅ Static export enabled
- ✅ GitHub Actions workflow ready
- ✅ Build tested and working

## 📋 Deployment Steps

### Step 1: Initialize Git (if not already done)

```bash
cd /Users/anmolbhatia/Desktop/projects/Website

# Initialize git if needed
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Portfolio website with AI chatbot"
```

### Step 2: Connect to Your GitHub Repository

```bash
# Add your repository as remote
git remote add origin https://github.com/abhati27/portfolio.git

# Or if using SSH
git remote add origin git@github.com:abhati27/portfolio.git

# Set the main branch
git branch -M main
```

### Step 3: Push to GitHub

```bash
# Push to the repository
git push -u origin main
```

If the repository already has content, you have two options:

**Option A: Keep existing content (safe)**
```bash
# Pull first, then push
git pull origin main --allow-unrelated-histories
git push -u origin main
```

**Option B: Replace all content (use with caution)**
```bash
# Force push (this will replace everything in the repo)
git push -u origin main --force
```

### Step 4: Configure GitHub Pages

1. Go to your repository: https://github.com/abhati27/portfolio
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under "Build and deployment":
   - **Source**: Select **GitHub Actions**
4. Wait 1-2 minutes for the deployment to complete

### Step 5: Visit Your Live Site! 🎉

Your website will be available at:
```
https://abhati27.github.io/portfolio/
```

## 🔄 Future Updates

After the initial setup, deploying updates is simple:

```bash
# Make your changes, then:
git add .
git commit -m "Your update message"
git push
```

GitHub Actions will automatically rebuild and deploy your site!

## 🎯 What Works

Everything works exactly as before:
- ✅ All 4 Star Wars themes
- ✅ AI Chatbot (Hugging Face integration)
- ✅ Image modals with maximize
- ✅ All animations and effects
- ✅ Theme switching
- ✅ Resume download
- ✅ Responsive design

## 📁 Repository Structure

Your GitHub repository will contain:
```
portfolio/
├── .github/workflows/deploy.yml  ← Auto-deployment workflow
├── app/                          ← Next.js app pages
├── components/                   ← React components
├── contexts/                     ← Theme context
├── lib/                          ← Data and utilities
├── public/                       ← Static assets
├── types/                        ← TypeScript types
├── next.config.js               ← Next.js config (with basePath)
├── package.json                 ← Dependencies
└── README.md                    ← Documentation
```

## 🐛 Troubleshooting

### Issue: 404 Error on GitHub Pages
**Solution**: Make sure you selected "GitHub Actions" as the source in Settings → Pages

### Issue: Site shows but routes don't work
**Solution**: This is already handled with the basePath configuration. All routes will work at `/portfolio/`

### Issue: Images not loading
**Solution**: All images are already configured with correct paths. They'll work automatically.

### Issue: GitHub Actions workflow failing
**Solution**: Check the "Actions" tab in your repository for error details. Common fixes:
- Make sure Node.js version is compatible (workflow uses Node 20)
- Verify all dependencies are in package.json

## 📊 Monitoring Deployments

1. Go to the **Actions** tab in your repository
2. You'll see all deployment runs
3. Click on any run to see detailed logs
4. Green checkmark = successful deployment
5. Red X = failed (click to see error logs)

## 🎨 Customization

To change your personal information:
- Edit `lib/resume-data.ts` for portfolio content
- Replace images in `public/` directory
- Update `public/resume.pdf` with your resume
- Modify themes in `lib/themes.ts`

Then commit and push - it will auto-deploy!

## 🌐 Custom Domain (Optional)

Want to use your own domain instead of `abhati27.github.io/portfolio/`?

1. Add a `CNAME` file to `public/` directory:
   ```
   yourdomain.com
   ```

2. Update `next.config.js` to remove basePath:
   ```javascript
   const nextConfig = {
     output: 'export',
     // Remove or comment out: basePath: '/portfolio',
     ...
   ```

3. Configure your domain's DNS settings
4. Enable "Enforce HTTPS" in GitHub Pages settings

## 📚 Additional Resources

- [Your Repository](https://github.com/abhati27/portfolio)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

---

## Quick Reference Commands

```bash
# Clone your repo (if starting on a new machine)
git clone https://github.com/abhati27/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build

# Test the build
npx serve out

# Deploy (after making changes)
git add .
git commit -m "Update website"
git push
```

---

🎉 **You're all set!** Push to GitHub and your site will be live at **abhati27.github.io/portfolio/** in minutes!


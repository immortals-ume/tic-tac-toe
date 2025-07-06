# Deployment Guide for Tic-Tac-Toe App

This guide will help you deploy your Tic-Tac-Toe React app to various platforms using GitHub Actions.

## 🚀 Quick Start - GitHub Pages (Recommended)

GitHub Pages is the easiest and free option for deploying your app.

### Step 1: Enable GitHub Pages
1. Go to your GitHub repository
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "GitHub Actions"
5. The workflow will automatically deploy your app

### Step 2: Access Your App
Your app will be available at: `https://[your-username].github.io/[repository-name]`

## 🌐 Alternative Deployment Options

### Option 1: Vercel (Recommended for React Apps)

Vercel is optimized for React applications and offers excellent performance.

#### Setup Steps:
1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Your Repository**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a React app

3. **Configure Environment Variables** (if using GitHub Actions)
   - Go to your GitHub repository settings
   - Add these secrets:
     - `VERCEL_TOKEN`: Get from Vercel dashboard → Settings → Tokens
     - `ORG_ID`: Get from Vercel dashboard → Settings → General
     - `PROJECT_ID`: Get from Vercel dashboard → Settings → General

4. **Deploy**
   - Vercel will automatically deploy on every push
   - Or use the GitHub Actions workflow by enabling the `deploy-vercel.yml`

### Option 2: Netlify

Netlify offers great features for static sites and PWAs.

#### Setup Steps:
1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with your GitHub account

2. **Import Your Repository**
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `build`

3. **Configure Environment Variables** (if using GitHub Actions)
   - Go to your GitHub repository settings
   - Add these secrets:
     - `NETLIFY_AUTH_TOKEN`: Get from Netlify dashboard → User settings → Applications → Personal access tokens
     - `NETLIFY_SITE_ID`: Get from Netlify dashboard → Site settings → General → Site information

4. **Deploy**
   - Netlify will automatically deploy on every push
   - Or use the GitHub Actions workflow by enabling the `deploy-netlify.yml`

### Option 3: Firebase Hosting

Firebase offers Google's infrastructure for hosting.

#### Setup Steps:
1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure firebase.json**
   ```json
   {
     "hosting": {
       "public": "build",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🔧 GitHub Actions Workflows

The repository includes several GitHub Actions workflows:

### 1. Main CI/CD Pipeline (`ci-cd.yml`)
- **Runs on**: Push to main/master and pull requests
- **Features**:
  - Linting with ESLint
  - Testing with coverage
  - Security audit
  - Build verification
  - Automatic deployment to GitHub Pages

### 2. Vercel Deployment (`deploy-vercel.yml`)
- **Runs on**: Push to main/master and pull requests
- **Features**: Automatic deployment to Vercel

### 3. Netlify Deployment (`deploy-netlify.yml`)
- **Runs on**: Push to main/master
- **Features**: Automatic deployment to Netlify

## 🛠️ Manual Deployment

If you prefer to deploy manually:

### Build the App
```bash
npm install --legacy-peer-deps
npm run build
```

### Upload to Your Hosting Provider
Upload the contents of the `build/` folder to your hosting provider.

## 🔒 Environment Variables

If your app uses environment variables, create a `.env` file:

```env
REACT_APP_API_URL=your_api_url_here
REACT_APP_ENVIRONMENT=production
```

## 📱 PWA Features

Your app includes PWA features:
- Service Worker for offline functionality
- Web App Manifest for app-like experience
- Install prompt for mobile devices

Make sure your hosting provider supports HTTPS for PWA features to work properly.

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check Node.js version (use 18.x)
   - Run `npm install --legacy-peer-deps`
   - Check for TypeScript errors

2. **Deployment Fails**
   - Verify repository secrets are set correctly
   - Check build logs in GitHub Actions
   - Ensure all dependencies are in package.json

3. **App Not Loading**
   - Check if the hosting provider supports SPA routing
   - Verify the build folder is uploaded correctly
   - Check browser console for errors

### Getting Help:
- Check GitHub Actions logs for detailed error messages
- Review the hosting provider's documentation
- Ensure all environment variables are set correctly

## 🎉 Success!

Once deployed, your Tic-Tac-Toe app will be live and accessible to users worldwide! The app includes:
- Multi-language support
- Dark/light theme
- PWA capabilities
- Responsive design
- Sound effects
- AI opponent

Happy deploying! 🎮 
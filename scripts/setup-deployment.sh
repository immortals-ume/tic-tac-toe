#!/bin/bash

# Tic-Tac-Toe Deployment Setup Script
# This script helps you set up deployment for your Tic-Tac-Toe app

echo "🎮 Tic-Tac-Toe Deployment Setup"
echo "================================"
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: This is not a git repository."
    echo "Please run 'git init' first."
    exit 1
fi

# Check if we have the necessary files
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found."
    echo "Please run this script from the project root."
    exit 1
fi

echo "✅ Git repository detected"
echo "✅ package.json found"
echo ""

# Check if GitHub Actions workflows exist
if [ -d ".github/workflows" ]; then
    echo "✅ GitHub Actions workflows found:"
    ls -la .github/workflows/
    echo ""
else
    echo "❌ GitHub Actions workflows not found."
    echo "Please ensure the .github/workflows/ directory exists with the workflow files."
    exit 1
fi

echo "🚀 Deployment Options Available:"
echo ""

echo "1. GitHub Pages (Recommended - Free)"
echo "   - Go to your GitHub repository"
echo "   - Settings → Pages"
echo "   - Source: GitHub Actions"
echo "   - Your app will be available at: https://[username].github.io/[repo-name]"
echo ""

echo "2. Vercel (Recommended for React Apps)"
echo "   - Visit: https://vercel.com"
echo "   - Sign up with GitHub"
echo "   - Import your repository"
echo "   - Automatic deployments on every push"
echo ""

echo "3. Netlify"
echo "   - Visit: https://netlify.com"
echo "   - Sign up with GitHub"
echo "   - New site from Git"
echo "   - Build command: npm run build"
echo "   - Publish directory: build"
echo ""

echo "4. Firebase Hosting"
echo "   - Install Firebase CLI: npm install -g firebase-tools"
echo "   - Run: firebase login"
echo "   - Run: firebase init hosting"
echo "   - Configure firebase.json (already created)"
echo ""

echo "📋 Next Steps:"
echo "=============="
echo ""

echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Add deployment configuration'"
echo "   git push origin main"
echo ""

echo "2. Choose your deployment platform from the options above"
echo ""

echo "3. For detailed instructions, see DEPLOYMENT.md"
echo ""

echo "🔧 Testing Your Setup:"
echo "====================="
echo ""

echo "Test your build locally:"
echo "npm install --legacy-peer-deps"
echo "npm run build"
echo ""

echo "If the build succeeds, you're ready to deploy!"
echo ""

echo "🎉 Happy deploying! 🎮" 
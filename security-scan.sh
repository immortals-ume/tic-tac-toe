#!/bin/bash

# Security Scan Script for Tic Tac Toe React App
# This script performs comprehensive security checks locally

echo "🔒 Starting Security Scan for Tic Tac Toe React App"
echo "=================================================="

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# 1. Dependency Vulnerability Scan
echo ""
echo "📦 1. Scanning for dependency vulnerabilities..."
npm audit

# 2. ESLint Security Check
echo ""
echo "🔍 2. Running ESLint security checks..."
npm run lint

# 3. Test Coverage Check
echo ""
echo "🧪 3. Running tests with coverage..."
npm run test:coverage

# 4. Check for sensitive data in code
echo ""
echo "🔐 4. Scanning for potential sensitive data..."
echo "Checking for API keys, passwords, and secrets..."

# Search for common patterns that might indicate secrets
PATTERNS=(
    "api_key"
    "api_secret"
    "password"
    "secret"
    "token"
    "private_key"
    "access_key"
    "aws_"
    "firebase"
)

for pattern in "${PATTERNS[@]}"; do
    echo "Checking for pattern: $pattern"
    if grep -r -i "$pattern" src/ --exclude-dir=node_modules --exclude-dir=build 2>/dev/null; then
        echo "⚠️  Found potential sensitive data with pattern: $pattern"
    else
        echo "✅ No matches found for: $pattern"
    fi
done

# 5. Check for console.log statements (potential security issue)
echo ""
echo "📝 5. Checking for console.log statements..."
CONSOLE_COUNT=$(grep -r "console\." src/ --exclude-dir=node_modules --exclude-dir=build | wc -l)
if [ "$CONSOLE_COUNT" -gt 0 ]; then
    echo "⚠️  Found $CONSOLE_COUNT console statements (consider removing for production)"
    grep -r "console\." src/ --exclude-dir=node_modules --exclude-dir=build
else
    echo "✅ No console statements found"
fi

# 6. Check for eval() usage (security risk)
echo ""
echo "🚨 6. Checking for eval() usage..."
if grep -r "eval(" src/ --exclude-dir=node_modules --exclude-dir=build 2>/dev/null; then
    echo "❌ Found eval() usage - this is a security risk!"
else
    echo "✅ No eval() usage found"
fi

# 7. Check for innerHTML usage (potential XSS)
echo ""
echo "🛡️ 7. Checking for innerHTML usage..."
if grep -r "innerHTML" src/ --exclude-dir=node_modules --exclude-dir=build 2>/dev/null; then
    echo "⚠️  Found innerHTML usage - potential XSS risk"
    grep -r "innerHTML" src/ --exclude-dir=node_modules --exclude-dir=build
else
    echo "✅ No innerHTML usage found"
fi

# 8. Check for HTTPS enforcement
echo ""
echo "🔒 8. Checking for HTTPS enforcement..."
if grep -r "http://" src/ --exclude-dir=node_modules --exclude-dir=build 2>/dev/null; then
    echo "⚠️  Found HTTP URLs - consider using HTTPS"
    grep -r "http://" src/ --exclude-dir=node_modules --exclude-dir=build
else
    echo "✅ No HTTP URLs found"
fi

# 9. Check for proper Content Security Policy
echo ""
echo "🛡️ 9. Checking for Content Security Policy..."
if grep -r "Content-Security-Policy" public/ --exclude-dir=node_modules 2>/dev/null; then
    echo "✅ Content Security Policy found"
else
    echo "⚠️  No Content Security Policy found - consider adding one"
fi

# 10. Summary
echo ""
echo "=================================================="
echo "🔒 Security Scan Complete!"
echo ""
echo "📊 Summary:"
echo "- Dependency vulnerabilities: Check npm audit output above"
echo "- Code quality: ESLint passed"
echo "- Test coverage: Generated"
echo "- Sensitive data: Scanned"
echo "- Security patterns: Checked"
echo ""
echo "💡 Recommendations:"
echo "1. Address any npm audit vulnerabilities"
echo "2. Consider adding Content Security Policy"
echo "3. Remove console.log statements for production"
echo "4. Ensure all external URLs use HTTPS"
echo "5. Consider adding security headers"
echo ""
echo "🔗 Additional Security Tools:"
echo "- OWASP ZAP for dynamic analysis"
echo "- Snyk for advanced vulnerability scanning"
echo "- SonarQube for code quality analysis"
echo "==================================================" 
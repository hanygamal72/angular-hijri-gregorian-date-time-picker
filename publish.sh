#!/bin/bash

# Publishing Script for angular-hijri-gregorian-date-time-picker
# This script automates the build and publish process

set -e  # Exit on error

echo "🚀 Starting publish process for angular-hijri-gregorian-date-time-picker"
echo "================================================================"
echo ""

# Check if user is logged in to npm
echo "📝 Checking npm authentication..."
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ You are not logged in to npm"
    echo "Please run: npm login"
    exit 1
fi

NPM_USER=$(npm whoami)
echo "✅ Logged in as: $NPM_USER"
echo ""

# Get current version from package.json
CURRENT_VERSION=$(node -p "require('./projects/hijri-gregorian-datepicker/package.json').version")
echo "📦 Current version: $CURRENT_VERSION"
echo ""

# Confirmation
read -p "Do you want to publish version $CURRENT_VERSION? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Publish cancelled"
    exit 1
fi

# Clean previous build
echo "🧹 Cleaning previous builds..."
rm -rf dist/hijri-gregorian-datepicker
echo "✅ Clean complete"
echo ""

# Build the library
echo "🔨 Building library..."
npm run build:lib

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi
echo "✅ Build complete"
echo ""

# Navigate to dist folder
cd dist/hijri-gregorian-datepicker

# Show what will be published
echo "📋 Package contents:"
ls -la
echo ""

# Dry run to show what will be included
echo "📦 Running dry-run to verify package contents..."
npm pack --dry-run
echo ""

# Final confirmation
read -p "Everything looks good? Proceed with publishing? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Publish cancelled"
    exit 1
fi

# Publish to npm
echo "📤 Publishing to npm..."
npm publish --access public

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully published version $CURRENT_VERSION!"
    echo ""
    echo "🎉 Package is now live at:"
    echo "   https://www.npmjs.com/package/angular-hijri-gregorian-date-time-picker"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Create a git tag: git tag v$CURRENT_VERSION"
    echo "   2. Push the tag: git push origin v$CURRENT_VERSION"
    echo "   3. Create a GitHub release"
    echo ""
else
    echo "❌ Publish failed"
    exit 1
fi

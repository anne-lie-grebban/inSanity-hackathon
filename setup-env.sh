#!/bin/bash

# Setup script for inSanity monorepo
# Creates .env files from .env.example if they don't already exist

set -e

echo "🚀 Setting up environment variables for inSanity monorepo..."
echo ""

# Function to create .env from .env.example
setup_env() {
  local app_name=$1
  local app_path=$2
  
  if [ ! -f "$app_path/.env" ]; then
    if [ -f "$app_path/.env.example" ]; then
      cp "$app_path/.env.example" "$app_path/.env"
      echo "✅ Created $app_name/.env from .env.example"
      echo "   ⚠️  Please edit $app_name/.env and add your actual values!"
    else
      echo "❌ $app_name/.env.example not found"
      return 1
    fi
  else
    echo "ℹ️  $app_name/.env already exists, skipping"
  fi
}

# Setup Studio
setup_env "Studio" "apps/studio"

# Setup Web
setup_env "Web" "apps/web"

echo ""
echo "✨ Environment setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Edit apps/studio/.env and add your SANITY_STUDIO_PROJECT_ID"
echo "   2. Edit apps/web/.env and add your REACT_APP_SANITY_PROJECT_ID"
echo "   3. Run 'pnpm install' to install dependencies"
echo "   4. Run 'pnpm dev' to start development servers"
echo ""


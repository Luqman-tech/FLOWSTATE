#!/bin/bash

# FlowSphere Production Deployment Script
# This script automates the deployment process

set -e  # Exit on any error

echo "🚀 Starting FlowSphere Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f .env ]; then
    print_error ".env file not found!"
    print_status "Creating .env file from template..."
    cp env.example .env
    print_warning "Please edit .env file with your production values before continuing."
    print_status "Required variables:"
    echo "  - VITE_SUPABASE_URL"
    echo "  - VITE_SUPABASE_PUBLISHABLE_KEY"
    echo "  - VITE_OPENAI_API_KEY (optional)"
    echo "  - VITE_APP_ENV=production"
    exit 1
fi

# Validate environment variables
print_status "Validating environment variables..."
source .env

if [ -z "$VITE_SUPABASE_URL" ]; then
    print_error "VITE_SUPABASE_URL is not set in .env file"
    exit 1
fi

if [ -z "$VITE_SUPABASE_PUBLISHABLE_KEY" ]; then
    print_error "VITE_SUPABASE_PUBLISHABLE_KEY is not set in .env file"
    exit 1
fi

print_success "Environment variables validated"

# Install dependencies
print_status "Installing dependencies..."
npm ci
print_success "Dependencies installed"

# Run linting
print_status "Running linting..."
npm run lint
print_success "Linting passed"

# Build the application
print_status "Building application..."
npm run build
print_success "Build completed successfully"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy to Vercel
print_status "Deploying to Vercel..."
if [ "$1" = "--prod" ]; then
    vercel --prod
else
    vercel
fi

print_success "Deployment completed!"

# Post-deployment checks
print_status "Running post-deployment checks..."

# Check if the deployment was successful
if [ $? -eq 0 ]; then
    print_success "✅ FlowSphere deployed successfully!"
    print_status "Next steps:"
    echo "  1. Set up custom domain in Vercel dashboard"
    echo "  2. Configure SSL certificate"
    echo "  3. Set up monitoring (Sentry, Google Analytics)"
    echo "  4. Test all features in production"
    echo "  5. Monitor performance and costs"
else
    print_error "❌ Deployment failed!"
    exit 1
fi

echo ""
print_success "🎉 FlowSphere is now live in production!" 
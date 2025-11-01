#!/bin/bash
# Frontend setup and startup script

echo "Setting up TweetMe Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

# Start development server
echo ""
echo "Starting React development server..."
echo "Frontend will be available at http://localhost:8080"
echo ""
echo "Note: Make sure the Django backend is running on http://localhost:8000"
echo ""
npm run build-client
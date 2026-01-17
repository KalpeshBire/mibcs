#!/bin/bash

echo "🚀 Starting MIBCS Development Servers..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

# Check if node_modules exist
if [ ! -d "node_modules" ] || [ ! -d "server/node_modules" ] || [ ! -d "client/node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm run install-all
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Starting MongoDB..."
    # Try to start MongoDB (macOS with Homebrew)
    if command -v brew &> /dev/null; then
        brew services start mongodb/brew/mongodb-community 2>/dev/null || echo "Please start MongoDB manually"
    else
        echo "Please start MongoDB manually: mongod"
    fi
fi

# Check if .env files exist
if [ ! -f "server/.env" ]; then
    echo "⚙️  Creating server/.env file..."
    cp server/.env.example server/.env
    echo "✅ Please update server/.env with your settings"
fi

if [ ! -f "client/.env" ]; then
    echo "⚙️  Creating client/.env file..."
    echo "REACT_APP_API_URL=http://localhost:5000/api" > client/.env
fi

echo "🌱 Seeding database (if needed)..."
cd server && node scripts/seedDatabase.js 2>/dev/null && cd .. || echo "Database already seeded or MongoDB not available"

echo ""
echo "🎉 Starting development servers..."
echo "   Frontend: http://localhost:3000"
echo "   Backend: http://localhost:5000"
echo "   Admin: http://localhost:3000/admin/login"
echo ""

# Start both servers
npm run dev
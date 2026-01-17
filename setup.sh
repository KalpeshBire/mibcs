#!/bin/bash

echo "🚀 Setting up MIBCS Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   You can start it with: brew services start mongodb/brew/mongodb-community"
    echo "   Or: sudo systemctl start mongod"
fi

echo "📦 Installing dependencies..."

# Install root dependencies
npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server && npm install && cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client && npm install && cd ..

# Create environment files
echo "⚙️  Setting up environment files..."

# Server .env
if [ ! -f server/.env ]; then
    cp server/.env.example server/.env
    echo "✅ Created server/.env file"
    echo "   Please update the environment variables in server/.env"
else
    echo "✅ server/.env already exists"
fi

# Client .env (optional)
if [ ! -f client/.env ]; then
    echo "REACT_APP_API_URL=http://localhost:5000/api" > client/.env
    echo "✅ Created client/.env file"
fi

echo "🌱 Seeding database with sample data..."
cd server && node scripts/seedDatabase.js && cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Update server/.env with your MongoDB URI and other settings"
echo "   2. Start the development servers:"
echo "      npm run dev"
echo ""
echo "🔐 Admin Login:"
echo "   URL: http://localhost:3000/admin/login"
echo "   Email: admin@mibcs.com"
echo "   Password: admin123"
echo ""
echo "🌐 Public Site: http://localhost:3000"
echo "🔧 API Server: http://localhost:5000"
echo ""
echo "Happy coding! 🚀"
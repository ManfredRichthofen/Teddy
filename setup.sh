#!/bin/bash

# Kill any existing PM2 processes
pm2 delete all 2>/dev/null

# Install PM2 globally if not installed
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2 globally..."
    npm install -g pm2
fi

# Install dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
npm run build
cd ..

echo "Installing backend dependencies..."
cd backend
npm install
cd ..

# Start PM2 processes
echo "Starting PM2 processes..."
pm2 start ecosystem.config.cjs

# Save PM2 process list and set up startup script
echo "Setting up PM2 startup..."
pm2 save

echo "Setup complete! The application is now running."
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:5000"
echo ""
echo "Use 'pm2 logs' to view logs" 
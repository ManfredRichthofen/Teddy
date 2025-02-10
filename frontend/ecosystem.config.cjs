module.exports = {
  apps: [
    {
      name: 'teddy-frontend',
      cwd: './frontend',
      script: './node_modules/.bin/vite',
      args: 'preview --port 5173',
      env: {
        NODE_ENV: 'production',
        PORT: 5173
      }
    },
    {
      name: 'teddy-backend',
      cwd: './backend',
      script: './server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
}; 
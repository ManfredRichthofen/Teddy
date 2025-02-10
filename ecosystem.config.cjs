const path = require('path');

module.exports = {
  apps: [
    {
      name: 'teddy-frontend',
      cwd: path.resolve(__dirname, 'frontend'),
      script: 'npm',
      args: 'run preview',
      env: {
        NODE_ENV: 'production',
        PORT: 5173
      }
    },
    {
      name: 'teddy-backend',
      cwd: path.resolve(__dirname, 'backend'),
      script: 'node',
      args: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 4092
      }
    }
  ]
}; 
module.exports = {
  apps: [
    {
      name: 'teddy-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'run preview',
      env: {
        NODE_ENV: 'production',
        PORT: 5173
      }
    },
    {
      name: 'teddy-backend',
      cwd: './backend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
}; 
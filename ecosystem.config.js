module.exports = {
  apps: [
    {
      name: 'frontend-boilerplate',
      script: 'http-server',
      args: './storybook-static -p 4999',
      watch: false,
      interpreter: 'none',
    },
  ],
};

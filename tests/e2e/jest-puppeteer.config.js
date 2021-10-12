module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
    ignoreDefaultArgs: ['--disable-extensions'],
    args: ['--no-sandbox', '--disable-gpu'],
  },
  server: {
    command: 'npm run start',
    port: 8081,
    launchTimeout: 10000,
  },
};

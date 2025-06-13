module.exports = {
  apps: [
    {
      name: "backend",
      script: "backend/server.js",
      watch: false,
      env: {
        PORT: 5000,
      },
    },
    {
      name: "ml_api",
      script: "ml_api/main.py",
      interpreter: "python3",
      watch: false,
    },
  ],
};

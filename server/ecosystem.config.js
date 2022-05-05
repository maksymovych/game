module.exports = {
  apps: [
    {
      name: "docker",
      script: "./index.js",
      watch: true,
      ignore_watch: ["node_modules", ".git", "dist"],
    },
  ],
};

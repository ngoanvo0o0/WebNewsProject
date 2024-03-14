module.exports = {
  apps: [{
    name: "Back-End",
    instances: 1,
    autorestart: true,
    script: "./dist",
  }]
}

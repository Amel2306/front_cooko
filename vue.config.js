const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  devServer: {
    proxy: {
      "/api": {
        target: "http://cookolistob.cluster-ig3.igpolytech.fr", // Remplace cette URL par l'URL de ton serveur back-end
        changeOrigin: true,
        secure: false,
      },
    },
  },
  configureWebpack: {
    devServer: {
      headers: { "Access-Control-Allow-Origin": "*" },
    },
  },
});

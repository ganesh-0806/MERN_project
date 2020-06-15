const { createProxyMiddleware } = require("http-proxy-middleware"); //Adding proxy to add domain to the relative links
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
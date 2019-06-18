const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/catalogapi", {
      target: "http://localhost:8080" /* "http://smoothit.ml" */,
      pathRewrite: {
        "^/catalogapi": ""
      },
      changeOrigin: true
    })
  );

  app.use(
    proxy("/orderapi", {
      target: "http://ngsuveülikool2019shoppinglistapi.azurewebsites.net",
      pathRewrite: {
        "^/orderapi": ""
      },
      changeOrigin: true
    })
  );
};

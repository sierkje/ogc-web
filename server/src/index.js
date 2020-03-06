"use strict";
exports.__esModule = true;
var apollo_server_express_1 = require("apollo-server-express");
var express_1 = require("express");
var api_1 = require("./lib/middleware/api");
var app = express_1["default"]();
var apiServer = new apollo_server_express_1.ApolloServer({});
app.use(api_1["default"](app, apiServer, '/api'));
var server = app.listen();
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function () { return server.close(); });
}

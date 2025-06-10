const http = require("http");

const routes = require('./routes')


console.log(routes.someText); // Accessing the exported variable from routes.js
const server = http.createServer(routes.handler)

server.listen(3000);

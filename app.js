
const express = require("express");

const app = express();

app.use('/', req, res, next => {
    console.log("This always runs !");
    next(); // Passes control to the next middleware
})

app.use('/add-products',(req, res, next) => {
    console.log("Ending request processing...");
    res.send("<h1>The 'Add Product Page'</h1>");
 
  });

app.use('/',(req, res, next) => {
  console.log("Ending request processing...");
  res.send("<h1>Goodbye from Express!</h1>");
  next(); // Sends a response to the client
});

app.listen(3000);

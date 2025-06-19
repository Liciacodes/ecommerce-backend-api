const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const app = express();

// Set up Handlebars view engine

app.set("view engine", "ejs");
app.set("views", "views");

// Route imports
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
const errorController = require("./controllers/error");

// Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// 404 handler
app.use(errorController.get404);

// Start server
app.listen(3000);

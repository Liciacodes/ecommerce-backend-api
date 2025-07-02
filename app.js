const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

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

// Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// 404 handler
app.use(errorController.get404);

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// Start server

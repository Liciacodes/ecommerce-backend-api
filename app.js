const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect

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

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  next()
})

// Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// 404 handler
app.use(errorController.get404);

mongoConnect(() => {
  app.listen(3000)
})


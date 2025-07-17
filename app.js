const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

// const User = require("./models/user");

const app = express();

// Set up Handlebars view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Route imports
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { default: mongoose } = require("mongoose");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById("686f788ab85d62274aabae7a")
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => {
//       console.log(err);
//       next();
//     });
// });

// Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// 404 handler
app.use(errorController.get404);

mongoose
  .connect("mongodb+srv://felz:udosenfelicia@cluster0.bqgm6cv.mongodb.net/shop")
  .then(result => {
    app.listen(3000)
  })
  .catch(err => {
    console.log(err)
  });

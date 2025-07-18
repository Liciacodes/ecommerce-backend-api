const path = require("path");

const express = require("express");

const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const User = require("./models/user");

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

app.use((req, res, next) => {
  User.findById("687a0a7b4cec5b888e70c4fd")
    .then((user) => {
      req.user = user
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

// Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// 404 handler
app.use(errorController.get404);

mongoose
  .connect("mongodb+srv://felz:udosenfelicia@cluster0.bqgm6cv.mongodb.net/shop")
  .then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Felz',
        email: 'felz@test.com',
        cart: {
          items: []
        }
      })
      user.save()
    }
  })

    app.listen(3000)
  })
  .catch(err => {
    console.log(err)
  });

const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const app = express();

// Set up Handlebars view engine

app.set("view engine", "ejs");
app.set("views", "views");

// Route imports
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/admin", adminData.routes);
app.use(shopRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

// Start server
app.listen(3000);

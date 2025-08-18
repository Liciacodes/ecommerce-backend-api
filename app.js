
require('dotenv').config()
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const User = require("./models/user");

// Route imports
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require('csurf')
const flash = require('connect-flash')
const cookieParser = require("cookie-parser");
const multer = require('multer')



const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collections: "sessions",
});
const csrfProtection = csrf()

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images')
  },
  filename: (req, file, cb) => {
     cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    // cb(null, new Date().toISOString() + '-' + file.originalname)
  }
})


const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Set up Handlebars view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));
app.use(cookieParser());
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection)
app.use(flash())

app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});



app.use((req,res, next) => {
  // throw new Error('Sync Dummy')
  if (!req.session.user || !req.session.user._id) {
    return next()
  }
  User.findById(req.session.user._id)
    .then(user => {
   
      if(!user) {
        return next()
      }
     req.user = user;
     next();
    })
  
  .catch(err => {
    next(new Error(err))
  })
})




// Routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500)


// 404 handler
app.use(errorController.get404)


app.use((error, req, res, next) => {
  console.log(error)
  // res.redirect('/500')
   res.status(500).render('500',{
     pageTitle: "Error!",
      path: "/500",
      isAuthenticated:  req.session ? req.session.isLoggedIn : false
     
  })
})

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

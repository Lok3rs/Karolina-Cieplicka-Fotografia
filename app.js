// DECLARING REQUIRES AND CONSTANTS
const methodOverride = require("method-override"),
  sanitizer = require("express-sanitizer"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  express = require("express"),
  flash = require("connect-flash"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");

const Blog = require("./models/blog"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  Contact = require("./models/contact"),
  Gallery = require("./models/gallery");

const indexRoutes = require("./routes/index"),
  blogRoutes = require("./routes/blog"),
  commentRoutes = require("./routes/comment"),
  contactRoutes = require("./routes/contact"),
  galleryRoutes = require("./routes/gallery"),
  fotoRoutes = require("./routes/foto");

const app = express();

// SETTING APLICATION
mongoose
  .connect(
    "mongodb+srv://Lok3rs:z3xjek39@cluster0-q5ytv.mongodb.net/karolina?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("DB Connected!"))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });
mongoose.set("useFindAndModify", false);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(sanitizer());
app.use(methodOverride("_method"));
app.use(flash());
app.use(
  require("express-session")({
    secret: "Fafik is the best dog in the world",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// providing current logged (or not) user to every each page as a middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// ROUTES
app.use("/", indexRoutes);
app.use("/blog", blogRoutes);
app.use("/blog/:id/comment", commentRoutes);
app.use("/contact/", contactRoutes);
app.use("/gallery/", galleryRoutes);
app.use("/gallery/:id/foto", fotoRoutes);

// Listening

app.listen(3000, () => {
  console.log("App listening at port 3000");
});

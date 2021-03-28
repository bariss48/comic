const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');
// routers import
const Comic = require('./models/comic');
const Comment = require('./models/comment');
const comicRoutes = require('./routes/comics');
const commentRoutes = require('./routes/comments');
const mainRoutes = require('./routes/main');
const User = require('./models/user');
const authRoutes = require("./routes/auth");
//npm paketleri import
const methodOverride = require('method-override');
var morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
const seed = require('./utils/seed');
const flash = require('connect-flash');
seed();
const { getMaxListeners } = require('./models/comic');
const cookieParser = require('cookie-parser');

mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
mongoose.Promise = global.Promise;

console.log(config.db.username);
app.set("view engine","ejs");
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(cookieParser());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use((req,res,next) => {
    res.locals.user = req.user;
    next();
});
app.use(flash());
app.use("/",mainRoutes);
app.use("/",authRoutes);
app.use("/comics",comicRoutes);
app.use("/comics/:id/comments",commentRoutes);
app.use(morgan('tiny'));
app.use(expressSession({
    secret:"asdhasdasldaslkjasdhasjdhasljdasdhjaskdljaslasjdjlasdjasdjlasldasldhjas",
    resave: false,
    saveUninitialized: false
    // using store session on MongoDB using express-session + connect
}));
/*
app.use(expressSession({
	secret: process.env.ES_SECRET || config.expressSession.secret,
	resave: false,
	saveUninitialized: false
}))
*/
app.listen(3000,() =>    {
    console.log("yelp clone active...")
})

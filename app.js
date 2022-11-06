const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const ExpressError = require('./utils/ExpressError');
const Project = require('./models/project');
const Product = require('./models/product');
const Location = require('./models/location');
const Admin = require('./models/admin');

const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/tineretHack');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB!');
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session Configuration
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// Routes
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use('/', loginRoutes);
app.use('/admin', adminRoutes);

app.get('/', async (req, res) => {
    const locations = await Location.find({});

    res.render('index', { locations });
});

app.get('/location/:localitate', async (req, res) => {
    const currentLocation = await Location.find({ name: req.params.localitate });
    const projects = await Project.find({ location: req.params.localitate });
    res.render('localitate', { currentLocation, projects });
});

app.get('/location/:localitate/:id', async (req, res) => {
    const currentLocation = await Location.find({ name: req.params.localitate });
    const project = await Project.findById(req.params.id);
    console.log(project);
    res.render('projectInfo', { currentLocation, project });
});

app.get('/admin', async (req, res) => {
    res.render('admin');
});

app.use('/uploads', express.static('uploads'))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something Went Wrong!';
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});
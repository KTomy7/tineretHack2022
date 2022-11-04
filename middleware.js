module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log('You need to be signed in first!');
        return res.redirect('/login');
    }
    next();
}

// if you want to use the middleware in a route, you can use it as a second argument in the route
// const { isLoggedIn } = require('../middleware');
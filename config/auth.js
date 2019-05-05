'use strict'
module.exports={
    ensureAuthenticated: function (req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect('/users/login');
        console.log('User must be logged in first');
    }
}
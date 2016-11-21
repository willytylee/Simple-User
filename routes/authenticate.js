var express = require('express');
var router = express.Router();

module.exports = function(passport){

    //sends successful login state back to angular
    router.get('/login_success', function(req, res){
        res.send({state: 'success', user: req.user ? req.user : null});
    });

    //sends failure login state back to angular
    router.get('/login_failure', function(req, res){
        res.send({state: 'failure', user: null, message: "Invalid username or password"});
    });

    //sends successful login state back to angular
    router.get('/signup_success', function(req, res){
        res.send({state: 'success', user: req.user ? req.user : null, message: "register successful"});
    });

    router.get('/signup_failure', function(req, res){
        res.send({state: 'failure', user: null, message: "Existing Username"});
    });

    //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/login_success',
        failureRedirect: '/auth/login_failure'
    }));

    //sign up
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/signup_success',
        failureRedirect: '/auth/signup_failure'
    }));

    //log out
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;

}
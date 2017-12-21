const  FacebookStrategy = require('passport-facebook').Strategy;
const  User             = require('../models/user');
const  session = require('express-session');
const  config   = require('../config/database');
const  jwt  = require('jsonwebtoken');

module.exports = (app , passport ) => {

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({secret: config.sercret, resave: false, saveUninitialized: true, cookie: { secure: false }}));

    passport.serializeUser(function(user, done) {
        console.log('testing serialize user  : '+user);
        //token =  jwt.sign({userID:user._id} , config.sercret , {expiresIn:'24h'} );
         token =  jwt.sign({username:user.username , email:user.email } , config.sercret , {expiresIn:'24h'} );
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new FacebookStrategy({
            clientID: '635788116591482',
            clientSecret: 'b6c7e5c1b420a614ae22d1563c034c42',
            callbackURL: "http://localhost:1212/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function(accessToken, refreshToken, profile, done) {
           // console.log(profile._json.email);
          // User.findOne({ email: profile._json.email }).select('username  email password ').exec( (err , user)=>{
          //    if(err) return done(err);
          //
          //    if(user && user != null){
          //        return done(null , user)
          //    }else {
          //        return done(err);
          //    }
          // });
            done (null ,  profile); // ager koi error nhe hai to profile do
        }
    ));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }) ,(req ,res)=>{
        res.redirect('/facebook/'+token);
    });

    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));



    return passport;
}
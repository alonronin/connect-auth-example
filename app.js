/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    auth = require('connect-auth'),
    MongoStore = require('connect-mongo');


var app = module.exports = express.createServer();

// Configuration

app.configure(function () {
    app.use(require('stylus').middleware({ src:__dirname + '/public' }));
    app.use(express.static(__dirname + '/public'));

    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');

    app.set('facebook', {
        appId: '',
        appSecret: '',
        callback: ''
    });

    app.set('twitter', {
        consumerKey: '',
        consumerSecret: ''
    });


    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    app.use(express.session({
        secret:'qwerty',
        store: new MongoStore({ db: 'auth' })
    }));

    app.use(auth({
            strategies : [
                auth.Facebook(app.setting.facebook),
                auth.Twitter(app.settings.twitter)
            ],
            trace: true,
            logoutHandler: require('connect-auth/lib/events').redirectOnLogout("/")
        })
    );

    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions:true, showStack:true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
    if(req.isAuthenticated()){
        res.send(req.session.auth.user);
    }else{
        res.send('false');
    }
});

app.get('/logout', function(req, res){
    req.logout();
});

app.get('/login', function(req, res){
    req.authenticate(['twitter'], function(error, authenticated){
        console.log(arguments);

        if( error ) {
            // Something has gone awry, behave as you wish.
            console.log( error );
            res.end();
        }
        else {
            if( authenticated === undefined ) {
                // The authentication strategy requires some more browser interaction, suggest you do nothing here!
            }
            else {
                console.log(arguments);
                // We've either failed to authenticate, or succeeded (req.isAuthenticated() will confirm, as will the value of the received argument)
                //next();
                res.redirect('/');
            }
        }});
});

app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

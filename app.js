var express = require("express"),
    app = express(),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    mongoose = require("mongoose"),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    cookieParser = require("cookie-parser");

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/app'));


passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ 'username' : username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false);
            }
            if (!user.validPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(session({
    secret : "bsuschedule",
    resave: true,
    saveUninitialized: true,
    cookie : { maxAge: 2419200000 },
    unset: 'destroy'
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

var User;
var server = app.listen(8000, function () {

	mongoose.connect('mongodb://anton.abramovich:9875321Velvifoz@ds055690.mongolab.com:55690/users');
    var db = mongoose.connection;

    db.once('open', function () {

        var userSchema = mongoose.Schema({
            username: String,
            password: String
        });

        userSchema.methods.validPassword = function (password) {
            return this.password == password;
        };

        User = db.model("User", userSchema);

        console.log("Mongo is ok");

    });

	var host = server.address().address,
  		port = server.address().port;

  	console.log('App listening at http://%s:%s', host, port);

});

app.post("/login", passport.authenticate('local'), function (req, res) {
    res.json({
        authenticated: !!req.user
    });
});

app.get("/login", passport.authenticate('session'), function (req, res) {
    res.json({
        authenticated: !!req.user
    });
});

app.get("/logout", function (req, res) {
    req.session.destroy(function () {
        res.end();
    });
});

app.post("/checkUsername", function (req, res) {
    var username = req.body.username;
    User.find({ 'username' : username }, function (err, user) {
        if (err) { res.status(500).end(); }
        res.json({
            error: !user
        });
    });
});

app.post("/register", function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    var user = new User({
        username: username,
        password: password
    });

    user.save(function (err, user) {
        if (err) { res.status(500).end(); }
        passport.authenticate('local', function (err, user) {
            res.json({
                authenticated: !!user
            });
        });
    });
});
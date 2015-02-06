var express = require("express"),
    app = express(),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    mongoose = require("mongoose"),
    session = require("express-session"),
    bodyParser = require("body-parser");

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/app'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(session({
    secret : "bsu schedule",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.session()); // persistent login sessions

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

var User;
var server = app.listen(8080, function () {

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
  		port = server.address().port

  	console.log('App listening at http://%s:%s', host, port);

});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ 'username' : username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user, { message: 'Success.' });
        });
    }
));

app.post("/login", function (req, res) {
    passport.authenticate('local', function(err, user, info) {
        res.json({
            authenticated: !!user,
            message: info.message
        });
    })(req, res);
});

app.post("/checkUsername", function (req, res) {
    var username = req.query.username;
    User.find({ 'username' : username }, function (err, user) {
        if (err) { res.status(500).end(); }
        res.json({
            error: !!user
        });
    });
});

app.post("/register", function (req, res) {
    var username = req.query.username,
        password = req.query.password;

    var user = new User({
        username: username,
        password: password
    });

    user.save(function (err, user) {
        if (err) { res.end(); }
        res.send("Ok");
    });
});
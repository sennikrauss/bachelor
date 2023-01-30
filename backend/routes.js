const session = require("express-session");
const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    CALLBACK_URI
} = require("./credentials");
const authenticationKey = require("./middleware");

module.exports = app => {
    const country = require("./controllers/countries.controller");
    const user = require("./controllers/users.controller");

    const passport = require("passport");

    app.use(session({secret: 'cats'}))
    app.use(passport.initialize());
    app.use(passport.session())

    const GoogleStrategy = require("passport-google-oauth20").Strategy;

    passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: CALLBACK_URI,
            passReqToCallback: true
        },
        function (request, accessToken, refreshToken, profile, done) {
            return done(null, profile)
        })
    )

    function isLoggedIn(req, res, next) {
        req.user ? next() : res.send('<a href="/auth/google">Authenticate with Google</a>');
    }

    passport.serializeUser(function (user, done) {
        done(null, user);
    })

    passport.deserializeUser(function (user, done) {
        done(null, user);
    })

    //protect API with api-key
    app.get("/users", authenticationKey, user.findAll)

    //protect API with Google OAUTH2 API
    app.get("/countries", isLoggedIn, country.findAll);

    // localhost:XXXX/countries/Africa
    app.get("/countries/:id", isLoggedIn, country.findByParam);

    app.get("/auth/google",
        passport.authenticate('google', {scope: ['email', "profile"]})
    )

    app.get("/google/callback",
        passport.authenticate("google", {
            successRedirect: "/countries",
            failureRedirect: "/auth/failure"
        })
    )

    app.get('/logout', function(req, res, next){
        req.logout(function(err) {
            if (err) { return next(err); }
            req.session.destroy();
            res.redirect('/');
        });
    });
    app.get("/auth/failure", (req, res) => {
        res.send("something went wrong");
    })
}

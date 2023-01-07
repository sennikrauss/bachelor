const session = require("express-session");
const CALLBACK_URI = "http://localhost:3001/google/callback";
const apiKey = require("./db.config").APIKEY;
const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} = require("./credentials");
const country = require("./controllers/countries.controller");

module .exports = app => {
    const country = require("./controllers/countries.controller");

    const authenticateKey = (req, response, next) => {
        let api_key = req.header("x-api-key");
        if (api_key === apiKey) {
            next();
        } else {
            response.status(403).send({error: {code: 403, message: "You not allowed."}});
        }
    }

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
        }))

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
    /*app.get("/protected", authenticateKey, (req, res) => {
        res.send(`Hello ${req.user.displayName}`);
    })*/

    //protect API with Google OAUTH2 API
    app.get("/countries", isLoggedIn, country.findAll);

    app.get("/auth/google",
        passport.authenticate('google', {scope: ['email', "profile"]})
    )

    app.get("/google/callback",
        passport.authenticate("google", {
            successRedirect: "/countries",
            failureRedirect: "/auth/failure"
        })
    )

    app.get("/logout", (req, res, next) => {
        req.logout(req.user, err => {
            if(err) return next(err);
            req.session.destroy();
            res.redirect("/");
            //res.send("Goodbye!");
        });
    });

    app.get("/auth/failure", (req, res) => {
        res.send("something went wrong");
    })
}

const session = require("express-session");
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const user = require("./controllers/users.controller");
const {isLoggedIn, getAccessToken, fetchGitHubUser, authenticationKey} = require("./middleware");

const GITHUB_AUTH_URL = "https://github.com/login/oauth/authorize";

const app = express();
app.use(express.static("public"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));

app.get('/', function(req, res){
    res.render('layout', { user: req.session.github });
});

//protect API with api-key
app.get("/users", authenticationKey, user.findAll)

//protect API with oauth2
app.get('/account', isLoggedIn, function(req, res){
    res.render('account', { user: req.session.github });
});

app.get('/login', function(req, res){
    res.render('login', { user: req.session });
});

app.get("/auth/github",function (req, res){
    res.redirect(
        `${GITHUB_AUTH_URL}?client_id=${process.env.GITHUB_CLIENT_ID}&scope=email%20profile`
    )
})

app.get("/github/callback", async (req, res) => {
        const code = req.query.code;
        const access_token = await getAccessToken(code, process.env.GITHUB_CLIENT_ID, process.env.GITHUB_CLIENT_SECRET);
        req.session.token = access_token;
        const user = await fetchGitHubUser(access_token);

        if (user) {
            req.session.access_token = access_token;
            req.session.github = user;
            req.session.loggedIn = true;
            res.redirect("/");
        } else {
            res.redirect("/auth/failure");
        }
    }
)

app.get("/logout", (req, res) => {
    req.session.destroy(function() {
        res.redirect('/');
    })
})
app.get("/auth/failure", (req, res) => {
    res.send("Login did not succeed!");
})

module.exports = app;

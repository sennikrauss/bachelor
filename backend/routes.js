const sql = require("./db");
const apiKey = require("./db.config").APIKEY;
module.exports = app => {
    const user = require("./controllers/users.controller");
    const country = require("./controllers/countries.controller");

    const authenticateKey = (req, response, next) => {
        let api_key = req.header("x-api-key");
        if (api_key === api_key) {
            next();
        }else {
            response.status(403).send({ error: { code: 403, message: "You not allowed." } });
        }
        /*sql.query(`SELECT * FROM users WHERE apikey = '${api_key}'`, (err, res) => {
            if (res.length) {
               next();
            }else {
                response.status(403).send({ error: { code: 403, message: "You not allowed." } });
            }
        });*/
    }

    app.post("/user", authenticateKey, user.create);

    app.get("/users", authenticateKey, user.findAll);

    app.get("/user/:id", authenticateKey, user.findOne);

    app.put("/user/:id", authenticateKey, user.update);

    app.delete("/user/:id", authenticateKey, user.delete);

    app.get("/countries", authenticateKey, country.findAll);
};

const {APIKEY} = require("./credentials");

const authenticationKey = (req, response, next) => {
    let api_key = req.header("x-api-key");
    if (api_key === APIKEY) {
        next();
    } else {
        response.status(403).send({error: {code: 403, message: "You not allowed."}});
    }
}
module.exports = authenticationKey;

const express = require("express");
const app = express();

// simple route
/*app.get("/", (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>')
});*/

app.get("/", (req, res) => {
    res.send('<a href="/auth/github">Authenticate with Github</a>')
});

require("./routes")(app);

app.listen(3001, () => {
    console.log("Server is running on port 3001.");
});

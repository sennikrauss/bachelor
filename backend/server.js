const express = require("express");
/*const cors = require('cors');
const bodyParser = require("body-parser");*/

const app = express();

// simple route
app.get("/", (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>')
});

require("./routes")(app);

// set port, listen for requests
app.listen(3001, () => {
    console.log("Server is running on port 3001.");
});

const sql = require("../db");

const Country = function (country){
    this.code = country.code;
    this.name = country.name;
}

Country.getAll = result => {
    sql.query("SELECT * FROM countries_en", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("countries: ", res);
        result(null, res);
    });
};
Country.findByParam = (param, result) => {
    sql.query(`SELECT * FROM countries_en WHERE continent = '${param}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("countries: ", res);
        result(null, res);
    });
};

module.exports = Country;

const Country = require("../models/countries.model");
exports.findAll = (req, res) => {
    Country.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving article."
            });
        else res.send(data);
    });
};

exports.findByParam = (req, res) => {
    Country.findByParam(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving article."
            });
        else res.send(data);
    });
}

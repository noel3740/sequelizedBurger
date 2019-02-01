//Add dependencies
const db = require("../models");

//Create all the routes and setup logic withiin each route
module.exports = (app) => {
    app
        .get("/api/burgers", (req, res) => {
            db.Burger.findAll({
                include: [db.Customer]
            })
                .then(results => {
                    res.json(results);
                });
        })
        .post("/api/burgers", (req, res) => {
            db.Burger
                .create({
                    burger_name: req.body.burger_name,
                    devoured: req.body.devoured
                })
                .then(result => {
                    res.json(result.dataValues.id);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send("Failed saving burger to database");
                });
        })
        .put("/api/burgers/:id", (req, res) => {
            const updatedBurger = {
                devoured: req.body.devoured,
                CustomerId: req.body.CustomerId
            };

            const query = {
                where: {
                    id: req.params.id
                }
            };

            db.Burger.update(updatedBurger, query)
                .then(result => {
                    if (result[0] <= 0) {
                        res.status(404).send("No rows found to update!").end()
                    } else {
                        res.status(200).end();
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send("Failed updating burger in database");
                });
        });
}
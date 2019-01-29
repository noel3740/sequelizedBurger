//Add dependencies
const express = require("express");
const db = require("../models");

//Initialize the express router
const router = express.Router();

//Create all the routs and setup logic withiin each route
router
    .get("/", (req, res) => {
        db.Burger.findAll()
            .then(results => {
                const burgerObject = {
                    burgers: results
                };
                res.render("index", burgerObject);
            });
    })
    .get("/api/burgers", (req, res) => {
        db.Burger.findAll()
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
        db.Burger
            .update({
                devoured: req.body.devoured
            }, {
                    where: {
                        id: req.params.id
                    }
                })
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

module.exports = router;
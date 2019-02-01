//Add dependencies
const db = require("../models");

//Create all the routes and setup logic withiin each route
module.exports = (app) => {
    app
        .get("/api/burgers", (req, res) => {
            //Find all burgers in the db and left join 
            //the customers associated with the burger
            //Return the results in JSON
            db.Burger.findAll({
                include: [db.Customer]
            })
                .then(results => {
                    res.json(results);
                });
        })
        .post("/api/burgers", (req, res) => {
            //Create the burger in the db then 
            //return the new burger id in JSON format.
            //If there is an error then send a 500 error
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
            //Build burger object that represents the values we will update in the db
            const updatedBurger = {
                devoured: req.body.devoured,
                CustomerId: req.body.CustomerId
            };

            //Build the query object used in the sequelize update
            const query = {
                where: {
                    id: req.params.id
                }
            };

            //Update the burger in the db using the updated burger and query objects
            db.Burger.update(updatedBurger, query)
                .then(result => {
                    //If index 0 of the result object is 0 or less (no rows updated) 
                    //then return a 404 status else return a 200/success status
                    if (result[0] <= 0) {
                        res.status(404).send("No rows found to update!").end()
                    } else {
                        res.status(200).end();
                    }
                })
                .catch(err => {
                    //Log the error in the node console and return a 500 status
                    console.log(err);
                    res.status(500).send("Failed updating burger in database");
                });
        });
}
//Add dependencies
const db = require("../models");

//Create all the routes and setup logic withiin each route
module.exports = (app) => {
    app
        .get("/api/customers", (req, res) => {
            //Find all customers in the db and left join the burgers associated with the customer
            //Return results in JSON
            db.Customer.findAll({
                include: [db.Burger]
            })
                .then(results => {
                    res.json(results);
                });
        })
        .post("/api/customers", (req, res) => {

            const customerName = req.body.customer_name.trim();

            //If customer name doesn't exists in customers table then create it otherwise return the existing customer
            db.Customer.findOrCreate({
                where: {
                    customer_name: customerName
                },
                // set the default properties if it doesn't exist
                defaults: {
                    customer_name: customerName
                }
            })
                .then(function (result) {
                    res.json(result[0].id);
                })
                .catch(err => {
                    //If there is an error then log the error in the node console
                    //and return a 500 status
                    console.log(err);
                    res.status(500).send("Failed saving customer to database");
                });
        })
        .put("/api/customers/:id", (req, res) => {

            //Create an object that represents the customer object we will update in the db
            const updatedCustomer = {
                customer_name: req.body.customer_name
            };

            //Build the query object used in the sequelize update
            const query = {
                where: {
                    id: req.params.id
                }
            };

            //Update the customer in the db using the updated customer and query objects
            db.Customer.update(updatedCustomer, query)
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
                    res.status(500).send("Failed updating customer in database");
                });
        });
}
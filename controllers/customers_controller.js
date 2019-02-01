//Add dependencies
const db = require("../models");

//Create all the routes and setup logic withiin each route
module.exports = (app) => {
    app
        .get("/api/customers", (req, res) => {
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
                    console.log(err);
                    res.status(500).send("Failed saving customer to database");
                });
        })
        .put("/api/customers/:id", (req, res) => {
            const updatedCustomer = {
                customer_name: req.body.customer_name
            };

            const query = {
                where: {
                    id: req.params.id
                }
            };

            db.Customer.update(updatedCustomer, query)
                .then(result => {
                    if (result[0] <= 0) {
                        res.status(404).send("No rows found to update!").end()
                    } else {
                        res.status(200).end();
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send("Failed updating customer in database");
                });
        });
}
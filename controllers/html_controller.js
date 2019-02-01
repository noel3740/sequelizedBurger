//Add dependencies
const db = require("../models");

//Create all the routes and setup logic withiin each route
module.exports = (app) => {
    app
        //Get all the burgers in the db and then
        //render the default page using handlebars
        .get("/", (req, res) => {
            db.Burger.findAll({
                include: [db.Customer]
            })
                .then(results => {
                    console.log(results);
                    const burgerObject = {
                        burgers: results
                    };
                    res.render("index", burgerObject);
                });
        });
}
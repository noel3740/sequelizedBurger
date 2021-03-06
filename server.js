//Add dependencies
require('dotenv').config();
const express = require("express");
const exphbs = require("express-handlebars");
const db = require('./models');

//Set port server will be listing on
const PORT = process.env.PORT || 8080;

//Initialize the express app
const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set handlebars as the view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//require express routes
require("./controllers/burgers_controller")(app);
require("./controllers/customers_controller")(app);
require("./controllers/html_controller")(app);

// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(() => {
  app.listen(PORT, function () {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
});

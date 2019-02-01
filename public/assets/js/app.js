$(document).ready(() => {
    $("#addBurgerForm").on("submit", function (event) {
        //Prevent the screen from being refreshed on submit
        event.preventDefault();

        //Check for errors in required fields and prevent post to API if there are errors. 
        if (this.checkValidity()) {
            //Create a new burger object
            var newBurger = {
                burger_name: this.burgerName.value.trim(),
                devoured: 0
            };

            //Send an ajax post request to create the new burger
            $.ajax("/api/burgers", {
                type: "POST",
                data: newBurger
            }).then(function () {
                console.log("Created new burger");
                //Reload the page to get the updated burger list on the screen
                location.reload();
            });
        }

        this.classList.add('was-validated');
    });

    $(".devourForm").on("submit", function (event) {
        //Prevent the screen from being refreshed on submit
        event.preventDefault();

        //Check for errors in required fields and prevent post to API if there are errors. 
        if (this.checkValidity()) {
            var id = $(this.customerName).data("burger-id");

            //Create the customer in the database
            var newCustomer = {
                customer_name: this.customerName.value.trim()
            }

            //Send the POST request to create the customer.
            $.ajax(`/api/customers`, {
                type: "POST",
                data: newCustomer
            }).then(function (customerId) {

                //Create a new burger object that only contains the devoured set to true and the customer id set to whatever customer the user entered
                var newBurgerState = {
                    devoured: 1,
                    CustomerId: customerId
                };

                //Send the PUT request.
                $.ajax(`/api/burgers/${id}`, {
                    type: "PUT",
                    data: newBurgerState
                }).then(function () {

                    //Hide burger item with animation 
                    $(event.target).parent().hide({ duration: 500, complete: () => location.reload() });
                });
            });
        }

        this.classList.add('was-validated');
    });
});
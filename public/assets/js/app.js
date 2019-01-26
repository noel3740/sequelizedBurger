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

    $(".devourButton").on("click", function (event) {
        var id = $(this).data("burger-id");

        //Create a new burger object that only contains the devoured set to true
        var newBurgerState = {
            devoured: 1
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
});
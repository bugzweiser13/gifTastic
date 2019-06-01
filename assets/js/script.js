$(document).ready(function() {

    //static button variable
    var staticButtons = ["Chevrolet",
        "Ferrari",
        "Ford",
        "Lamborghini",
        "Hyundai",
        "Dodge",
        "Pagani",
        "Bugatti",
        "Koenigsegg",
        "Buick",
        "Pontiac"
    ];

    //gif get function
    function displaySearch() {

        //gif search criteria
        $("#gif_place").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=8nHhTz9818lYcCD8PbeeT5hQA6i0q1kd";

        //giphy connection
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log(input);

            //for loop for limit of search returns and display gifs
            for (var j = 0; j < limit; j++) {

                //gif element creation and display attributes
                var displayGif = $("<div>");
                displayGif.addClass("holder");
                //giphy search image state urls / add attributes
                var image = $("<img>");
                image.attr("src", response.data[j].images.fixed_height_still.url);
                image.attr("data-still", response.data[j].images.fixed_height_still.url);
                image.attr("data-animate", response.data[j].images.fixed_height.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayGif.append(image);

                //display rating per gif
                var rating = response.data[j].rating;
                var pRating = $("<p>").text("Rating: " + rating.toUpperCase());
                displayGif.append(pRating);

                //download button
                var download = response.data[j].images.original.mp4;
                var dlBtn = $("<button>").html("<a href=" + download + ">Download</a></button>");
                displayGif.append(dlBtn);

                //append the HTML
                $("#gif_place").append(displayGif);

            }
        });
    }
    // Function for displaying gifs search buttons
    function renderButtons() {

        $("#button_display").empty();

        for (var i = 0; i < staticButtons.length; i++) {

            var newButton = $("<button>")
            newButton.attr("class", "search_btn");
            newButton.attr("id", "input")
            newButton.attr("data-name", staticButtons[i]);
            newButton.text(staticButtons[i]);
            $("#button_display").append(newButton);
        }

    }

    //show still image upon load or motion when gif clicked
    function imageChangeState() {

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

    //user input to add search buttons
    $("#submitSearch").on("click", function() {
        event.preventDefault();
        var input = $("#user-input").val().trim();
        staticButtons.push(input);
        renderButtons();

        return false;
    });

    //execution
    $(document).on("click", "#input", displaySearch);
    $(document).on("click", ".gif", imageChangeState);

    renderButtons();
});
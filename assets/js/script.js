$(document).ready(function() {

    var staticButtons = ["Corvette", "Ferrari", "Camaro", "Lamborghini"];

    function displaySearch() {

        $("#gif_place").empty();
        var input = $(this).attr("data-name");
        var limit = 50;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=8nHhTz9818lYcCD8PbeeT5hQA6i0q1kd";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            for (var j = 0; j < limit; j++) {

                var displayGif = $("<div>");
                displayGif.addClass("holder");

                var image = $("<img>");
                image.attr("src", response.data[j].images.fixed_height_still.url);
                image.attr("data-still", response.data[j].images.fixed_height_still.url);
                image.attr("data-animate", response.data[j].images.fixed_height.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayGif.append(image);

                var rating = response.data[j].rating;
                console.log(response);
                console.log("What: " + input);

                var pRating = $("<p>").text("Rating: " + rating);
                displayGif.append(pRating)

                $("#gif_place").append(displayGif);

            }
        });
    }

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

    $("#submitSearch").on("click", function() {

        var input = $("#user-input").val().trim();
        search.reset();
        staticButtons.push(input);

        renderButtons();

        return false;
    })

    renderButtons();

    $(document).on("click", "#input", displaySearch);
    $(document).on("click", ".gif", imageChangeState);

});
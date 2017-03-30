

$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {
    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();

    if ($("#verify").val() != 5) {
        $("#feedback")
            .text("NO GIFS 4 U!")
            .attr("hidden", false)
            .attr("class", "error");
            $("#verify").addClass('errorClass');
    } else {
        $("#feedback")
            .text("Loading...")
            .attr("hidden", false);
            $("#verify").removeClass('errorClass');
        // get the user's input text from the DOM
        var searchQuery = $("#search").val() 

        // configure a few parameters to attach to our request
        var params = {
            tag : "jackson+5+" + searchQuery
        };

        // make an ajax request for a random GIF
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC",
            data: params,
            dataType: "json",
            beforeSend: function(jqXHR, settings) {
                settings.url = decodeURIComponent(settings.url);
            },// attach those extra parameters onto the request
            success: function(response) {

                if (response.data.image_url) {
                    $("#feedback").attr("hidden", true);
                    $("#gif")
                        .attr("src", response.data.image_url)
                        .attr("hidden", false);
                } else {
                    $("#feedback")
                        .text("Couldn't find gif!")
                        .attr("class", "error");
                }
            },
            error: function() {
                // give the user an error message
                $("#feedback").text("Sorry, could not load GIF. Try again!");
                setGifLoadedStatus(false);
            }
        });
    }
}






/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}

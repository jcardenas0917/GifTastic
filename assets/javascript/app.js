
//Create object

var topic = {
    searches: ["will smith", "zach braff", "eminem", "jennifer lopez"],
    favorite: [],
    //Function adds the buttons in the array.
    addButton: function () {
        $("#buttons").empty();
        for (var i = 0; i < this.searches.length; i++) {
            var addButton = $("<button type = 'button' class='btn btn-primary diplayGif'></button>");
            addButton.text(this.searches[i]);
            addButton.attr("data-index", this.searches[i]);
            $("#buttons").append(addButton);
        }
    },

    //Function grabs the gif from the API properties
    addGiphy: function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var responseData = response.data[i];
            var image = responseData.images.fixed_height_small_still.url;
            var gif = responseData.images.fixed_height_small.url;
            var rating = responseData.rating;

            var gifDiv = $("<div class='gif-div'>");
            var gifImg = $("<img class='still'>");

            gifImg.attr("src", image);
            gifImg.attr("alt", "still-image");
            gifImg.attr("data-gif", gif);
            gifImg.attr("data-index", i);
            gifImg.attr("data-img", image);

            gifDiv.append("<p> Rating: " + rating + "</p>");
            gifDiv.append(gifImg);

            var divContainer = $("#container");
            divContainer.append($(gifDiv));

        }
    },

    //Makes the call to retrieve the API
    getGiphy: function (name) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=06B2Bg9ig9lL50TsmsBYrUHh1HmhT8YC&q=" + name + "&limit=25&offset=0&rating=G&lang=en";

        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(topic.addGiphy);
    },

    submitClick: function () {
        event.preventDefault();
        var userInput = $("#userInput").val();

        //this will check if the user click on submit without typing a topic to avoid empty buttons.
        if (userInput === ""){
            alert("Please type a topic first")
        }else{
        topic.searches.push(userInput);
        topic.addButton();
        $("#userInput").val("");
        }
    }
};


//-------------------------------------------------------------------------------------------------------------

//Loads page and adds the buttons in the array
window.onload = function () {
    topic.addButton();
}


//submit calls the function searchResult to add the button

$("#submit").on("click", function (event) {
    topic.submitClick()

});

$("#user").submit(function (event) {
    topic.submitClick()
});

//button click pass the index of the button clicked to getGiphy function
$(document).on("click", "button.diplayGif", function (event) {

    var currentIndex = $(this).attr("data-index");
    event.preventDefault();
    topic.getGiphy(currentIndex);
    $("#container").empty();

});

//Click toggles between GIF image and still image.
$(document).on("click", ".still", function (event) {
    event.preventDefault();
    var image = $(this).attr("data-img");
    var gif = $(this).attr("data-gif");
    topic.favorite.push(image);
    if ($(this).attr("src") === image) {
        $(this).attr("src", gif);
    } else if ($(this).attr("src") === gif) {
        $(this).attr("src", image);
    };
});




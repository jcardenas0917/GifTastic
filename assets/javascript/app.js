
//Create object

var topic = {
    searches: ["will smith", "zach braff", "eminem", "jennifer lopez"],
    favorite: [],
    //Function adds the buttons in the array.
    addButton: function () {
        for (var i = 0; i < this.searches.length; i++) {
            var buttonContainer = $("#buttons");
            var addButton = $("<button type = 'button' class='btn btn-primary diplayGif'></button>");
            addButton.text(this.searches[i]);
            addButton.attr("data-index", this.searches[i])
            console.log(this.searches[i])
            buttonContainer.append(addButton);
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

    //Function to add users input to the array of buttons
    searchResult: function () {
        var userInput = $("#userInput").val();
        console.log(userInput);
        this.searches.push(userInput);
        var newButton = $("<button type = 'button' class='btn btn-primary diplayGif'></button>").text(userInput)
        newButton.attr("data-index", userInput);
        var buttonContainer = $("#buttons");
        buttonContainer.append(newButton);
        userInput = $("#userInput").val("");
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
};


//-------------------------------------------------------------------------------------------------------------

//Loads page and adds the buttons in the array
window.onload = function () {
    topic.addButton();
}


//submit calls the function searchResult to add the button
    
$("#submit").on("click", function (event) {
    event.preventDefault();
    topic.searchResult();
    
});

$( "#user" ).submit(function( event ) {
    event.preventDefault();
    topic.searchResult();
  });

//button click pass the index of the button clicked to getGiphy function
$(document).on("click", "button.diplayGif", function () {

    console.log("clicked");
    var currentIndex = $(this).attr("data-index");
    event.preventDefault();
    topic.getGiphy(currentIndex);
    $("#container").empty();
    
});

//Click toggles between GIF image and still image.
$(document).on("click", ".still", function () {
   
    var image = $(this).attr("data-img");
    var gif = $(this).attr("data-gif");
    topic.favorite.push(image);
    console.log(topic.favorite)
    if ($(this).attr("src") === image) {
        $(this).attr("src", gif)
    } else if ($(this).attr("src") === gif) {
        $(this).attr("src", image);
    };
});




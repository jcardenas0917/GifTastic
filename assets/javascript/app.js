

var click=[];
var topic = {
    searches: ["will smith", "zach braff", "eminem", "jlo"],


    addButton: function () {
        for (var j = 0; j < this.searches.length; j++) {
            var buttonContainer = $("#buttons");
            var addButton = $("<button class='diplayGif'></button>");
            addButton.text(this.searches[j]);
            addButton.attr("data-index", this.searches[j])
            console.log(this.searches[j])
            buttonContainer.append(addButton);
        }
    },


    addGiphy: function (response) {
        console.log(response.data)
        for (var i = 0; i < response.data.length; i++) {
            var responseData = response.data[i];
            var image = responseData.images.original_still.url;
            var gif = responseData.images.original.url;
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
    searchResult: function () {
        var userInput = $("#userInput").val();
        console.log(userInput);
        this.searches.push(userInput);
        var newButton = $("<button class='diplayGif'></button>").text(userInput)
        newButton.attr("data-index", userInput);
        var buttonContainer = $("#buttons");
        buttonContainer.append(newButton);
        console.log(this.searches);
    },

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
window.onload = function () {
    topic.addButton();
}
// for (var i = 0; i < topic.searches.length; i++) {
//          console.log(topic.searches[i])
//         topic.getGiphy(topic.searches[i]);
//     }


$("#submit").on("click", function () {
    event.preventDefault();
    topic.searchResult();
});

$(document).on("click", "button.diplayGif", function() {
    
    console.log("clicked");
    // for (var i = 0; i < topic.searches.length; i++) {
    //      console.log(topic.searches[i])
    //     topic.getGiphy(topic.searches[i]);
    // }
    var currentIndex = $(this).attr("data-index");
    click.push(currentIndex);
    event.preventDefault();
    topic.getGiphy(currentIndex);
    $("#container").empty();
    click = [];
   
});



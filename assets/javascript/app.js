var topic ={
    searches : ["will smith", "zach braff", "eminem", "jlo"]

}

function addTopic(response){
    console.log(response.data)
    for (var i = 0; i < response.data.length; i++) {
        var responseData = response.data[i];
        var image = responseData.images.fixed_height_still.url;
        var gif = responseData.images.fixed_height.url;
        var rating = responseData.rating;

        var gifDiv = $("<div class='gif-div'>");
        

        var gifImg = $("<img class='still'>");

        gifImg.attr("src", image);
         gifImg.attr("alt", "gif");
        gifImg.attr("data-gif", gif);
        gifImg.attr("data-index", i);
        gifImg.attr("data-img", image);



        gifDiv.append("<p> Rating: " + rating + "</p>");
        gifDiv.append(gifImg);

        var divContainer = $("#container");
        divContainer.append($(gifDiv));
    };

};
 function search () {
        var userInput = $("#userInput").val();
        console.log(userInput);
        topic.searches.push(userInput);
        var newButton = $("<button class='topic'>").text(userInput);
        // .attr("data-index", userInput);
        var buttonContainer = $("#buttons");
        buttonContainer.append(newButton);
        console.log(topic.searches);
  }


    for(var i = 0; i < topic.searches.length; i++){
        console.log(topic.searches[i])
        getGiphy(topic.searches[i]);
    }



function addButton(){
    for (var j = 0; j < topic.searches.length; j++) {
        var buttonContainer = $("#buttons");
        var addButton = $("<button class='topic'></button>");
        addButton.text(topic.searches[j]);
        addButton.attr("data-index", topic.searches[j])
        console.log(topic.searches[j])
        buttonContainer.append(addButton);
    }
}
function getGiphy(name) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=06B2Bg9ig9lL50TsmsBYrUHh1HmhT8YC&q=" + name + "&limit=25&offset=0&rating=G&lang=en";

    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(addTopic);
}

window.onload = function () {
addButton();
}



$("#submit").on("click", function (event) {
    event.preventDefault();
    addButton();
});

$().on("click", function (event) {
    var currentIndex = $(this).attr("data-index");
    lastClick.push(currentIndex);
    console.log(currentIndex);
    event.preventDefault();
    $("#append-img-div").empty();
    killersGifs.divLoop();
    lastClick = [];
});



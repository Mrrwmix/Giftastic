var creatures = ['garden eel', 'manta ray', 'stubby squid', 'meerkat', 'raccoon', 'bobbit worm', 'sloth', 'startled cat', 'poison dart frog', 'pufferfish', 'quokka', 'hummingbird'];
var APIkey = 'p1gajnqCN1qu0JxHpaUVsQKjfQUDU03c';
for (var i = 0; i < creatures.length; i++) {
    $("#gif-list").append("<button class='btn btn-info' data-value='" + creatures[i] + "'>" + creatures[i] + "</button>");
}

function gifButtons(name) {
    creatures.push(name);
    $("#gif-list").empty();
    for (var i = 0; i < creatures.length; i++) {
        $("#gif-list").append("<button class='btn btn-info' data-value='" + creatures[i] + "'>" + creatures[i] + "</button>");
    }
    $("#gif-request").val('');
    ajaxOnSubmit(name);
}


function ajaxOnSubmit(newGif) {
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + newGif + '&api_key=' + APIkey + '&limit=10';
    $.ajax({ url: queryURL }).then(function (response) {
        console.log(response);
        $("#gif-view").empty();
        for (var i = 0; i < response.data.length; i++) {
            var creatureDiv = $("<div class='m-1'>");
            var ratingP = $("<p class='text-center'>").text("Rating: " + response.data[i].rating);
            var creatureImg = $("<img class='gif img-fluid'>");
            var favIcon = $("<span data-value='" + i + "'>" + "<i class=\"far fa-heart\">");
            creatureImg.attr("data-state", "still");
            creatureImg.attr("data-still", response.data[i].images.fixed_height_still.url);
            creatureImg.attr("data-animated", response.data[i].images.fixed_height.url);
            creatureImg.attr("src", $(creatureImg).attr("data-still"));
            creatureDiv.prepend(favIcon);
            creatureDiv.prepend(ratingP);
            creatureDiv.prepend(creatureImg);
            $("#gif-view").append(creatureDiv);
        }
    })
}
$("body").on("click", '.btn-info', function (event) {
    ajaxOnSubmit($(this).attr("data-value"));
})


$("body").on("click", ".btn-secondary", function (event) {
    event.preventDefault();
    var searchVal = $("#gif-request").val()
    ajaxOnSubmit(searchVal);
    $("#gif-list").append("<button class='btn btn-info' data-value='" + searchVal + "'>" + searchVal + "</button>");
    $("#gif-request").val('');
    console.log(creatures);
})

$("body").on("click", ".gif", function (event) {
    if ($(this).attr("data-state") == 'still') {
        $(this).attr("src", $(this).attr('data-animated'));
        $(this).attr("data-state", 'animated');
    }
    else {
        $(this).attr("src", $(this).attr('data-still'));
        $(this).attr("data-state", 'still');
    }
})

$("body").on("click", ".fa-heart", function (event) {
    if ($(this).css("color") != 'rgb(255, 0, 0)') {
        $(this).css("color", "red");
        console.log($(this).parent().siblings("img").attr("data-animated"));
        console.log($(this).css("color"));
        console.log($(this).parent().siblings("p").text());
        var favDiv = $("<div class='m-1'>");
        var ratingFP = $("<p class='text-center'>").text($(this).parent().siblings("p").text());
        var creatureFImg = $("<img class='gif img-fluid'>");
        var favoIcon = $("<span>" + "<i class=\"fas fa-minus-circle\">");
        creatureFImg.attr("data-state", "still");
        creatureFImg.attr("data-still", $(this).parent().siblings("img").attr("data-still"));
        creatureFImg.attr("data-animated", $(this).parent().siblings("img").attr("data-animated"));
        creatureFImg.attr("src", $(this).parent().siblings("img").attr("data-still"));
        favDiv.prepend(favoIcon);
        favDiv.prepend(ratingFP);
        favDiv.prepend(creatureFImg);
        $(".col-md-12 section").append(favDiv);
    }
    // $("#favoritesLand").append("<img src='" + $(this).parent().attr("data-value").images.fixed_height.url +"'");
})


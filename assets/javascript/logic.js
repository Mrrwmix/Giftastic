var creatures = ['garden eel', 'manta ray', 'stubby squid', 'meerkat', 'raccoon', 'bobbit worm', 'sloth', 'startled cat', 'poison dart frog', 'pufferfish', 'quokka', 'hummingbird'];
var favorites = [];
var APIkey = 'p1gajnqCN1qu0JxHpaUVsQKjfQUDU03c';

$(document).ready(function () {
    if (localStorage.getItem('favs') !== null && localStorage.getItem('favs') !== "[]"){
        favorites = JSON.parse(localStorage.getItem("favs"));
        for (var i = 0; i < favorites.length; i = i + 2){
            var favDiv = $("<div class='text-center'>");
            var creatureFImg = $("<img class='gif img-fluid'>");
            var favoIcon = $("<p class='cancel-x'>").text('⌧');
            creatureFImg.attr("data-state", "still");
            creatureFImg.attr("data-still", favorites[i]);
            creatureFImg.attr("data-animated", favorites[i+1]);
            creatureFImg.attr("src", favorites[i]);
            favDiv.prepend(favoIcon);
            favDiv.prepend(creatureFImg);
            $(".col-md-12 section").append(favDiv);
        }
    }
    else {
        console.log("You have no favs!");
    }
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
            $("#gif-view").empty();
            for (var i = 0; i < response.data.length; i++) {
                var creatureDiv = $("<div class='m-1 d-inline-block'>");
                var ratingP = $("<p class='text-center m-0'>").text("Rating: " + response.data[i].rating);
                var creatureImg = $("<img class='gif img-fluid'>");
                var favIcon = $("<span class='far fa-heart'>").text('♥');
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
            var favDiv = $("<div class='text-center'>");
            var creatureFImg = $("<img class='gif img-fluid'>");
            var favoIcon = $("<p class='cancel-x'>").text('⌧');
            creatureFImg.attr("data-state", "still");
            creatureFImg.attr("data-still", $(this).siblings("img").attr("data-still"));
            creatureFImg.attr("data-animated", $(this).siblings("img").attr("data-animated"));
            creatureFImg.attr("src", $(this).siblings("img").attr("data-still"));
            favDiv.prepend(favoIcon);
            favDiv.prepend(creatureFImg);
            $(".col-md-12 section").append(favDiv);
            favorites.push($(this).siblings("img").attr("data-still"));
            favorites.push($(this).siblings("img").attr("data-animated"));
            localStorage.setItem("favs", JSON.stringify(favorites));
        }
    })
    $("body").on("click", ".cancel-x", function (event) {
        favorites.splice(favorites.indexOf($(this).siblings("img").attr("data-still")), 2);
        localStorage.setItem("favs", JSON.stringify(favorites));
        $(this).parent().empty();
        $(".fa-heart").each(function (index) {
            if (favorites.indexOf($(this).siblings("img").attr("data-still")) == -1) {
                $(this).css("color", "black");
            }
        })
    })
});
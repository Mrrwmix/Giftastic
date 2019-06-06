var creatures = ['garden eel', 'manta ray', 'stubby squid', 'meerkat', 'raccoon', 'bobbit worm', 'sloth', 'startled cat', 'poison dart frog', 'porcupinefish', 'quokka', 'hummingbird'];
var APIkey = 'p1gajnqCN1qu0JxHpaUVsQKjfQUDU03c';

function gifButtons() {
    $("#gif-list").empty();
    for (var i = 0; i < creatures.length; i++) {
        $("#gif-list").append("<button class='btn btn-info' data-value='" + creatures[i] + "'>" + creatures[i] + "</button>");
    }
    clicks();
}

gifButtons();

function clicks() {
    $(".btn-info").on("click", function (event) {
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + $(this).attr("data-value") + '&api_key=' + APIkey + '&limit=10';

        $.ajax({ url: queryURL }).then(function (response) {
            $("#gif-view").empty();
            console.log(response);
            console.log(response.data[0].images);
            for (var i = 0; i < response.data.length; i++) {
                var creatureDiv = $("<div>");
                var ratingP = $("<p class='text-center'>").text("Rating: " + response.data[i].rating);
                var creatureImg = $("<img class='gif img-fluid'>");
                creatureImg.attr("data-state", "still");
                creatureImg.attr("data-still", response.data[i].images.fixed_height_still.url);
                creatureImg.attr("data-animated", response.data[i].images.fixed_height.url);
                creatureImg.attr("src", $(creatureImg).attr("data-still"));
                creatureDiv.prepend(ratingP);
                creatureDiv.prepend(creatureImg);
                $("#gif-view").append(creatureDiv);
            }
            clicks();
        });

    });

    $(".btn-secondary").on("click", function (event) {
        event.preventDefault();
        if ($("#gif-request").val() != '') {
            creatures.push($("#gif-request").val());
        }
        gifButtons();
        $("#gif-request").val('');
    })

    $(".gif").on("click", function(event){
        console.log("I've been clicked!");
        if ($(this).attr("data-state") == 'still'){
            $(this).attr("src", $(this).attr('data-animated'));
            $(this).attr("data-state", 'animated');
        }
        else {
            $(this).attr("src", $(this).attr('data-still'));
            $(this).attr("data-state", 'still');
        }
    })
} // This function will hold all on clicks and will have to be called any time a button is added.




var creatures = ['garden eel', 'manta ray', 'woodpecker', 'meerkat', 'raccoon', 'bobbit worm', 'sloth', 'startled cat', 'poison dart frog', 'porcupinefish', 'quokka', 'hummingbird'];
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
    $(".btn-info").on("click", function () {
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + $(this).attr("data-value") + '&api_key=' + APIkey + '&limit=10&rating=g';

        $.ajax({
            url: queryURL
        }).then(function (data) {
            console.log(data);
        });

    });
} // This function will hold all on clicks and will have to be called any time a button is added.




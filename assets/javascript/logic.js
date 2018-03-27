$(document).ready(function () {

    var topics = ["cat", "dog", "putin", "trump", "skunk", "pig", "donkey", "snake", "star wars", "terminator", "bird", "usa", "russia", "jimmy", "50cent", "ufc", "mma", "coding", "hacker"];
    var still;
    var animate;

    function displayGiphy() {
        $("#giphys-view").empty();
        var topics = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=8gTAnRtd6rOl1UFJ17AYYmzMBV2rK2fv&limit=12"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var result = response.data;
            for (var i = 0; i < result.length; i++) {

                var gifs = $("<div class='col-lg-4'>");
                var rating = result[i].rating;

                var ratingDisplay = $("<p>").text("Rating " + rating);
                var gifDisplay = $("<img>");
                gifDisplay.addClass("animate");
                gifDisplay.attr("data-state", "still");
                gifDisplay.attr("data-still", result[i].images.fixed_height_still.url);
                gifDisplay.attr("data-animate", result[i].images.fixed_height.url);
                gifDisplay.attr("src", result[i].images.fixed_height_still.url);

                gifs.append(ratingDisplay, gifDisplay);
                $("#giphys-view").prepend(gifs);
            }
            
            $(".animate").on("click", function () {

                var state = $(this).attr("data-state");
    
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                    console.log(this);
                }
                if (state === "animate") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                    console.log(this);
                }
            });
        });
     
    }

    function buttonMaker() {
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
            var btn = $("<button>");
            btn.addClass("gif");
            btn.attr("data-name", topics[i]);
            btn.text(topics[i]);
            $("#buttons-view").append(btn);
        }
    }

    $("#add-giphy").on("click", function (event) {
        event.preventDefault();
        var gifs = $("#giphy-input").val().trim();
        $("#giphy-input").val("");
        if (gifs === "") {
            return;
        }
        topics.push(gifs);
        buttonMaker();
    });
    $(document).on("click", ".gif", displayGiphy)
    buttonMaker();

});



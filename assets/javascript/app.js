// JavaScript  document

// *****************************************//
// This simple JS code is applying APIs and AJAX technologies to generate gifs from giphy gif's library.
// ***************************************//

// Document Ready
$(document).ready(function () {
    // Declare global variables
    let buttons = ["World Cup", "早上好"];
    let gifsCat;
    let limit = 10;

    // Render Page -- Display Current Buttons
    renderButtons();

    function renderButtons() {
        $(".buttons").empty();
        $(".add-button").empty();
        for (let button in buttons) {
            // Style with Bootstrap
            let newBtn = $("<button type='button' class='btn btn-success btn-xs mx-1 mb-1 gifs-button'>").text(buttons[button]);
            $(".buttons").append(newBtn);
        }
        // Animate gifs button when hovered
        $(".gifs-button").hover(function () {
            $(this).attr('class', 'btn btn-primary btn-xs mx-1 mb-1 gifs-button');
        }, function () {
            $(this).attr('class', 'btn btn-success btn-xs mx-1 mb-1 gifs-button');
        })

        let addText = $("<input type='text' class='form-control mb-2'  id = 'text-input' placeholder='Enter New GIF Topic'>");
        //Style with Bootstrap
        let addBtn = $("<input class = 'btn btn-success btn-xs mb-2' id = 'add-input' type = 'submit' value ='Add Button'>").text('Add Button');;
        $(".add-button").append(addText);
        $(".add-button").append(addBtn);

        // Animate add button when hovered
        $("#add-input").hover(function () {
            $(this).attr('class', 'btn btn-primary btn-xs btn-xs mb-2 add-button');
        }, function () {
            $(this).attr('class', 'btn btn-success btn-xs btn-xs mb-2 add-button');
        });
    };

    // Query API
    function apiQuery() {
        let queryURL;
        // To get more gif on subsequent clicks 
        if (gifsCat === $(this).text()) {
            $(".gifs-item").empty();
            // ensure limit not more than 30
            if (limit < 25) {
                limit += 5;
            }
            // Get api query URL
            gifsCat = $(this).text();
            queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                gifsCat + "&api_key=dc6zaTOxFJmzC&limit=" + limit;
        }
        else {
            limit = 10;
            $(".gifs-item").empty();
            // Get api query URL 
            gifsCat = $(this).text();
            queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                gifsCat + "&api_key=dc6zaTOxFJmzC&limit=" + limit;
        }
        // Perform the AJAX GET request   
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // Query response from the API
            .then(function (response) {
                let gifData = response.data;
                renderGIFs(gifData);
            })
    }//Ends

    // Render GIFS
    function renderGIFs(data) {
        let gifsTag = $("<h3>");
        for (let gif in data) {
            // Only taking action if the photo has an appropriate rating
            if (data[gif].rating !== "r" && data[gif].rating !== "pg-13") {
                let rating = $("<p>").text("Rating: " + data[gif].rating);
                let title = $("<h6>").text((data[gif].title).substring(0, 27));
                let image = $("<img>").attr({ src: data[gif].images.fixed_width_small_still.url, 'id': 'gif-image', 'data-still': data[gif].images.fixed_width_small_still.url, 'data-animate': data[gif].images.fixed_width_small.url, 'data-state': 'still' });
                let download = $("<button type='button' class='btn btn-success btn-xs  mr-1 download-button'>").text("download");
                download.attr({ 'id': gif, 'data-download': data[gif].images.downsized_large.url });
                // let add = $("<button type='button' class='btn btn-success btn-xs  mr-1 add-favorite'>").text("add");
                // add.attr({ 'id': gif, 'data-download': data[gif].images.downsized_large.url });
                // Virtually create container div and style with css
                let gifsDiv = $("<div class = 'gif'>")
                    .css({
                        'position': 'relative',
                        'float': 'left',
                        'width': '200',
                        'height': '200',
                        'margin': '10px',
                        'overflow': 'auto',
                        'border': 'solid 1px gray',
                        'border-radius': '5px',
                    });

                // Appending the gifs properties to the virtually declared gifsDiv
                gifsDiv.append(title, image, rating, download);   //, add
                // Prepend the virtual gif gifsDiv to the html div gif-item ready to render.
                gifsDiv.prependTo($(".gifs-item"));
            }
        }
        gifsTag.text(gifsCat + " Gifs");
        $(".gifs-item-header").html(gifsTag);

        // Animate add-favorite button when hovered
        $(".add-favorite").hover(function () {
            $(this).attr('class', 'btn btn-primary btn-xs mb-1 mr-1 download-button');
        }, function () {
            $(this).attr('class', 'btn btn-success btn-xs mb-1 mr-1 download-button');
        });

        // Animate add button when hovered
        $(".download-button").hover(function () {
            $(this).attr('class', 'btn btn-primary btn-xs mb-1 mr-1 download-button');
        }, function () {
            $(this).attr('class', 'btn btn-success btn-xs mb-1 mr-1 download-button');
        });


        // download button "on click" call back
        $(".download-button").on("click", function (event) {
            event.preventDefault();
            window.open($(this).attr('data-download'), '_blank');
            // console.log($(this).parent().html());
        });
    } //Ends

    // Animate  GIFs
    function animate() {
        let state = $(this).attr('data-state');
        if (state === "still") {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    }//Ends

    // gif buttons "on click" call back event handler
    $(".buttons").on("click", ".gifs-button", apiQuery);

    // gif image "on click" call back event handler
    $(".gifs-item").on("click", "#gif-image", animate);

    // add new buttons "on click" call back event handler
    $(".add-button").on("click", "#add-input", function (event) {
        event.preventDefault();
        let newWord = $("#text-input").val().trim();
        buttons.push(newWord.charAt(0).toUpperCase() + newWord.toLowerCase().slice(1));
        renderButtons();
    });
})




// LocalStorage implementation for favorite not quite finished
// Get favorite array from local storage and parse it as a string
    // let favListTemp = JSON.parse(localStorage.getItem("favorite"));

    // // Check if favListIn is indeed an array if not create such array 
    // if (!Array.isArray(favListTemp)) {
    //     favListTemp = [];
    // }

     // function renderFavorite() {
    //     let favListIn = JSON.parse(localStorage.getItem("favorite"));

    //     // Check if favListIn is indeed an array if not create such array 
    //     if (!Array.isArray(favListIn)) {
    //         favListIn = [];
    //     }

    //     for (let i = 0; i < favListIn.length; i++) {
    //         $("#favorite").prepend(favListIn[i]);
    //     }

    // }

    // $(".favorite").on("click", "remove-favorite", function () {
    //     let favListCur = JSON.parse(localStorage.getItem("favorite"));
    //     let currentIndex = $(this).attr("data-index");

    //     // Remove the favorite marked for deletion
    //     favListCur.splice(currentIndex, 1);
    //     favListTemp = favListCur;

    //     localStorage.setItem("favorite", JSON.stringify(favListCur));
    //     renderFavorite();
    // });

    // remove favorite "on click" call back event handler
    // $(".remove-favorite").on("click", function () {
    //     console.log($(this).parent());
    //     $(this).parent().empty();
    // });


    // add favorite "on click" call back event handler
    // $(".add-favorite").on("click", function (event) {
    //     event.preventDefault();

    //     let fav = $(this).parent().html();
    //     console.log($(this));
    //     let remove = $("<button class = 'remove-favorite'>").text('remove');
    //     // Virtually create container div and style with css
    //     let favDiv = $("<div class = 'fav'>")
    //         .css({
    //             'position': 'relative',
    //             'float': 'left',
    //             'width': '200',
    //             'height': '200',
    //             'margin': '10px',
    //             'overflow': 'auto',
    //             'border': 'solid 1px gray',
    //             'border-radius': '5px',
    //         });

    //     favDiv.append($(this).parent().html());
    //     favDiv.append(remove);
    //     $(".favorite").prepend(favDiv);
    //     favListTemp.push(favDiv);
    //     localStorage.setItem("favorite", JSON.stringify(favListTemp));
    //     renderFavorite();
    // });
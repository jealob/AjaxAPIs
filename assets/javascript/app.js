// JavaScript  document

// *****************************************//
// This simple JS code is applying APIs and AJAX technologies to generate gifs from giphy gif's library.
// ***************************************//

// Document Ready
$(document).ready(function () {
    // Declare global variables
    let buttons = ["space", "world cup"];
    // Render Page -- Display Existing Buttons
    renderButtons();
    

    function renderButtons() {
        $(".buttons").empty();
        $(".add-button").empty();
        for (let button in buttons) {
            // Style with Bootstrap
            let newBtn = $("<button type='button' class='btn btn-default btn-xs mx-1 gifs-button'>").text(buttons[button]);
            $(".buttons").append(newBtn);
        }
        // For animation when hovered
        $(".gifs-button").hover(function () {
            $(this).attr('class', 'btn btn-primary btn-xs mx-1 gifs-button');
        }, function () {
            $(this).attr('class', 'btn btn-default btn-xs mx-1 gifs-button');
        })

        let addText = $("<input type='text' class='form-control mb-2'  id = 'text-input' placeholder='Enter New Category'>");
        //Style with Bootstrap
        let addBtn = $("<input class = 'btn btn-default btn-xs mb-2 add-button' id = 'add-button' type = 'submit' value ='Add Button'>").text('Add Button');;
        $(".add-button").append(addText);
        $(".add-button").append(addBtn);

        // For animation when hovered
        $("#add-button").hover(function () {
            $(this).attr('class', 'btn btn-primary btn-xs btn-xs mb-2 add-button');
        }, function () {
            $(this).attr('class', 'btn btn-default btn-xs btn-xs mb-2 add-button');
        });
    };

    // Query API
    function apiQuery() {
        $(".gifs-item").empty();
        // Get api query URL 
        let gifsCat = $(this).text();
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            gifsCat + "&api_key=dc6zaTOxFJmzC&limit=10";
        // Perform the AJAX GET request
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // Query response from the API
            .then(function (response) {
                console.log(response);
                let gifData = response.data;
                renderGIFs(gifData);
            })
    }//Ends

    // Render GIFS
    function renderGIFs(data) {
        for (let gif = 0; gif < data.length; gif++) {
            let rating = $("<p>").text("Rating: " + data[gif].rating);
            let title = $("<p>").text((data[gif].title).substring(0, 27));
            let image = $("<img>").attr({ src: data[gif].images.fixed_width_small_still.url });
            image.attr({ 'id': 'gif-image', 'data-still': data[gif].images.fixed_width_small_still.url, 'data-animate': data[gif].images.fixed_width_small.url, 'data-state': 'still'});
            
            // Virtually create container div and style with css
            let gifsDiv = $("<div class = 'gif'>")
                .css({
                    'position': 'relative',
                    'float': 'left',
                    'width': '250',
                    'line-length': '1.0x',
                    'margin': '10px',
                    'overflow': 'hidden',
                    'min-height': '3%',
                    'max-height': '3%',
                    'border': 'solid 1px gray',
                    'border-radius': '5px',
                });
            // Appending the gifs properties to the virtually declared gifsDiv
            gifsDiv.append(title, image, rating);
            // Prepend the virtual gif gifsDiv to the html div gif-item ready to render.
            gifsDiv.appendTo($(".gifs-item"));
            // }
        }
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

    // gif buttons on click call back event handler
    $(".buttons").on("click", ".gifs-button", apiQuery);

    // gif image on click call back event handler
    $(".gifs-item").on("click", "#gif-image", animate);

    // gif buttons on click call back event handler
    $(".add-button").on("click", "#add-button", function (event) {
        event.preventDefault();
        buttons.push($("#text-input").val().trim());
        renderButtons();
    });


})
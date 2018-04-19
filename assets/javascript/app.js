// JavaScript  document

// *****************************************//
// This simple JS code is applying APIs and AJAX technologies to generate gifs from giphy gif's library.
// ***************************************//

// Document Ready
$(document).ready(function () {
    // Declare global variables
    let buttons = ["space","world cup"];
    renderButtons();
    // Display Existing Buttons
    
    function renderButtons() {
        $("#buttons").empty();
        for (let button in buttons) {
            // Style with Bootstrap
            let newBtn = $("<button type='button' class='btn btn-default btn-xs mx-1 gifs-button'>").text(buttons[button]);
            $(".buttons").append(newBtn);
        }
        // For animation when hovered
        $(".gifs-button").hover(function(){
            $(this).attr( 'class', 'btn btn-primary btn-xs mx-1 gifs-button');
        }, function(){
            $(this).attr( 'class', 'btn btn-default btn-xs mx-1 gifs-button');
        })

        let addText = $("<input type='text' class='form-control mb-2'  id = 'text-input' placeholder='Enter New Category'>");
        //Style with Bootstrap
        let addBtn = $("<input class = 'btn btn-default btn-xs mb-2 add-button' id = 'add-button' type = 'submit' value ='Add Button'>");
        $(".add-button").append(addText);
        $(".add-button").append(addBtn);

        // For animation when hovered
        $("#add-button").hover(function(){
            $(this).attr( 'class', 'btn btn-primary btn-xs btn-xs mb-2 add-button');
        }, function(){
            $(this).attr( 'class', 'btn btn-default btn-xs btn-xs mb-2 add-button');
        });
    };

    function apiQuery() {
        // Get api query URL 
        let gifs = $(this).text();
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifs + "&api_key=dc6zaTOxFJmzC&limit=10";
        // Perform the AJAX GET request
        $.ajax ({
            url: queryURL,
            method: "GET"
        })
        // Query response from the API
        .then(function(response){
            console.log(response);
        })
     }

    $(".buttons").on("click", ".gifs-button", apiQuery); 

})
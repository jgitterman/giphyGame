// create an array to store the buttons
var buttons = []

// create an on click function to make button appear when "create button" is clicked 
$("#addGif").on("click", function (event) {
  event.preventDefault()

  // get the input value
  var input = $("#gif-input").val()

  // if statement to gauge if something was typed in. If theres text push button to array
  if (input === "") {
    alert("Please type in a category to generate a gif button");
  } else {
    buttons.push(input)
  };

  // Calling render buttons to create buttons
  gifButtons();
});

// create a function to display the buttons
function gifButtons() {

  // make sure previous entry doesnt appear
  $("#buttons").empty()

  // create a for loop to generate the buttons
  for (var i = 0; i < buttons.length; i++) {

    // use javascript to create buttons in array
    var button = $("<button>")
      .addClass("gifButton")
      .attr("data-name", buttons[i])
      .text(buttons[i])
      .appendTo($("#buttons"))
  }
}

// create an on.click function to make gifs appear
$(document).on("click", ".gifButton", displayGifs);

// function to display gifs
function displayGifs() {

  // clear previous gifs
  $("#gifDisplay").empty()

  //create a variable to use for the API search 
  var input = $(this).attr("data-name")

  // API URL
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=dc6zaTOxFJmzC&limit=12"

  // create AJAX call to get data from giphy and run display page function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(displayPage)
  console.log(queryURL)
}

// create a function to display the gifs on the page
function displayPage(gifData) {
  console.log(gifData)

  // create a variable for data from API
  var results = gifData.data

  // create a for loop to loop through results array from API and create gifs
  for (var i = 0; i < results.length; i++) {

    // create a div to hold the images
    var gifsDiv = $("<div class='col-md-6 col-lg-4 col-12 mb-1'>");
    var title = results[i].title
    var titleText = $("<p>").text("Title: " + title)
    var rating = results[i].rating
    var ratingText = $("<p>").text("Rating: " + rating)
    var imgURL = results[i].images.fixed_height_still.url
    var image = $("<img>").attr("src", imgURL)

    // give image attributes of a still version of image and moving version
    image.attr("data-still", results[i].images.fixed_height_still.url)
      .attr("data-animate", results[i].images.fixed_height.url)
      .attr("data-state", "still")
      .attr("src", results[i].images.fixed_height_still.url)

      // give all the gifs the same size
      .css("width", 300)
      .css("height", 300)

      // create an on click function to change the image when clicked from still to animated
      .on("click", function () {
        event.preventDefault()
        var state = $(this).attr("data-state")
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"))
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"))
          $(this).attr("data-state", "still")
        }
      })

    // appending all the data to gifs div
    gifsDiv.append(image)
      .append(titleText)
      .append(ratingText)
      .prependTo($("#gifDisplay"))
  }
}
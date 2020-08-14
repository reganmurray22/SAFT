// API key variables for making calls
const apiKeyTMDB = "";
const apiKeyOMDB = "";

// Search Bar takes in value, click event w/ button
// function searchPrimaryMovie(e) {
// Get Value from search bar
// const primaryMovie = $().val();

// If search button is clicked but there's no text, return
// if (var === "") {return;}

// Pass to API call
// const newURL = createQueryURL(primaryMovie);
// getMovieData(newURL);
// }

// function createQueryURL(primaryMovie){
// return "https:WHATEVERTHEAPICALLFORMATISHEREWITH${primaryMovie}&${APIKEY}";
// }

// API call to get movie data
// function getMovieData(url) {
//   $.ajax({
//     url: url,
//     method: "GET",
//   }).then((resp) => {
//     const movieData = parseResp(resp);
// }

// Parse movie data to display:
// function parseResp(resp)
// const movieDataObject = {};
// movieDataObject.title = resp.
// movieDataOjbect.year = resp.
// movieDataObject.director = resp.
// movieDataObject.actors = resp.
// movieDataObject.ratings =

// function drawMainContent(movieDataObject) {

// Movie Title
$("#primary-movie-title");

// Poster
$("#primary-movie-poster");
// Year

// Genre

// Director

// Actors

// };

// Select Search Criteria w/ check boxes (one item to start)
$("#actor-search").click(() => suggestMovies());

function suggestMovies() {
  console.log("CLICK");
}

window.suggestMovies = suggestMovies;

// $("#director-search").click(console.log("it clicked"));

// $("genre-search").click(console.log("it clicked"));

// Make 1 or 2 API calls to suggest 3 movies to watch

// Put Posters and Titles of 3 movies from API call into the cards

// Stretch goal: When you click one of the recommended movies
// display additional information

// Stretch: Store your previous searches in local storage and display
// somewhere for the user to reuse them as searches?

//Stretch Item: A button to suggest a movie if you
// can't think of one to watch

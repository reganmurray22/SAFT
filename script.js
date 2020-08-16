$("#button1").click(() => callApi(1));
$("#button2").click(() => callApi(2));
callApi = async (id) => {
   let query = document.getElementById(id === 1 ? "search-cola" : "search").value.toLowerCase().trim();
   console.log(document.getElementById(id === 1 ? "search-cola" : "search").value)
   let apiKey = "91eadf893040a861219dbeed5365bc50";
   const response = await fetch(`https://www.omdbapi.com/?t=${query}&apikey=trilogy`)
   const responseData = await response.json();
   parseAndUpdateHTML(responseData);
}


function parseAndUpdateHTML(movie) {
   // setting your movie section
   var i = 0
   let actors = movie.Actors.split(",")
   document.getElementById("image0") ? document.getElementById("image0").src = movie.Poster : null
   document.getElementById("title0") ? document.getElementById("title0").innerHTML = movie.Title : null
   document.getElementById("rating0")? document.getElementById("rating0").innerHTML = "Ratings Box: " + movie.imdbRating : null
   document.getElementById("overview0") ? document.getElementById("overview0").innerHTML = movie.Plot : null
   document.getElementById("director0") ? document.getElementById("director0").innerHTML = movie.Director : null
   document.getElementById("actors0") ? document.getElementById("actors0").innerHTML = actors[0] : null


   $("#card0").removeClass("hide");
   $("#rating-card").removeClass("hide");
   $("#welcomeRow").addClass('hide')
   $("#recommendation-box").removeClass('hide');



   
   // for (let i = 0; i < movies.length && i < 4; i++) {
   //    document.getElementById("image"+i)? document.getElementById("image"+i).src = "https://image.tmdb.org/t/p/w500" + movies[i].poster_path : null
   //    document.getElementById("title"+i) ? document.getElementById("title"+i).innerHTML = movies[i].title : null
   //    document.getElementById("rating"+i)? document.getElementById("rating"+i).innerHTML = "Ratings Box: " + movies[i].vote_average : null
   //    document.getElementById("overview"+i) ? document.getElementById("overview"+i).innerHTML = movies[i].overview : null
   //    if (i === 0) {
   //       $("#card0").removeClass("hide");

   //       $("#rating-card").removeClass("hide");

   //    }

   // }
   // if(movies.length > 4)  {
   //    $(".hide").removeClass("hide");
   // }
   // $("#welcomeRow").addClass('hide')

   // if(movies.length > 1 && movies.length < 4) {
   //    $("#recommendation-box").removeClass('hide');
   // }

}

// function createQueryURL(primaryMovie){
// return "https:WHATEVERTHEAPICALLFORMATISHEREWITH${primaryMovie}&${APIKEY}";
// }

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
$("#primary-movie-poster");

// Year

// Genre

// Director

// Actors

// };

// Select Search Criteria w/ check boxes (one item to start)
$("#suggestions-button").click(() => suggestMovies());

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

/*
{
    "adult":false,
    "backdrop_path":"/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg",
    "belongs_to_collection":null,
    "budget":63000000,
    "genres":[
       {
          "id":18,
          "name":"Drama"
       }
    ],
    "homepage":"http://www.foxmovies.com/movies/fight-club",
    "id":550,
    "imdb_id":"tt0137523",
    "original_language":"en",
    "original_title":"Fight Club",
    "overview":"A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    "popularity":37.22,
    "poster_path":"/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "production_companies":[
       {
          "id":508,
          "logo_path":"/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
          "name":"Regency Enterprises",
          "origin_country":"US"
       },
       {
          "id":711,
          "logo_path":"/tEiIH5QesdheJmDAqQwvtN60727.png",
          "name":"Fox 2000 Pictures",
          "origin_country":"US"
       },
       {
          "id":20555,
          "logo_path":"/hD8yEGUBlHOcfHYbujp71vD8gZp.png",
          "name":"Taurus Film",
          "origin_country":"DE"
       },
       {
          "id":54051,
          "logo_path":null,
          "name":"Atman Entertainment",
          "origin_country":""
       },
       {
          "id":54052,
          "logo_path":null,
          "name":"Knickerbocker Films",
          "origin_country":"US"
       },
       {
          "id":25,
          "logo_path":"/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
          "name":"20th Century Fox",
          "origin_country":"US"
       },
       {
          "id":4700,
          "logo_path":"/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
          "name":"The Linson Company",
          "origin_country":""
       }
    ],
    "production_countries":[
       {
          "iso_3166_1":"DE",
          "name":"Germany"
       },
       {
          "iso_3166_1":"US",
          "name":"United States of America"
       }
    ],
    "release_date":"1999-10-15",
    "revenue":100853753,
    "runtime":139,
    "spoken_languages":[
       {
          "iso_639_1":"en",
          "name":"English"
       }
    ],
    "status":"Released",
    "tagline":"Mischief. Mayhem. Soap.",
    "title":"Fight Club",
    "video":false,
    "vote_average":8.4,
    "vote_count":19816
 }
 */

// Nina's Pseudo code
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

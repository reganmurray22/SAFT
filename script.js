$("#button1").click(() => callApi(1));
$("#button2").click(() => callApi(2));
function callApi(id) {
  let query = document.getElementById( id === 1 ? "search-cola" : "search").value.toLowerCase();
  let apiKey = "91eadf893040a861219dbeed5365bc50";
  var xmlhttp = new XMLHttpRequest();
  var url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;

    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        parseAndUpdateHTML(response);
    }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();   
}
function parseAndUpdateHTML(response) {
  // setting your movie section
  document.getElementById("image0").src =
      "https://image.tmdb.org/t/p/w500" + response.results[0].poster_path;
   document.getElementById("title0").innerHTML = response.results[0].title;
   document.getElementById("rating0").innerHTML =
        "Ratings Box: " + response.results[0].vote_average;
        
        // unhidding hidden cards
        let hidden = document.getElementsByClassName("row hide")
        hidden[0].classList.replace('hide',null)
        hidden[1].classList.replace('hide',null)
        hidden[2].classList.replace('hide',null)
        hidden[3].classList.replace('hide',null)







//   for (i = 0; i < response.results.length && i < 1; i++) {
//     document.getElementById("image" + i).src =
//       "https://image.tmdb.org/t/p/w500" + response.results[i].poster_path;
//     document.getElementById("title" + i).innerHTML = response.results[i].title;
//     if (i === 0) {
//       document.getElementById("rating" + i).innerHTML =
//         "Ratings Box: " + response.results[i].vote_average;
//         document.getElementById.className = 'row'
//     }
//   }
}

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
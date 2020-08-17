// *****WE NEED A PREVENT DEFAULT IF THE SEARCH BUTTON IS CLICKED W/ NO TEXT****

$("#button1").click(() => callApi(1));
$("#button2").click(() => callApi(2));
callApi = async (id) => {
  let query = document
    .getElementById(id === 1 ? "search-cola" : "search")
    .value.toLowerCase()
    .trim();
  console.log(
    document.getElementById(id === 1 ? "search-cola" : "search").value
  );
  let apiKey = "91eadf893040a861219dbeed5365bc50";
  const response = await fetch(
    `https://www.omdbapi.com/?t=${query}&apikey=trilogy`
  );
  const responseData = await response.json();
  parseAndUpdateHTML(responseData);
};

function parseAndUpdateHTML(movie) {
  // setting your movie section
  var i = 0;
  let actors = movie.Actors.split(",");
  let genres = movie.Genre.split(",");
  document.getElementById("image0")
    ? (document.getElementById("image0").src = movie.Poster)
    : null;
  document.getElementById("title0")
    ? (document.getElementById("title0").innerHTML = movie.Title)
    : null;
  document.getElementById("rating0")
    ? (document.getElementById("rating0").innerHTML =
        "Ratings Box: " + movie.imdbRating)
    : null;
  document.getElementById("overview0")
    ? (document.getElementById("overview0").innerHTML = movie.Plot)
    : null;
  document.getElementById("director-name")
    ? (document.getElementById("director-name").innerHTML = movie.Director)
    : null;
  document.getElementById("actor0")
    ? (document.getElementById("actor0").innerHTML = actors[0])
    : null;
  document.getElementById("actor1")
    ? (document.getElementById("actor1").innerHTML = actors[1])
    : null;
  document.getElementById("genre0")
    ? (document.getElementById("genre0").innerHTML = genres[0])
    : null;
  document.getElementById("genre1")
    ? (document.getElementById("genre1").innerHTML = genres[1])
    : null;

  var actorsRadioBtns = "";
  for (var i = 0; i < actors.length; i++) {
    //VALUE needs to be a VARIABLE so it can change with each new actor
    actorsRadioBtns +=
      '<label><input id="actor-radio-btn' +
      i +
      '" class="with-gap" name="actor-radio" type="radio" value="500" checked/><span id="actor' +
      i +
      '">' +
      actors[i] +
      "</span></label>";
  }
  document
    .getElementById("actors-radio-btns")
    .insertAdjacentHTML("afterbegin", actorsRadioBtns);

  var genresRadioBtns = "";
  for (var i = 0; i < genres.length; i++) {
    //VALUE needs to be a VARIABLE so it can change with each new genre
    genresRadioBtns +=
      '<label><input id="genres-radio-btn' +
      i +
      '" class="with-gap" name="genre-radio" type="radio" value="28" checked/><span id="genre' +
      i +
      '">' +
      genres[i] +
      "</span></label>";
  }
  document
    .getElementById("genres-radio-btns")
    .insertAdjacentHTML("afterbegin", genresRadioBtns);

  $("#card0").removeClass("hide");
  $("#rating-card").removeClass("hide");
  $("#welcomeRow").addClass("hide");
  $("#recommendation-box").removeClass("hide");

  var searchPerson = "Tom Cruise";

  actors.forEach((actor, i) => {
    var personsName = actor.replace(" ", "+");
    $.ajax({
      url:
        "https://api.themoviedb.org/3/search/person?api_key=820bbe10cb48ba65507b6fe60d8c0d50&query=" +
        personsName,
      method: "GET",
    }).then(function (result) {
      console.log("RESULT => ", result);
      var personId = result.results[0].id;
      console.log(personId);
      console.log("START OF HTML QUERY ", i);
      console.log(document.getElementById(`#actor-radio-btn${i}`));
      document
        .getElementById(`actor-radio-btn${i}`)
        .setAttribute("value", personId);
    });
  });

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

// function drawMainContent(movieDataObject) {

// Movie Title

// Poster

// Year

// Genre

// Director

// Actors

// };

// CLICK EVENT FOR 'SUGGEST MOVIES' BUTTON
$("#suggest-movies-btn").on("click", () => {
  console.log("nina-click");
  const suggRadioBtn = selectRecommendationCriteria();
  determineAPICall(suggRadioBtn);
});

function selectRecommendationCriteria(e) {
  console.log("selectRecommendationCritCalled");
  const suggRadioBtns = $("input[name='suggestion-radios']:checked").val();
  console.log("THIS IS A", suggRadioBtns);
  return suggRadioBtns;
}

function determineAPICall(suggRadioBtn) {
  // IF THEY WANT TO SEARCH BY ACTOR
  if (suggRadioBtn === "actor") {
    //  check which actor is selected and get their ID
    let personId = $("input[name='actor-radio']:checked").val();
    // call API for movie credits
    getActorCredits(personId);
    // IF THEY WANT TO SEARCH BY DIRECTOR
  } else if (suggRadioBtn === "director") {
    //  get ID of director
    let personId = $("#director-name-value").val();
    console.log("personId in detAPI", personId);
    // call API for directors
    getDirectorCredits(personId);
    // IF THEY WANT TO SEARCH BY GENRE
  } else if (suggRadioBtn === "genre") {
    // check which genre is selected
    let genreIdChoice = $("input[name='genre-radio']:checked").val();
    console.log("#", genreIdChoice);
    // call API for genres
    getMovieListByGenre(genreIdChoice);
  }
}

// window.suggestMovies = suggestMovies;

function getActorCredits(personId) {
  $.ajax({
    url:
      "https://api.themoviedb.org/3/person/" +
      personId +
      "/movie_credits?api_key=820bbe10cb48ba65507b6fe60d8c0d50&language=en-US",
    method: "GET",
  }).then(function (credits) {
    let moviesArray = [];

    for (i = 0; i < credits.cast.length; i++) {
      var filmography = credits.cast[i].title;
      moviesArray.push(filmography);
    }

    console.log(moviesArray);
    localStorage.setItem("moviesArray", JSON.stringify(moviesArray));

    let x = credits.cast.length;
    console.log(x);
    getThreeMovies(moviesArray, x);
  });
}

function getDirectorCredits(personId) {
  $.ajax({
    url:
      "https://api.themoviedb.org/3/person/" +
      personId +
      "/movie_credits?api_key=820bbe10cb48ba65507b6fe60d8c0d50&language=en-US",
    method: "GET",
  }).then(function (credits) {
    let moviesArray = [];

    for (i = 0; i < credits.crew.length; i++) {
      var filmography = credits.crew[i].title;
      moviesArray.push(filmography);
    }

    console.log(moviesArray);
    localStorage.setItem("creditsArray", JSON.stringify(moviesArray));

    let x = credits.crew.length;
    console.log(x);
    getThreeMovies(moviesArray, x);
  });
}

function getMovieListByGenre(genreIdChoice) {
  $.ajax({
    url:
      "https://api.themoviedb.org/3/discover/movie?api_key=820bbe10cb48ba65507b6fe60d8c0d50&language=en-US&include_adult=false&with_genres=" +
      genreIdChoice +
      "",
    method: "GET",
  }).then(function (movieList) {
    let moviesArray = [];

    for (i = 0; i < movieList.results.length; i++) {
      var movie = movieList.results[i].title;
      moviesArray.push(movie);
    }

    console.log(moviesArray);
    localStorage.setItem("moviesArray", JSON.stringify(moviesArray));

    let x = movieList.results.length;
    console.log(x);
    getThreeMovies(moviesArray, x);
  });
}
// Put Posters and Titles of 3 movies from API call into the cards

function getThreeMovies(moviesArray, x) {
  let threeChoices = "";

  for (var i = 1; i <= 3; i++) {
    threeChoices =
      threeChoices + moviesArray[Math.floor(Math.random() * x)] + ", ";
  }

  console.log(threeChoices);

  var choiceArray = threeChoices.split(", ");
  console.log(choiceArray, choiceArray.length);
  // CLEARS PREVIOUS MOVIE SUGGESTIONS
  const movieCards = $("#suggestion-cards");
  movieCards.html("");

  choiceArray.forEach((choice) => {
    // call function that runs OMDB API call
    // THIS IF STATEMENT PREVENTS THE EMPTY SPOT IN THE ARRAY FROM RUNNING
    if (!choice == "") {
      getChoice(choice);
    }
  });
}

function getChoice(choice) {
  // make API call
  $.ajax({
    url: "https://www.omdbapi.com/?t=" + choice + "&apikey=trilogy",
    method: "GET",
  }).then(function (response) {
    console.log("getChoiceRan", response);
    drawCard(response);
  });
}

// TAKES EACH OF THE THREE SUGGESTIONS AND WRITES THE HTML TO DISPLAY IT
function drawCard(response) {
  console.log("drawCardcalled", response);
  const movieCards = $("#suggestion-cards");
  const movieTitle = response.Title;
  const moviePoster = response.Poster;
  const moviePlot = response.Plot;
  let movieCardTemplate = "";

  movieCardTemplate += `<div class="col s4">
  <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img id="image1"class="activator img-responsive"
        src=${moviePoster}>
    </div>
    <div class="card-content">
      <span id="${movieTitle}" class="card-title activator grey-text text-darken-4">${movieTitle}<i
          class="material-icons right">more_vert</i></span>
    </div>
    <div class="card-reveal">
      <span id="title1" class="card-title grey-text text-darken-4">${movieTitle}<i
          class="material-icons right">close</i></span>
      <p id="overview1">${moviePlot}</p>
      <button id="suggestion-one" class="waves-effect waves-light btn">Check Me Out</button>
    </div>
  </div>
</div>`;
  let movieCardsHTML = String(movieCards.html());
  console.log(movieCardsHTML);
  movieCardsHTML += movieCardTemplate;
  movieCards.html(movieCardsHTML);
}

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

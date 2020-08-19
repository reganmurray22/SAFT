// EVENT LISTENERS FOR SEARCH BARS
$("#button1").click((e) => {
  searchMovieBySearchBar(1);
  event.preventDefault();
});
$("#button2").click((e) => {
  searchMovieBySearchBar(2);
  event.preventDefault();
});

//GETS THE MOVIE TITLE FOR THE FIRST MOVIE TO SEARCH
function searchMovieBySearchBar(id) {
  let movieTitle = document
    .getElementById(id === 1 ? "search-cola" : "search")
    .value.toLowerCase()
    .trim();

  callApi(movieTitle);
}

// API CALL TO OMDB FOR FULL MOVIE DATA
callApi = async (movieTitle) => {
  let apiKey = "91eadf893040a861219dbeed5365bc50";
  const response = await fetch(
    `https://www.omdbapi.com/?t=${movieTitle}&apikey=trilogy`
  );

  const responseData = await response.json();
  parseAndUpdateHTML(responseData);
};

function parseAndUpdateHTML(movie) {
  // clears the search bar
  $("#search-cola").val("");
  $("#search").val("");
  // setting your movie section
  var i = 0;
  let actors = movie.Actors.split(", ");
  let genres = movie.Genre.split(", ");
  let director = movie.Director;
  getDirectorId(director);
  document.getElementById("image0")
    ? (document.getElementById("image0").src = movie.Poster)
    : null;
  document.getElementById("title0")
    ? (document.getElementById("title0").innerHTML = movie.Title)
    : null;
  document.getElementById("rating0")
    ? (document.getElementById("rating0").innerHTML =
        "IMDB Rating: " + movie.imdbRating)
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

  const actorRadioBtnHTML = $("#actors-radio-btns");
  const genreRadioBtnHTML = $("#genres-radio-btns");

  actorRadioBtnHTML.html("");
  genreRadioBtnHTML.html("");
  var actorsRadioBtns = "";
  for (var i = 0; i < actors.length; i++) {
    actorsRadioBtns +=
      '<label><input id="actor-radio-btn' +
      i +
      '" class="with-gap" name="actor-radio" type="radio" value="" checked/><span id="actor' +
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
    genresRadioBtns +=
      '<label><input id="genres-radio-btn' +
      i +
      '" class="with-gap" name="genre-radio" type="radio" value="" checked/><span id="genre' +
      i +
      '">' +
      genres[i] +
      "</span></label>";
  }
  const movieCards = $("#suggestion-cards");
  movieCards.html("");

  document
    .getElementById("genres-radio-btns")
    .insertAdjacentHTML("afterbegin", genresRadioBtns);

  $("#card0").removeClass("hide");
  $("#rating-card").removeClass("hide");
  $("#welcomeRow").addClass("hide");
  $("#recommendation-box").removeClass("hide");

  actors.forEach((actor, i) => {
    var personsName = actor.replace(" ", "+");
    $.ajax({
      url:
        "https://api.themoviedb.org/3/search/person?api_key=820bbe10cb48ba65507b6fe60d8c0d50&query=" +
        personsName,
      method: "GET",
    }).then(function (result) {
      var personId = result.results[0].id;

      document
        .getElementById(`actor-radio-btn${i}`)
        .setAttribute("value", personId);
    });
  });

  genres.forEach((genre, i) => {
    const genreArray = JSON.parse(localStorage.getItem("genreArray"));
    let j = 0;
    const genreCode = searchForGenreId(genreArray, genre);

    document
      .getElementById(`genres-radio-btn${i}`)
      .setAttribute("value", genreCode);
  });
}

function searchForGenreId(genreArr, genre) {
  for (i = 0; i <= genreArr.length; i++) {
    if (genreArr[i].genreId === genre) {
      return genreArr[i].genreName;
    }
  }
}

function getDirectorId(director) {
  var personsName = director.replace(" ", "+");
  $.ajax({
    url:
      "https://api.themoviedb.org/3/search/person?api_key=820bbe10cb48ba65507b6fe60d8c0d50&query=" +
      personsName,
    method: "GET",
  }).then(function (result) {
    var personId = result.results[0].id;
    document
      .getElementById("director-name-value")
      .setAttribute("value", personId);
  });
}

// CLICK EVENT FOR 'SUGGEST MOVIES' BUTTON
$("#suggest-movies-btn").on("click", () => {
  const suggRadioBtn = selectRecommendationCriteria();
  determineAPICall(suggRadioBtn);
  // CLEARS PREVIOUS MOVIE SUGGESTIONS
  const movieCards = $("#suggestion-cards");
  movieCards.html("");
});

function selectRecommendationCriteria(e) {
  const suggRadioBtns = $("input[name='suggestion-radios']:checked").val();

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
    // get ID of director
    let personId = $("#director-name-value").val();
    // call API for directors
    getDirectorCredits(personId);
    // IF THEY WANT TO SEARCH BY GENRE
  } else if (suggRadioBtn === "genre") {
    // check which genre is selected
    let genreIdChoice = $("input[name='genre-radio']:checked").val();
    // call API for genres
    getMovieListByGenre(genreIdChoice);
  }
}

// SEARCHES FOR AN ACTOR'S FILMOGRAPHY
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

    getThreeMovies(moviesArray);
  });
}

// SEARCHES FOR A DIRECTOR'S FILMOGRAPHY
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

    getThreeMovies(moviesArray);
  });
}

// GETS A LIST OF MOVIES IN A SPECIFIC GENRE
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

    getThreeMovies(moviesArray);
  });
}

// Recursively chunks down moviesArray to build incomingDetailsArray
function getThreeMovies(moviesArray, incomingDetailsArray) {
  const movieCards = $("#suggestion-cards");
  movieCards.html("");
  // if moviesDetailsArray doesn't exist, create an empty array
  let moviesDetailsArray = [];
  if (incomingDetailsArray) {
    moviesDetailsArray = incomingDetailsArray;
  }
  // Once moviesArray has 3 movies, draw the cards
  if (moviesDetailsArray.length >= 3 || moviesArray.length === 0) {
    drawCards(moviesDetailsArray);
  } else {
    // select a random movie from moviesArray
    const index = Math.floor(Math.random() * moviesArray.length);
    // create a new const with the title of that movie and remove that movie from the moviesArray
    let movieTitle = moviesArray[index];
    moviesArray.splice(index, 1);
    // Calls the API to get the movie details
    $.ajax({
      url: "https://www.omdbapi.com/?t=" + movieTitle + "&apikey=trilogy",
      method: "GET",
    }).then(function (response) {
      // if the movie is found in the API response, add the response to moviesDetailsArray
      if (!response.Error) {
        moviesDetailsArray.push(response);
      }
      getThreeMovies(moviesArray, moviesDetailsArray);
    });
  }
}

// TAKES EACH OF THE THREE SUGGESTIONS AND WRITES THE HTML TO DISPLAY IT
function drawCards(moviesDetailsArray) {
  const movieCards = $("#suggestion-cards");
  let movieCardTemplate = "";
  let buttonIDArr = [];

  for (i = 0; i < 3; i++) {
    const iMDBMovieId = moviesDetailsArray[i].imdbID;
    const movieTitle = moviesDetailsArray[i].Title;
    const moviePoster =
      moviesDetailsArray[i].Poster === "N/A" //if the moviesDetailsArray[i] for poster is N/A, use this image
        ? "https://popcornusa.s3.amazonaws.com/gallery/1576022750-nobody.png"
        : moviesDetailsArray[i].Poster;
    const moviePlot = moviesDetailsArray[i].Plot;
    buttonIDArr.push(moviesDetailsArray[i].imdbID);

    movieCardTemplate += `<div class="col s12 m4">
  <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img id="image1"class="activator img-responsive"
        src=${moviePoster}>
    </div>
    <div class="card-content">
      <span id="${movieTitle}" class="activator grey-text text-darken-4">${movieTitle}<i
          class="material-icons right">more_vert</i></span>
    </div>
    <div class="card-reveal">
      <span id="title1" class="card-title grey-text text-darken-4" style="font-size: 16px; font-weight: 500;">${movieTitle}<i
          class="material-icons right">close</i></span>
      <p id="overview1">${moviePlot}</p>
      <button id="suggestion-${iMDBMovieId}" class="waves-effect waves-light btn" title="${movieTitle}">Check Me Out</button>
    </div>
  </div>
</div>`;
  }
  movieCards.html(movieCardTemplate);
  cardButtonClickAssigner(buttonIDArr);
}

// CLICK EVENT TO PUT A SUGGESTED MOVIE INTO THE MAIN CONTAINER
function cardButtonClickAssigner(buttonIDArr) {
  buttonIDArr.forEach((iMDBMovieId) => {
    $(`#suggestion-${iMDBMovieId}`).on("click", () => {
      const newMovieTitle = $(`#suggestion-${iMDBMovieId}`).attr("title");

      callApi(newMovieTitle);
    });
  });
}

// GETS AN ARRAY OF GENRE IDS FOR FUTURE API CALLS
function setGenreIdArrayInLocalStorage() {
  $.ajax({
    url:
      "https://api.themoviedb.org/3/genre/movie/list?api_key=820bbe10cb48ba65507b6fe60d8c0d50&language=en-US",
    method: "GET",
  }).then(function (result) {
    let genreArray = [];
    for (i = 0; i <= 18; i++) {
      var genreName = result.genres[i].id;
      var genreId = result.genres[i].name;

      let genreObj = { genreName, genreId };
      genreArray.push(genreObj);
    }
    localStorage.setItem("genreArray", JSON.stringify(genreArray));
  });
}

setGenreIdArrayInLocalStorage();

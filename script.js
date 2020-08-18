// *****WE NEED A PREVENT DEFAULT IF THE SEARCH BUTTON IS CLICKED W/ NO TEXT****

$("#button1").click((e) => {
  searchMovieBySearchBar(1);
  event.preventDefault();
});
$("#button2").click((e) => {
  searchMovieBySearchBar(2);
  event.preventDefault();
});
function searchMovieBySearchBar(id) {
  let movieTitle = document
    .getElementById(id === 1 ? "search-cola" : "search")
    .value.toLowerCase()
    .trim();
  console.log(
    document.getElementById(id === 1 ? "search-cola" : "search").value
  );
  callApi(movieTitle);
}

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
  
  $("#card1").removeClass("hide");
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
      // console.log("RESULT => ", result);
      var personId = result.results[0].id;
      // console.log(personId);
      document
        .getElementById(`actor-radio-btn${i}`)
        .setAttribute("value", personId);
    });
  });

  genres.forEach((genre, i) => {
    const genreArray = JSON.parse(localStorage.getItem("genreArray"));
    let j = 0;
    const genreCode = searchForGenreId(genreArray, genre);
    // console.log(genreCode);

    document
      .getElementById(`genres-radio-btn${i}`)
      .setAttribute("value", genreCode);
  });
}

function searchForGenreId(genreArr, genre) {
  for (i = 0; i <= genreArr.length; i++) {
    // genreArr.forEach((genreObj) => {
    // console.log(genreArr[i], genre);
    if (genreArr[i].genreId === genre) {
      // console.log("WE IN IT", genreArr[i].genreName);
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
    // console.log("RESULT => ", result);
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
});

function selectRecommendationCriteria(e) {
  const suggRadioBtns = $("input[name='suggestion-radios']:checked").val();
  // console.log("THIS IS A", suggRadioBtns);
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

    // console.log(moviesArray);
    localStorage.setItem("moviesArray", JSON.stringify(moviesArray));

    let x = credits.cast.length;
    // console.log(x);
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

    // console.log(moviesArray);
    localStorage.setItem("creditsArray", JSON.stringify(moviesArray));

    let x = credits.crew.length;
    // console.log(x);
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

// MAKES API CALL TO GET SUGGESTED MOVIE DATA
function getChoice(choice) {
  // make API call
  $.ajax({
    url: "https://www.omdbapi.com/?t=" + choice + "&apikey=trilogy",
    method: "GET",
  })
    .then(function (response) {
      // console.log("getChoiceRan", response);
      drawCard(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

// TAKES EACH OF THE THREE SUGGESTIONS AND WRITES THE HTML TO DISPLAY IT
function drawCard(response) {
  console.log("drawCardcalled", response);
  if (response.Error) {
    return;
  }
  const iMDBMovieId = response.imdbID;
  const movieCards = $("#suggestion-cards");
  const movieTitle = response.Title;
  const moviePoster =
    response.Poster === "N/A"
      ? "https://popcornusa.s3.amazonaws.com/gallery/1576022750-nobody.png"
      : response.Poster;
  const moviePlot = response.Plot;
  let movieCardTemplate = "";

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
  // let movieCardsHTML = String(movieCards.html());

  // movieCardsHTML += movieCardTemplate;
  movieCards.append(movieCardTemplate);
  cardButtonClickAssigner(iMDBMovieId);
}

// CLICK EVENT TO PUT A SUGGESTED MOVIE INTO THE MAIN CONTAINER
function cardButtonClickAssigner(iMDBMovieId) {
  console.log(iMDBMovieId, "MOVIE TITLE FOR CLICK ASSIGNER");
  $(`#suggestion-${iMDBMovieId}`).on("click", () => {
    // console.log("WI IN HERE", e);
    const newMovieTitle = $(`#suggestion-${iMDBMovieId}`).attr("title");
    // console.log("newMovieTitle", newMovieTitle);
    callApi(newMovieTitle);
  });
}

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
    // console.log(genreArray);
  });
}

setGenreIdArrayInLocalStorage();

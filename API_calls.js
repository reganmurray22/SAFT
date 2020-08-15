/*INTIAL MOVIE CALL - OMDB

Here is the inital API call from OMDB for the movie and all its relevant info. Its hard coded here, 
but "jack_reacher" would be replaced with a variable that would equal the user input.val()
input from user searches for a movie on OMDB, this gets the cast as a string, 
the split() function splits them into an array (split at the commas between their names -THANKS OMDB)
that can be then accessed by an index. I've console.logged the steps as I went to let you see the process.
Then console.logged the index 0 to let you see the result. 
*/


    $.ajax({
        url:"https://www.omdbapi.com/?t=jack_reacher&apikey=trilogy",
        method: "GET"
    }).then(function (movieSearch) {
       var cast = (movieSearch.Actors);
       console.log(cast);

       var castArray = cast.split(", ")
       console.log(castArray);

       var searchActor = castArray[0];
       console.log(searchActor);

    }); 

//      searchActor returns "Tom Cruise"



/*GENRE CALL FROM THEMOVIEDB

Each item we need has its own distinct API call. For genre its THERMOVIEDB:
once live, genre list can be accessed through API call by  result.genres[index].id or result.genres[index].name
for example index = 2, genre = animation. Luckily its not a long list, only 19 categories. 
For working purposes if you'd like to see the list, I've created a genre array so that the list need only be called once, 
then stored in localStorage. JSON.parse(localStorage.getItem("genreArray") will allow you to search and compare it, as well as get
a list of genre ids as an array of objects [object object] {genreName: "Animation", genreId: 2};
*/

    $.ajax({
        url: "https://api.themoviedb.org/3/genre/movie/list?api_key=820bbe10cb48ba65507b6fe60d8c0d50&language=en-US",
        method: "GET"
    }).then(function (result) {
        let genreArray = [];
        for (i=0; i<=18; i++) { 

            var genreName = (result.genres[i].id);
            var genreId = (result.genres[i].name);

            let genreObj = { genreName, genreId }; 
            genreArray.push(genreObj);

        } 
        localStorage.setItem("genreArray", JSON.stringify(genreArray));
        console.log(genreArray);    
        
    });


/* ACTORS/DIRECTOR CALL FOR ID FROM THEMOVIEDB

next, for actors and directors. THEMOVIEDB does not distinguish between actors and directors, 
so this API call searches for an actor/director by their name and then finds their ID which is needed 
to search their individual filmographies. 
*/

var searchActor = "Tom Cruise";
    
    var nameArray = searchActor.split(" ");
    var actorsName = nameArray[0] + "+" +nameArray[1];
       console.log(actorsName);

    $.ajax({
        url:"https://api.themoviedb.org/3/search/person?api_key=820bbe10cb48ba65507b6fe60d8c0d50&query=" + actorsName,
        method: "GET"
    }).then(function (result) {
      
        var personId = result.results[0].id
        console.log(personId);
      
    });

//      personId should return 500

/*ACTORS ONLY!! CALL FOR THEIR CREDITS

You can now call for the actors filmography using their Id.  Actors will have varying lengths of filmographies, 
but credits.cast.length should pull every movie listed under their name.
*/

var personId = 500
   
   $.ajax({
   url:"https://api.themoviedb.org/3/person/" + personId + "/movie_credits?api_key=820bbe10cb48ba65507b6fe60d8c0d50&language=en-US",
   method: "GET"
}).then(function (credits) {
   let creditsArray = [];
   for (i = 0; i < credits.cast.length; i++) {

    var filmography = credits.cast[i].title;
    creditsArray.push(filmography);
    console.log(creditsArray);
    localStorage.setItem("creditsArray", JSON.stringify(creditsArray));
   }

    let x = credits.cast.length;
    console.log(number);

}); 

/*CREATING THREE CHOICES WITHOUT HAVING TO MAKE ANOTHER API CALL USING MATH.RANDOM

console.log(x) returns the length of the array, which in Tom Cruise's case is 74. 
To randomly pull 3 movies from the credits array: use the length of the array and randomize it. The result will be a string, 
use the split() function to once again create an array from which a moie can be selected by index.
*/

let creditsArray = JSON.parse(localStorage.getItem("creditsArray"));

x = 74;
    
let threeChoices = "";
    
    for (var i = 1; i <= 3; i++) {
    threeChoices = threeChoices + creditsArray[Math.floor(Math.random() * x)] + ", ";
    }
    console.log(threeChoices);
    
    var choiceArray = threeChoices.split(", ")
    console.log(choiceArray);
    
    let userChoice = choiceArray[0];
    console.log(userChoice);
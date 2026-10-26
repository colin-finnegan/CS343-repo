/* STEP 1: Given a movie object, copy its main title and subtitles
 * into a titleContent field joined by " - " and return the movie.
 * As an example, given the object:
 *   {
 *     "id":"tt0080684",
 *     "name":{
 *       "title":"Star Wars: Episode V",
 *       "subtitle":"The Empire Strikes Back",
 *       "series":"Star Wars"},
 *     "data":{"rating":"8.8","runtime":"124","year":"1980"}
 *   }
 * The function adds a new field:
 *     "titleContent":"Star Wars: Episode V - The Empire Strikes Back"
 * If there is no subtitle, just use the main title.
 *
 * @param {object} movie A movie object from the JSON data set
 */
function setTitleContent(movie) {
  const newMovie = {
    id: movie.id,
    name: movie.name,
    data: movie.data,
    titleContent: movie.name.title
  };
  newMovie.titleContent = movie.name.title;
  if (movie.name.subtitle) {
    newMovie.titleContent += ` - ${movie.name.subtitle}`;
  }
  return newMovie;
}

/* STEP 2: Given a movie object, append the remaining fields into the
 * titleContent field. Each function should append only the relevant field.
 * Chaining them together would create a titleContent string such as the
 * following:
 *   Mad Max - Fury Road (2015) - 120 minutes [8.1]
 * Make sure to include the correct spacing and punctuation marks.
 *
 * @param {object} movie A movie object from the JSON data set with the
 * title already copied into the movie.titleContent field.
 */
function appendYear(movie) {
  const newMovie = {...movie};
  newMovie.titleContent += ` (${movie.data.year})`;
  return newMovie;
}

function appendRuntime(movie) {
  const newMovie = {...movie};
  newMovie.titleContent += ` - ${movie.data.runtime} minutes`;
  return newMovie;
}

function appendRating(movie) {
  const newMovie = {...movie};
  newMovie.titleContent += ` [${movie.data.rating}]`;
  return newMovie;
}

/* STEP 3: Return a closure (arrow function) that takes a movie argument
 * and compares its .rating field with this function's rating argument.
 * Return true if the movie's rating satisfies this minimum criterion.
 * Note that you need to call parseFloat on the movie.rating field because
 * JSON data defaults to a string type.
 *
 * @param {number} rating The minimum movie rating that will cause the
 * closure to return true for a movie.
 */
function setMinRating(rating) {
  return movie => parseFloat(movie.data.rating) >= rating;
}

/* STEP 3: Complete the following functions just as you did setMinRating.
 * You'll need to use parseInt instead of parseFloat, because these are
 * all integer values.
 */
function setMinYear(year) {
  return movie => parseInt(movie.data.year) >= year;
}
function setMaxYear(year) {
  return movie => parseInt(movie.data.year) <= year;
}
function setMinTime(mins) {
  return movie => parseInt(movie.data.runtime) >= mins;
}
function setMaxTime(mins) {
  return movie => parseInt(movie.data.runtime) <= mins;
}

/* buildItem - Helper function that creates a DOM <li> element, adds the
 * list-group-item class, and inserts the movie's text content. Do not
 * modify. As an example, given the completed movie object from above,
 * this function should create (after just STEP 1):
 *   <li class="list-group-item">Star Wars: Episode V - The Empire Strikes Back</li>
 *
 * The textContent will be longer once STEP 2 is completed. This function
 * will also need to append this new item to the list passed as an argument.
 *
 * @param {object} movie The movie object to create as a list item
 * @param {object} list The <ul> to add the item to
 */
function buildItem(movie, list) {
  let item = document.createElement('li');
  item.classList.add('list-group-item');
  item.textContent = movie.titleContent;
  list.append(item);
}

// STEP 1: Start your anonymous initialization function here. Be sure to
// end the file with the needed syntax to call the function.
(function() {
  // FIRST CODE IN THE INITIALIZATION FUNCTION

  // Get the <ul> object from the HTML (do not modify)
  let ul = document.querySelector('#target');
  
  // Set default values (do not modify)
  let filters = {
    'minyear': 0,
    'maxyear': 3000,
    'mintime': 0,
    'maxtime': 500,
    'minrating': 0.0,
    'inseries': false
  };
  // For STEP 1, only show the first 10 entries
  let number = 10;

  // DO NOT MODIFY:
  // Get the query string and split it into an array of distinct queries.
  // For example, given index.html?minyear=1990&minrating=9.0, the query
  // variable is the array [ 'minyear=1990', 'minrating=9.0' ]. Note that
  // each query value is either one of the fields in the filters variable
  // above or it is 'showall'. If it is 'showall' (STEP 2), you will show
  // all of the movies in the list.
  let query = window.location.search.substring(1); //.split('&');
  if (query === 'showall') {
    number = 500;
  } else if (query !== '') {
    query = query.split('&');
  } else {
    query = undefined;
  }

  // KEEP THIS HARD-CODED TO AVOID CORS ISSUES
  const hostname = 'https://w3.cs.jmu.edu/kirkpams/343/labs/lab7';
  const url = `${hostname}/data.json`;

  // STEP 1: Fetch the JSON data from the URL. If the query string is empty
  // (i.e., query is undefined), grab just the first 10 data entries. Given
  // this array, use .map to call setTitleContent on each entry and .forEach
  // to call buildItem for each. You may NOT use a traditional loop (e.g.,
  // for-of, while, etc.) for this lab.
  //
  // STEP 2: Extend the movie's titleContent by using .map with the additional
  // functions to append the year, runtime, and rating values.
  //
  // HINT: STEPS 1 and 2 together should be at most 9 lines (not including the
  // functions defined above).
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let movies = data;
  // STEP 3: If the query variable is defined, then the URL contains a query
  // string of criteria. Use the criteria specified in the query string to
  // filter the data. Each criterion would be of the form minyear=2000, with
  // the criteria being minyear, maxyear, mintime, maxtime, or minrating. Use
  // the values here to change the default minYear, etc., listed above. Note
  // that you will need to use parseInt or parseFloat to convert the query
  // string value into a number. For the last (optional) step, the inseries
  // value is a boolean, so it should not be parsed.
  if (query && Array.isArray(query)) {
    query.forEach(q => {
      const [key, value] = q.split('=');
      if (key in filters) {
        if (key === 'minrating') {
          filters[key] = parseFloat(value);
        } else if (key === 'inseries') {
          filters[key] = value === 'true';
        } else {
          filters[key] = parseInt(value);
        }
      }
    });

    movies = movies
      .filter(setMinYear(filters.minyear))
      .filter(setMaxYear(filters.maxyear))
      .filter(setMinTime(filters.mintime))
      .filter(setMaxTime(filters.maxtime))
      .filter(setMinRating(filters.minrating));
    
    if (filters.inseries) {
      movies = movies.filter(movie => movie.name.series);
    }
  } else {
    movies = movies.slice(0, number);
  }
  movies = movies
    .map(setTitleContent)      
    .map(appendYear)          
    .map(appendRuntime)       
    .map(appendRating);  

  ul.innerHTML = '';
  movies.forEach(movie => buildItem(movie, ul));

  const targetLabel = document.getElementById('target-label');
  targetLabel.textContent = `Number of entries: ${movies.length} movies`;
})
.catch(error => {
  console.error('Error fetching data:', error);
  document.getElementById('target-label').textContent = 'Error loading movies';
  });
})();
  // Once you've processed all of the filter criteria, run the full JSON data
  // set through these using .filter, then use .map and .forEach as before to
  // generate the data.

  // END OF THE INITIALIZATION FUNCTION

var http = require("https");

const actions = {};

// Database queries
const resolveQuery = function (pool, res, queryString) {
  pool.query(queryString, function(err, rows, fields) {
    if (!err) {
      res.json(rows);
    }
    else {
      console.log('Error while performing Query:', err);
      res.json(err);
    }
  });
}

const getMovies = function (pool, res) {
  const queryString = 'SELECT * FROM movies';
  resolveQuery(pool, res, queryString);
}

const getUsers = function (pool, res) {
  const queryString = 'SELECT * FROM users';
  resolveQuery(pool, res, queryString);
}

const getReviewsByMovie = function (pool, res, movieId) {
  const queryString = 'SELECT r.*, u.Username ' + 
                        'FROM reviews r INNER JOIN user_review_entries ure ON r.ID=ure.ReviewID ' +
                        'INNER JOIN users u ON u.ID = ure.UserID WHERE ure.MovieID=' + movieId;
  resolveQuery(pool, res, queryString);
}



// Database population
const insertMovie = function (pool, movie) {
  // insert production company first
  const production_website = 'www.' + movie.production.name + '.com';
  const prodString = 'INSERT INTO Productions (ID, Name, Website) VALUES ?'
  const prodValues = [[movie.production.id, movie.production.name, production_website]];
  pool.query(prodString, [prodValues], function(err, result) {
    if (err) {
      console.log('Error while performing Insert:', err);
    }
  });

  // insert the movie
  const movieString = 'INSERT INTO Movies (ID, Title, Description, ReleaseDate, Length, ImageUrl, ProductionID) VALUES ?'
  const movieValues = [[movie.id, movie.title, movie.overview, movie.release_date, movie.length, movie.imageUrl, movie.production.id]];
  pool.query(movieString, [movieValues], function(err, result) {
    if (!err) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log('Error while performing Insert:', err);
    }
  });
}


// Import More Data using themoviedb api
const importData = function (pool) {
  const apiKey = '?api_key=724402db4d243c4c28e6865752596f4d';
  const imageApi = 'https://image.tmdb.org/t/p/w500';

  // Get movies that are Now Playing
  let options = {
    "method": "GET",
    "hostname": "api.themoviedb.org",
    "port": null,
    "path": "/3/movie/now_playing?page=1&language=en-US&api_key=724402db4d243c4c28e6865752596f4d",
    "headers": {}
  };

  const req = http.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      body = JSON.parse(body);
      
      // for each obtained movie, get and populate its production company
      body.results.map(function (movie) {
        options.path = "https://api.themoviedb.org/3/movie/" + movie.id + apiKey;
        
        const prodreq = http.request(options, function (response) {
          response.on("data", function (data) {
            data = JSON.parse(data);
            movie.production = data.production_companies[0];
            movie.length = data.runtime;
            movie.imageUrl = imageApi + movie.poster_path;

            // console.log(JSON.stringify(movie.production.name, null, 2));
            if (movie.production) {
              insertMovie(pool, movie);
            }
          });
        });

        prodreq.write("{}");
        prodreq.end();
      });

    });
  });
  
  req.write("{}");
  req.end();
}

actions.getMovies = getMovies;
actions.getUsers = getUsers;
actions.getReviewsByMovie = getReviewsByMovie;
actions.importData = importData;

module.exports = actions;
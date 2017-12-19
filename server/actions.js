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

const authenticate = function (pool, res, username, password) {
  const queryString = 'SELECT * FROM users u WHERE u.Username="'+username+'" AND u.Password="'+password+'"';
  resolveQuery(pool, res, queryString);
}

const getUsers = function (pool, res) {
  const queryString = 'SELECT * FROM users';
  resolveQuery(pool, res, queryString);
}

const getMovies = function (pool, res) {
  const queryString = 'SELECT * FROM movies';
  resolveQuery(pool, res, queryString);
}

const getReviewsByMovie = function (pool, res, movieId) {
  const queryString = 'SELECT r.*, u.Username ' + 
                        'FROM reviews r INNER JOIN user_review_entries ure ON r.ID=ure.ReviewID ' +
                        'INNER JOIN users u ON u.ID = ure.UserID WHERE ure.MovieID=' + movieId;
  resolveQuery(pool, res, queryString);
}

const getReviewsByUserId = function (pool, res, userId) {
  const queryString = 'SELECT r.*, u.Username, m.Title, m.ImageUrl, p.Name as ProductionCompany ' + 
                        'FROM reviews r INNER JOIN user_review_entries ure ON r.ID=ure.ReviewID ' +
                        'INNER JOIN users u ON u.ID = ure.UserID ' + 
                        'INNER JOIN movies m ON m.ID = ure.MovieID INNER JOIN productions p ON p.ID = m.ProductionID ' +
                        'WHERE ure.UserID=' + userId;
  resolveQuery(pool, res, queryString);
}

// Database population
const insertReview = function (pool, res, userid, movieid, content, score, sentiment) {
  let reviewString = 'INSERT INTO Reviews (Description, Score, Sentiment) VALUES ?'
  let reviewValues = [[content, score, sentiment]];
  pool.query(reviewString, [reviewValues], function(err, result) {
    if (err) {
      console.log('Error while performing Insert:', err);
    } else {
      reviewString = 'INSERT INTO user_review_entries (ReviewID, UserID, MovieID) VALUES ?';
      let reviewValues = [[result.insertId, userid, movieid]];
      pool.query(reviewString, [reviewValues], function(err, result) {
        if (err)
        console.log('Error while performing Insert:', err);
      else
        res.json(result); 
      });
    }
  });
}

const deleteReview = function(pool, res, reviewid) {
  let reviewString = 'DELETE FROM user_review_entries WHERE ReviewID=' + reviewid;
  pool.query(reviewString, function(err, result) {
    if (err) {
      console.log('Error while performing Delete:', err);
    } else {
      reviewString = 'DELETE FROM reviews WHERE ID=' + reviewid;
      pool.query(reviewString, function(err, result) {
        if (err)
          console.log('Error while performing Delete:', err);
        else
          res.json(result); 
      });
    }
  });
}

const updateReview = function (pool, res, reviewid, content) {
  let reviewString = 'UPDATE Reviews SET Description=\'' + content + '\' WHERE ID=\'' + reviewid + '\'';
  let reviewValues = [[content]];
  pool.query(reviewString, [reviewValues], function(err, result) {
    if (err) {
      console.log('Error while performing Update:', err);
    } else {
      res.json(result);
    }
  });
}

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
const importLatest = function (pool) {
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
            
            if (movie.production) {
              console.log(JSON.stringify(movie.production.name, null, 2));
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

actions.authenticate = authenticate;
actions.getUsers = getUsers;
actions.getMovies = getMovies;
actions.getReviewsByMovie = getReviewsByMovie;
actions.getReviewsByUserId = getReviewsByUserId;
actions.insertReview = insertReview;
actions.deleteReview = deleteReview;
actions.updateReview = updateReview;
actions.importLatest = importLatest;

module.exports = actions;
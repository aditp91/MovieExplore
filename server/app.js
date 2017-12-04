const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const config = require('./config.json');
const actions = require('./actions');

const app = express();
const router = express.Router();
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});
// Apply crossdomain resource handling for all requests
app.use(allowCrossDomain);

// config db ====================================
let key = 'development';
const db = config.db;
const pool = mysql.createConnection({
  host: db[key].host,
  user: db[key].user,
  password: db[key].password,
  port: db[key].port,
  database: db[key].database
});
pool.connect(function(err) {
  if (err)
    console.error('error connecting: ' + err.stack);
  else
    console.log('connected as id ' + pool.threadId);
});
pool.query('USE movie_explore');


// API route middleware that will happen on every request
router.use((req, res, next) => {
  // log each request to the console & continue doing what we were doing
  // console.log(req.method, req.url);
  next();
});

router.get('/authenticate/:username/:password', (req, res) => {
  actions.authenticate(pool,res,req.params.username, req.params.password);
});

router.get('/getUsers', (req, res) => {
  actions.getUsers(pool,res);
});

router.get('/getMovies', (req, res) => {
  actions.getMovies(pool,res);
});

router.get('/getReviewsByMovie/:id', (req, res) => {
  actions.getReviewsByMovie(pool,res,req.params.id);
});

router.get('/getReviewsByUserId/:id', (req, res) => {
  actions.getReviewsByUserId(pool,res,req.params.id);
});

router.get('/submitReview/:userid/:movieid/:content/:score/:sentiment', (req, res) => {
  actions.insertReview(pool,req.params.userid, req.params.movieid, req.params.content, req.params.score, req.params.sentiment);
});

router.get('/deleteReview/:reviewid', (req, res) => {
  actions.deleteReview(pool,req.params.reviewid);
});

router.get('/importLatest', (req, res) => {
  actions.importLatest(pool);
  res.json("received request for import");
});

app.use('/api', router);

module.exports = app;
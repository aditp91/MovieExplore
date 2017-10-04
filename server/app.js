const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const config = require('./config.json')
const webpack = require('webpack');

const app = express();
const router = express.Router();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));
// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
 publicPath: webpackConfig.output.publicPath,
 quiet: true
})


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
  console.log(req.method, req.url);
  next();
});

router.get('/getViewers', (req, res) => {
  console.log('Got the request');
  // build the query and send mysql request
  const queryString = 'SELECT * FROM viewers'
  pool.query(queryString, function(err, rows, fields) {
    if (!err) {
      res.json(rows);
    }
    else {
      console.log('Error while performing Query:', err);
      res.json(err);
    }
  });

  pool.end();
});

app.use('/api', router);


module.exports = app;
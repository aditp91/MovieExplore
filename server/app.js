const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');

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


// config db ====================================
const host = "studentweb.comminfo.rutgers.edu";
const user = "adithyap";
const pwd = "4.g?3U6oTH.i";
const dbname = "class-2017-9-17-610-557-01_adithyap";
const pool = mysql.createConnection({
  host: '127.0.0.1',
  user: user,
  password: pwd,
  port: '3306',
  database: dbname
});
pool.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// route middleware that will happen on every request
router.use((req, res, next) => {
      // log each request to the console
      console.log(req.method, req.url);
      // continue doing what we were doing and go to the route
      next();
  });

router.get('/helloworld', (req, res) => {
  // build the query and send mysql request
  const queryString = 'SELECT * FROM accounts'

  pool.query(queryString, function(err, rows, fields) {
    if (!err)
      console.log('The solution is: ', rows);
    else
      console.log('Error while performing Query:', err);
 });

  res.json("successful response!");

  pool.end();
});


app.use('/api', router);

module.exports = app;
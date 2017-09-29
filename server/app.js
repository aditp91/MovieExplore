const express = require('express');
const morgan = require('morgan');
const path = require('path');

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



// route middleware that will happen on every request
router.use((req, res, next) => {
      // log each request to the console
      console.log(req.method, req.url);
      // continue doing what we were doing and go to the route
      next();
  });
  
router.get('/helloworld', (req, res) => {
  res.json("successful response!");
});

app.use('/api', router);





module.exports = app;
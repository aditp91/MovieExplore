'use strict';

const app = require('./app');

const PORT = process.env.PORT || 9000;

app.get('/api/helloworld', (req, res) => {
  console.log("trying to send back a res");
  res.json("successful response!");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
const express = require('express');
const config = require('./config');
const app = express();

app.use(express.static('public'));
app.use(express.json());


// ROUTES FOR THE APP
const jokeRouter = require("./routes/otherjokes");
app.use('/api/jokes', jokeRouter);

const othersitesRouter = require("./routes/othersites");
app.use('/api/othersites', othersitesRouter);

// START THE SERVER
const port = process.env.PORT || config.localPort;
app.listen(port);
console.log('Listening on port ' + port + ' ...');

module.exports = app; // pga. test
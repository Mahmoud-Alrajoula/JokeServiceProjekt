const mongoose = require('mongoose');
const schema = mongoose.Schema;

const joke = new mongoose.Schema({
  setup: String,
  punchline: String
});

joke.methods.printJoke = function () {
  console.log(this.setup);
  console.log(this.punchline);
};

joke.methods.toString = function () {
  return this.setup + ", " + this.punchline;
};

module.exports = mongoose.model('Joke', joke);

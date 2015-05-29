var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');

var PollsSchema = new mongoose.Schema({
    question: String,
    answers: [ Answer.schema ]

});

mongoose.model('Poll', PollsSchema);
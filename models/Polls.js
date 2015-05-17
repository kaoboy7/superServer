var mongoose = require('mongoose');
var Answer = mongoose.model('Answer');

var PollsSchema = new mongoose.Schema({
    question: String,
    // answers: [{answer: String, votes: Number }]
    // answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }]

    answers: [ Answer.schema ]

});

mongoose.model('Poll', PollsSchema);
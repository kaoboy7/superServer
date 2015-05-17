var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
    answer: String,
    votes: {type: Number, default: 0}
});

AnswerSchema.methods.upvote = function(cb) {
    this.votes += 1;
    this.save(cb);
};

mongoose.model('Answer', AnswerSchema);
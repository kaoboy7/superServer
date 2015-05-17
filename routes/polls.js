var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var Answer = mongoose.model('Answer');

router.param('poll', function(req, res, next, id) {

  Poll.findById(id, function(err, poll) {
    if (err) {
      return next(err);
    }

    if (!poll) {
      return next(new Error('can\'t find poll'));
    }

    req.poll = poll;
    return next();
  });

});

router.param('answer', function(req, res, next, id) {
  console.log("answer id=" + id);

  Answer.find({}, function(err, answer) {
    if (err) {
      return next(err);
    }

    if (!answer) {
      return next(new Error('can\'t find answer'));
    }

    console.log("JSON");

    console.log(answer);
    console.log(JSON.stringify(answer));

    // res.json(answer);
    
  });


  Answer.findById(id, function(err, answer) {
    if (err) {
      return next(err);
    }

    if (!answer) {
      return next(new Error('can\'t find answer'));
    }

    req.answer = answer;
    return next();

  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {

  Poll.find({}, function(err, poll) {
    if (err) {
      return next(err);
    }

    if (!poll) {
      return next(new Error('can\'t find poll'));
    }

    res.json(poll);
    
  });

  // res.setHeader('Content-Type', 'application/json');
  // res.end(JSON.stringify({ hello : "world"}));
});

router.get('/:poll', function(req, res, next) {

  Poll.findById(req.params.poll, function(err, poll) {
    if (err) {
      return next(err);
    }

    if (!poll) {
      return next(new Error('can\'t find poll'));
    }

    res.json(poll);
  });

});

router.put('/:poll', function(req, res, next) {

  var poll = new Poll(req.body);
  var updateData =poll.toObject();
  delete updateData._id;
  Poll.update({_id: req.params.poll}, updateData, {upsert: true}, function(err){
    if (err) {
      return next(err);
    }
  });

  res.json(poll);
});

router.delete("/:poll", function(req, res, next) {
  Poll.findByIdAndRemove(req.params.poll, function(err) {
    if (err) {
      return next(err);
    }
  });

  res.send('Deleted successfully: ' + req.params.poll);
});

router.post('/', function(req, res, next) {

  console.log(JSON.stringify(req.body));

    // Create new poll
    var poll = new Poll();
    poll.question = req.body.question;
    poll.answers = [];


    // Add answers to poll
    var answerArray = req.body.answers;
    for (var i = 0; i < answerArray.length; i++) {
      poll.answers.push({answer: answerArray[i].answer});
    }
    // Save
    poll.save(function(err, poll) {
      if (err) {
        return next(err);
      }
      res.json(poll);
    });

    // Add answers to poll
    // var answerArray = req.body.answers;
    // for (var i = 0; i < answerArray.length; i++) {
    //   var answer = new Answer({answer: answerArray[i].answer});
    //   answer.save(function(err, answer) {
    //     if (err) {
    //       return next(err);
    //     }
    //   });

    //   console.log("This is answer.answer=" + answer.answer);
    //   poll.answers.push(answer);
    //   // Save

    // }

  });

router.put('/:poll/answers/:answer/upvote', function(req, res, next) {



  req.answer.upvote(function(err, post) {
    if (err) { return next(err); }
    res.json(post);
  });

  // var poll = new Poll(req.body);
  // var updateData =poll.toObject();
  // delete updateData._id;
  // Poll.update({_id: req.params.poll}, updateData, {upsert: true}, function(err){
  //   if (err) {
  //       return next(err);
  //   }
  // });

  // res.json(poll);


});




module.exports = router;
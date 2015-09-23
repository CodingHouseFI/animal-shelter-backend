var express = require('express');
var router = express.Router();

var Animal = require('../models/animal');

router.get('/', function(req, res) {
  Animal.find({}, function(err, animals) {
    res.status(err ? 400 : 200).send(err || animals);
  });
});

router.post('/', function(req, res) {
  Animal.create(req.body, function(err, animal) {
    res.status(err ? 400 : 200).send(err || animal);
  });
});

router.put('/:mongoId', function(req, res) {
  Animal.update({_id: req.params.mongoId}, req.body, function(err, animal) {
    if(err || !animal) {
      res.status(400).send(err);
    } else {
      res.send(animal);
    }
  });
});

router.delete('/:mongoId', function(req, res) {
  Animal.findByIdAndRemove(req.params.mongoId, function(err, animal) {
    if(err || !animal) {
      res.status(400).send(err);
    } else {
      res.send();
    }
  });
});

module.exports = router;

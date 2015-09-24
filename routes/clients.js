var express = require('express');
var router = express.Router();

var Client = require('../models/client');
var Animal = require('../models/animal');

router.get('/', function(req, res) {
  Client.find({}, function(err, clients) {
    res.status(err ? 400 : 200).send(err || clients);
  });
});

router.post('/', function(req, res) {
  var client = new Client(req.body);
  client.save(function(err, client) {
    res.status(err ? 400 : 200).send(err || client);
  });
});

// router.put('/adopt', function(req, res) {
router.put('/:clientId/adopt/:animalId', function(req, res) {
  Client.findById(req.params.clientId, function(err, client) {
    Animal.findById(req.params.animalId, function(err, animal) {
      if(client.pets.indexOf(req.params.animalId) !== -1){
        res.status(400).send('you already have that animal!')
      } else {
        client.pets.push(animal._id);
        animal.isAvailable = false;
        client.save(function(err, savedClient) {
          animal.save(function(err, savedAnimal){
            res.send(savedClient);
          });
        });        
      }
    });
  });
});

router.put('/:clientId/unadopt/:animalId', function(req, res) {
  Client.findById(req.params.clientId, function(err, client) {
    Animal.findById(req.params.animalId, function(err, animal) {
      if( client.pets.indexOf(animal._id) === -1){
        res.status(400).send("client doesn't have that animal");
      } else {
        animal.isAvailable = true;
        client.pets.splice(client.pets.indexOf(animal._id), 1);
        client.save(function(err, savedClient) {
          animal.save(function(err, savedAnimal){
            res.send(savedClient);
          });
        }); 
      }
    });
  });
});

router.get('/:mongoId', function(req, res) {
  Client.findById(req.params.mongoId, function(err, client){
    res.send(client);
  }).populate('pets');
});

router.put('/:mongoId', function(req, res) {
  Client.update({_id: req.params.mongoId}, req.body, function(err, client) {
    if(err || !client) {
      res.status(400).send(err);
    } else {
      res.send(client);
    }
  });
});

router.delete('/:mongoId', function(req, res) {
  Client.findByIdAndRemove(req.params.mongoId, function(err, client) {
    if(err || !client) {
      res.status(400).send(err);
    } else {
      res.send();
    }
  });
});

module.exports = router;

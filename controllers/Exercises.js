// load web framework
const express = require('express');
// load models/index.js for all models in database
const db = require('../models');
// load router to export routes to /index.js
const router = express.Router();

// get all excercises
router.get('/', (req, res) => {
  db.Exercise.find({})
    .then(results => {
      if (results.length) {
        res.status(200).send({ exercises: results });
      }
      else {
        res.status(404).send({ err: 'no exercises found' });
      }
    })
    .catch(err => {
      res.status(503).send({ err: 'DB query err while finding all exercises' });
    });
});

// get one exercise by sending its id as a param
router.get('/one/:exerciseId', (req, res) => {
  db.Exercise.findById(req.params.exerciseId)
    .then(result => {
      if (result) {
        res.status(200).send({ exercise: result });
      }
      else {
        res.status(400).send({ err: 'Exercise not found' });
      }
    })
    .catch(err => {
      res.status(503).send({ err: 'DB Query err' });
    });
});

router.post('/', (req, res) => {
  db.Exercise.create(req.body)
    .then(newEx => {
      if (newEx) {
        res.status(201).send({ success: 'Exercise created' });
      }
      else {
        res.status(400).send({ err: 'Unable to create ex with that data' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ err: 'DB err in create ex query' });
    });
});

module.exports = router;

// load web framework
const express = require('express');
// load models/index.js for all models in database
const db = require('../models');
// load router to export routes to /index.js
const router = express.Router();

// given a client's id, returns prescription and assigned exercises
router.get('/', (req, res) => {
  db.Prescription.find({
    where: { client: req.body.id }
  })
    .populate('assignedExercises')
    .then(result => {
      if (result !== []) {
        res.status(200).send({ prescription: result });
      }
      else {
        res.status(400).send({ err: 'No prescription found for that client' });
      }
    })
    .catch(err => {
      res.status(503).send({ err: 'DB Query err' });
    });
});

// NOTE not populating assigned exercises, just an overview
router.get('/by/provider', (req, res) => {
  db.Prescription.find({
    where: { provider: req.body.id }
  })
    .then(results => {
      res.status(200).send({ prescriptions: results });
    })
    .catch(err => {
      res.status(400).send({ err: 'Undocumented err' });
    });
});

// TODO figure out how to use this, syntax-wise, with jon
// TODO upgrade this hacky implementation
router.post('/', (req, res) => {
  db.Prescription.create(req.body)
    .then(newEx => {
      res.status(201).send({ success: 'Prescription created' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ err: 'Undocumented error' });
    });
});

module.exports = router;

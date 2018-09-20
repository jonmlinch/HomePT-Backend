// load web framework
const express = require('express');
// load models/index.js for all models in database
const db = require('../models');
// load router to export routes to /index.js
const router = express.Router();

// returns an array of prescriptions written by provider
// NOTE not returning assigned exercises, just an overview
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

// given data for a prescription and its assigned exercises, creates it
router.post('/', (req, res) => {
  // TODO make sure req.body is clean
  console.log('req.body is', req.body);
  const input = req.body;
  // TODO process input, if needed
  // TODO create all assigned exercises here OR use a hook in Prescription
  // TODO create prescription using input (all of it or partial?)
  db.Prescription.create(input)
    .then(newEx => {
      res.status(201).send({ success: 'Prescription created' });
    })
    .catch(err => {
      console.log(err);
      res.status(503).send({ err: 'Could not create prescription' });
    });
});

module.exports = router;

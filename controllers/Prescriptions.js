// load web framework
const express = require('express');
// load models/index.js for all models in database
const db = require('../models');
// load router to export routes to /index.js
const router = express.Router();

router.get('/prescriptions', (req, res) => {
  // TODO figure out if populating is good or not here
  db.Prescription.find({})
    .then(results => {
      res.status(200).send({ prescriptions: results });
    })
    .catch(err => {
      res.status(400).send({ err: 'Undocumented err' });
    });
});

router.get('/prescriptions/by/client', (req, res) => {
  db.Prescription.find({
    where: { client: req.body.id }
  })
    .populate('assignedExcercises')
    .then(result => {
      res.status(200).send({ prescription: result });
    })
    .catch(err => {
      res.status(400).send({ err: 'Undocumented err' });
    });
});

router.get('/prescriptions/by/provider', (req, res) => {
  db.Prescription.find({
    where: { provider: req.body.id }
  })
    .then(results => {
      res.status(200).send({ exercises: results });
    })
    .catch(err => {
      res.status(400).send({ err: 'Undocumented err' });
    });
});

// TODO upgrade this hacky implementation
router.post('/prescriptions', (req, res) => {
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

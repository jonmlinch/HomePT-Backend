// load web framework
const express = require('express');
// load models/index.js for all models in database
const db = require('../models');
// load router to export routes to /index.js
const router = express.Router();

router.get('/prescripts', (req, res) => {
  db.Prescript.find({})
    .then(results => {
      res.status(200).send({ prescripts: results });
    })
    .catch(err => {
      res.status(400).send({ err: 'Undocumented err' });
    });
});

router.get('/prescriptions/:clientId', (req, res) => {
  db.Prescript.find({
    where: { client: clientId }
  })
    .then(results => {
      res.status(200).send({ exercises: results });
    })
    .catch(err => {
      res.status(400).send({ err: 'Undocumented err' });
    });
});

router.get('/prescriptions/:providerId', (req, res) => {
  db.Prescript.find({
    where: { provider: providerId }
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
  db.Prescript.create(req.body)
    .then(newEx => {
      res.status(201).send({ success: 'Prescript created' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ err: 'Undocumented error' });
    });
});

module.exports = router;

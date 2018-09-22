const express = require('express');
const router = express.Router();

const db = require('../models');

// returns a User's active prescription and its assigned exercises
router.get('/prescription/:clientId', (req, res) => {
  // include all data associated with prescription
  db.User.findById(req.params.clientId)
    .populate('prescription')
    .populate({
      path: 'prescription',
      populate: { path: 'assignedExercises' }
    })
    .populate({
      path: 'prescription',
      populate: { path: 'assignedExercises',
        populate: { path: 'exercise' }}
    })
    .then(result => {
      if (result) {
        console.log(result.prescription)
        res.status(200).send({ result: result })
      }
      else {
        res.status(404).send({ err: 'User not found' });
      }
    })
    .catch(err => {
      console.log('err in db query:', err);
    });
});

// route for providers to get a list of all their clients
router.get('/clients/:providerId', (req, res) => {
  console.log('PARAMS', req.params)
  db.User.find({provider: req.params.providerId})
    .then(results => {
      if (results.length) {
        return res.status(200).send({ clients: results });
      }
      else {
        res.status(404).send({ err: 'No clients found' });
      }
    })
    .catch(err => {
      console.log('err in db query:', err);
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/by/email', (req, res) => {
  db.User.findOne({
    where: { email: req.body.email }
  })
    .then(user => {
      if (user) {
        res.status(200).send({ user });
      }
      else {
        res.status(400).send({ err: 'User not found' });
      }
    })
    .catch(err => {
      res.status(503).send({ err: 'DB Query err' });
    });
});

// TODO syntax for populating active exercises
// returns a User's active prescription and its assigned exercises
router.get('/prescription/:clientId', (req, res) => {
  db.User.findById(req.params.clientId)
    .populate('prescription')
    .populate({
      path: 'prescriptions',
      populate: { path: 'assignedExercises' }
    })
    .then(result => {
      if (result) {
        res.status(200).send({ result: result })
      }
      else {
        res.status(400).send({ err: 'User not found' });
      }
    })
    .catch(err => {
      console.log('err in db query:', err);
    });
});

// TODO determine usefulness & update syntax
router.get('/prescription/by/email', (req, res) => {
  db.User.find({ where: { email: req.body.email } })
    .populate('prescription')
    .populate('assignedExercises')
    .then(result => {
      if (result) {
        res.status(200).send({ prescription: result.prescription })
      }
      else {
        res.status(400).send({ err: 'User not found' });
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
      if (results !== []) {
        console.log('RESULT ARRAY', results)
        return res.status(200).send({ clients: results });
      }
      else {
        res.status(400).send({ err: 'No clients found' });
      }
    })
    .catch(err => {
      console.log('err in db query:', err);
    });
});

module.exports = router;


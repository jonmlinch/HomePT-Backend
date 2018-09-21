// load web framework
const express = require('express');
// load models/index.js for all models in database
const db = require('../models');
// load router to export routes to /index.js
const router = express.Router();
// load async
const async = require('async');

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
router.post('/', async (req, res) => {
  console.log('req.body in create prescript is', req.body);
  // get provider's id
  const providerId = req.body.providerId;
  // get client's id
  const clientId = req.body.clientId;
  // get array of to-be assigned exercise objects
  const exsToAssign = req.body.prescriptionData;
  // create an AssignedExercise for each prescribed ex
  async.each(exsToAssign, async function(ex, done) {
    // setup data for create
    const createData = {
      client: clientId,
      exercise: ex.exerciseId,
      reps: ex.repInfo,
      freq: ex.freqInfo
    }
    // TODO can i use catch with await?
    await db.AssignedExercise.create(ex);
    done();
  }, function() {
    // TODO create prescription, NOTE prescription will assign itself as active
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

});

router.patch('/', (req, res) => {
  db.Prescription.findById(req.body.id)
    .then(result => {
      if (result) {
        // TODO result.update(req.body)
      }
      else {
        res.status(404).send({ err: 'Prescription not found' });
      }
    })
    .catch(err => {
      res.status(503).send({ err: 'DB Query err' });
    });
});

module.exports = router;

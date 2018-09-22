// load web framework
const express = require('express');
// load models/index.js for all models in database
const db = require('../models');
// load router to export routes to /index.js
const router = express.Router();
// load async
const async = require('async');

// given data for a prescription and its assigned exercises, creates it
router.post('/', async (req, res) => {
  console.log('req.body in create prescript is', req.body);
  // get provider's id
  const providerId = req.body.providerId;
  // get client's id
  const clientId = req.body.clientId;
  // get array of to-be assigned exercise objects
  const exsToAssign = req.body.prescriptionData;
  const assignedExs = [];
  // create an AssignedExercise for each prescribed ex
  async.each(exsToAssign, function(ex, done) {
    // setup data for create
    const createData = {
      provider: providerId,
      client: clientId,
      exercise: ex.exerciseId,
      reps: ex.repInfo,
      freq: ex.freqInfo
    }
    db.AssignedExercise.create(createData)
      .then(success => {
        console.log('success return of creating AE is:', success);
        assignedExs.push(success.id);
        done();
      })
      .catch(err => {
        console.log('err creating AE:', err);
        done();
      });
  }, function() {
    // TODO add AEs to prescription
    console.log('list of AEs to add:', assignedExs);
    const createData = {
      provider: providerId,
      client: clientId,
      assignedExercises: assignedExs
    }
    db.Prescription.create(createData)
      .then(success => {
        res.status(201).send({ success: 'Prescription created' });
        console.log('finished successfully creating prescription');
      })
      .catch(err => {
        console.log(err);
        res.status(503).send({ err: 'Could not create prescription' });
        console.log('finished unsuccessfully creating prescription');
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

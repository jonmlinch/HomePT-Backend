// load web framework
const express = require('express');
// load models/index.js for all models in database
const db = require('../models');
// load router to export routes to /index.js
const router = express.Router();

// NOTE provider and client access (unqiue providers & clients)
router.get('/', (req, res) => {
  db.Comment.find({
    where: { client: req.body.id }
  })
    .then(results => {
      // ensure a comment was found
      if (results.length) {
        res.status(200).send({ comments: results });
      }
      else {
        res.status(404).send({ err: 'Comment not found' });
      }
    })
    .catch(err => {
      res.status(503).send({ err: 'DB query err for fetching comment' });
    });
});

// NOTE client only
router.post('/', (req, res) => {
  // TODO process data
  const feedbackData = {
    RPEData: req.body.RPEData,
    pain: req.body.pain,
    painLocation: req.body.painLocation,
    painSeverity: req.body.painSeverity,
    addlComments: req.body.addlComments
  }
  const createData = {
    provider: req.body.providerId,
    client: req.body.clientId
  };
  db.Comment.create(createData)
    .then(newComment => {
      console.log('newComment is', newComment);
      newComment.feedback = feedbackData;
      console.log('newComment.feedback is:', newComment.feedback);
      newComment.save();
      res.status(201).send({ success: 'Comment created' });
    })
    .catch(err => {
      console.log(err);
      res.status(503).send({ err: 'Create comment query err' });
    });
});

router.delete('/', (req, res) => {
  db.Comment.deleteOne({ where: { id: req.body.id } })
    .then(result => {
      if (result) {
        console.log('successfully deleted Comment:', result);
        res.status(204).send({ success: 'Comment deleted' });
      }
      else {
        console.log('could not find comment to delete');
        res.status(404).send({ err: 'Comment not found' });
      }

    })
    .catch(err => {
      console.log('err in del act of Comment');
      res.status(503).send({ err: 'Delete query for Comment failure' });
    });
});

module.exports = router;

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
      res.status(200).send({ comments: results });
    })
    .catch(err => {
      res.status(400).send({ err: 'Undocumented err' });
    });
});

// NOTE client only
router.post('/', (req, res) => {
  // TODO process data
  const createData = { };
  db.Comment.create(createData)
    .then(newEx => {
      res.status(201).send({ success: 'Comment created' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ err: 'Undocumented error' });
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

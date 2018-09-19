// load web framework
const express = require('express');
// load models/index.js for all models in database
const db = require('../models');
// load router to export routes to /index.js
const router = express.Router();

router.get('/comments/by/client', (req, res) => {
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

router.post('/comments', (req, res) => {
  db.Comment.create(req.body)
    .then(newEx => {
      res.status(201).send({ success: 'Comment created' });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send({ err: 'Undocumented error' });
    });
});

module.exports = router;

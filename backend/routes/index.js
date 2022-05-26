const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

// access all api routes.
router.use('/api', apiRouter);

// test route. change later
router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;

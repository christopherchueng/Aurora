const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const tracksRouter = require('./tracks.js')
const commentsRouter = require('./comments.js');
const searchRouter = require('./search.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/tracks', tracksRouter);
router.use('/comments', commentsRouter);
router.use('/search', searchRouter)

module.exports = router;

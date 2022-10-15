const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const tracksRouter = require('./tracks.js')
const commentsRouter = require('./comments.js');
const searchRouter = require('./search.js')
const likesRouter = require('./likes.js')
const playlistRouter = require('./playlists.js')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/tracks', tracksRouter);
router.use('/comments', commentsRouter);
router.use('/search', searchRouter)
router.use('/likes', likesRouter)
router.use('/playlists', playlistRouter)

module.exports = router;

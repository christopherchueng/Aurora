// Imports
const express = require('express');
const { Op } = require('sequelize');
const { Track, User, Comment } = require('../../db/models');

// Middleware
const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');

const router = express.Router();

router.get('/:commentId', asyncHandler(async (req, res) => {
    const commentId = parseInt(req.params.commentId, 10)

    const comment = await Comment.findByPk(commentId)

    return res.json(comment)
}))

router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { message, trackId, userId } = req.body;

    const comment = await Comment.create({ message, trackId, userId })

    return res.json(comment)
}))

router.put('/:commentId', requireAuth, asyncHandler(async (req, res) => {
    const commentId = parseInt(req.params.commentId, 10);
    // console.log('are we hitting backened', commentId)
    const comment = await Comment.findByPk(commentId)

    const { message, trackId, userId } = req.body;

    await comment.update({ message, trackId, userId })

    return res.json(comment)
}))

router.delete('/:commentId', requireAuth, asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(req.params.commentId)
    await comment.destroy()
    return res.json(comment);
}))

module.exports = router;

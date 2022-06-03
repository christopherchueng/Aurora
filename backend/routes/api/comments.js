// Imports
const express = require('express');
const { Track, User, Comment } = require('../../db/models');

// Middleware
const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');

const router = express.Router();

// router.get('/', asyncHandler(async (req, res) => {
//     const { trackId } = req.body;

//     const comments = await Comment.findAll({
//         where: {
//             trackId
//         }
//     })

//     res.json(comments);
// }))

router.post('/', asyncHandler(async (req, res) => {
    const { message, trackId, userId } = req.body;

    const comment = await Comment.create({ message, trackId, userId })

    return res.json(comment)
}))

router.put('/:commentId', asyncHandler(async (req, res) => {
    const commentId = parseInt(req.params.commentId, 10);
    const comment = await Comment.findByPk(commentId)

    const { message, trackId, userId } = req.body;

    await comment.update({ message, trackId, userId })

    return res.json(comment)
}))

router.delete('/:commentId', asyncHandler(async (req, res) => {
    const commentId = parseInt(req.params.commentId, 10);
    const comment = await Comment.findByPk(commentId)

    await comment.destroy()
    return res.json(comment)
}))

const express = require('express')
const { Like } = require('../../db/models')

const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');

const router = express.Router()

// Get all likes under one track
router.get('/:trackId', asyncHandler(async (req, res) => {
    const trackId = parseInt(req.params.trackId, 10)

    const likes = await Like.findAll({
        where: {
            trackId
        }
    })

    return res.json(likes)
}))

// Like a track
router.post('/', requireAuth, asyncHandler(async (req, res) => {
    const { trackId, userId } = req.body

    const like = await Like.create({ trackId, userId })

    return res.json(like)
}))

// Unlike a track
router.delete('/:likeId', requireAuth, asyncHandler(async (req, res) => {
    const likeId = parseInt(req.params.likeId, 10)

    const like = await Like.findByPk(likeId)
    like.destroy()

    return req.json(like)
}))

module.exports = router;

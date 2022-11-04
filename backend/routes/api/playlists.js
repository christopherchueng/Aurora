const express = require('express')
const { Playlist, Track, User, PlaylistTrack } = require('../../db/models')
const { check } = require('express-validator')

const { requireAuth } = require('../../utils/auth')
const asyncHandler = require('express-async-handler')
const { handleValidationErrors } = require('../../utils/validation')
const { validationResult } = require('express-validator')

const router = express.Router()

const playlistValidators = [
    check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 100 })
    .withMessage('Please provide a name that is no more than 100 characters long.'),
    handleValidationErrors
]

// Get all playlists and include the tracks that correspond with playlist many to many relationship
router.get('/', asyncHandler(async (req, res) => {
    const playlists = await Playlist.findAll({
        include: [{
            model: Track,
            include: User,
        }],
        limit: 10,
        order: [[Track, "id", "DESC"]],
    })

    return res.json(playlists)
}))

router.post('/', requireAuth, playlistValidators, asyncHandler(async (req, res) => {
    const { name, userId } = req.body

    const playlist = await Playlist.create({ name, userId })

    return res.json(playlist)
}))

router.put('/:playlistId', requireAuth, playlistValidators, asyncHandler(async (req, res) => {
    const playlistId = parseInt(req.params.playlistId, 10)

    const playlist = await Playlist.findByPk(playlistId)

    const { name, userId } = req.body

    await Playlist.update({ name, userId })

    return res.json(playlist)
}))

router.delete('/:playlistId', requireAuth, asyncHandler(async (req, res) => {
    const playlistId = parseInt(req.params.playlistId, 10)

    const playlist = await Playlist.findByPk(playlistId)

    await playlist.destroy()

    return res.json(playlist)
}))

module.exports = router

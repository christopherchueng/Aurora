const express = require('express')
const { Playlist, Track, User } = require('../../db/models')
const { check } = require('express-validator')

const { requireAuth } = require('../../utils/auth')
const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator')

const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
    const playlists = await Playlist.findAll()

    return res.json(playlists)
}))

module.exports = router

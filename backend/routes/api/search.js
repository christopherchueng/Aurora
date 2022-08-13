const express = require('express');
const { Track, User } = require('../../db/models');

const asyncHandler = require('express-async-handler');

const { Op } = require('sequelize');

const router = express.Router()

// Get searched tracks
router.get('/:keyword', asyncHandler(async (req, res) => {
    const keyword = req.params.keyword
    const tracks = await Track.findAll({
        where: {
            title: {
                [Op.iLike]: `%${keyword}%`
            }
        },
        include: User
    })

    return res.json(tracks)
}))

module.exports = router

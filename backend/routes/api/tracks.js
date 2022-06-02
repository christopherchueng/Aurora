const express = require('express');
const { Track, User } = require('../../db/models');
const { check } = require('express-validator');
const { genres } = require('../../db/models/genres')

const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// const trackValidators = [
//     // check('title')
//     //     .exists({ checkFalsy: true })
//     //     .isLength({ max: 100 })
//     //     .withMessage('Please provide a title that is no more than 100 characters long.'),
//     // check('genre')
//     //     .exists({ checkFalsy: true })
//     //     .withMessage('Please select a genre.')
//     //     .isIn(genres),
//     // check('trackPath')
//     //     .exists({ checkFalsy: true })
//     //     .withMessage('Please provide a track.')
//     //     .isURL({ protocols: false }),
// ];

// Find a track
router.get('/:trackId', asyncHandler(async (req, res) => {
    const trackId = parseInt(req.params.trackId, 10);
    const track = await Track.findByPk(trackId);

    return res.json(track);
}))

// Get tracks
router.get('/', asyncHandler(async (req, res) => {
    const tracks = await Track.findAll({
        include: User
    });

    return res.json(tracks);
}))

// Upload a track
// router.get('/', asyncHandler(async (req, res) => {
//     console.log('here in get route')
//     const userId = req.session.auth.userId;
//     const user = await User.findByPk(userId)
//     const tracks = await Track.build();
//     res.json(tracks);
// }))

router.post('/', asyncHandler(async (req, res) => {
    const {
        title,
        description,
        genre,
        trackPath,
        imagePath,
        userId
    } = req.body

    const track = await Track.create({
        title,
        description,
        genre,
        trackPath,
        imagePath,
        userId
    });

    return res.json(track);
}))

// Update a track
router.put('/:trackId', asyncHandler(async (req, res) => {
    const trackId = parseInt(req.params.trackId, 10);
    const track = await Track.findByPk(trackId);

    const {
        title,
        description,
        genre,
        imagePath
    } = req.body

    await track.update({
        title,
        description,
        genre,
        imagePath
    });

    return res.json(track);
}))

// Delete a track
router.delete('/:trackId', asyncHandler(async (req, res) => {
    const trackId = parseInt(req.params.trackId, 10);
    const track = await Track.findByPk(trackId);
    if (track) {
        await track.destroy();
        return res.json({ trackId });
    } else {
        throw new Error('Cannot find track.');
    }
}))

// Get genres
router.get('/genres', asyncHandler(async (req, res) => {
    return res.json(genres)
}))

module.exports = router;

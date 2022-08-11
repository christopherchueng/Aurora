const express = require('express');
const { Track, User, Comment} = require('../../db/models');
const { check } = require('express-validator');
const { genres } = require('../../db/models/genres')

const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');
const { singleMulterUpload, singlePublicFileUpload, multipleMulterUpload, multiplePublicFileUpload } = require('../../awsS3');

const router = express.Router();

const trackValidators = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ max: 100 })
        .withMessage('Please provide a title that is no more than 100 characters long.'),
    check('genre')
        .exists({ checkFalsy: true })
        .withMessage('Please select a genre.'),
    check('trackPath')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a track.')
        .isURL({ protocols: false })
];

// Get tracks
router.get('/', asyncHandler(async (req, res) => {
    const tracks = await Track.findAll({
        include: User
    });

    return res.json(tracks);
}))

// Get all comments under a track
router.get('/:trackId/comments', asyncHandler(async (req, res) => {
    const trackId = parseInt(req.params.trackId, 10);
    const comments = await Comment.findAll({
        where: {
            trackId
        },
        include: User
    })

    return res.json(comments);
}))

router.post('/', requireAuth, multipleMulterUpload('files'), asyncHandler(async (req, res) => {
    const {
        title,
        description,
        genre,
        userId
    } = req.body

    const mediaFiles = await multiplePublicFileUpload(req.files)

    const trackPath = mediaFiles[0]
    const imagePath = mediaFiles[1]

    const newTrack = await Track.create({
        title,
        description,
        genre,
        trackPath,
        imagePath,
        userId
    });

    return res.json(newTrack);
}))

// Update a track
router.put('/:trackId', requireAuth, singleMulterUpload('image'), singleMulterUpload('track'), asyncHandler(async (req, res) => {
    const trackId = parseInt(req.params.trackId, 10);
    const track = await Track.findByPk(trackId);

    const {
        title,
        description,
        genre,
        userId
    } = req.body

    const imagePath = await singlePublicFileUpload(req.file)
    const trackPath = await singlePublicFileUpload(req.file)

    // console.log('What are we getting from the frontend?', req.body)

    await track.update({
        title,
        description,
        genre,
        trackPath,
        imagePath,
        userId
    });

    return res.json(track);
}))

// Delete a track
router.delete('/:trackId', requireAuth, asyncHandler(async (req, res) => {
    const trackId = parseInt(req.params.trackId, 10);
    const track = await Track.findByPk(trackId);

    if (track) {
        await track.destroy();
        return res.json(track);
    } else {
        throw new Error('Cannot find track.');
    }
}))

// Get genres
router.get('/genres', asyncHandler(async (req, res) => {
    return res.json(genres)
}))

module.exports = router;

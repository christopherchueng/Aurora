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

// const checkTrackFile = (track) => {
//     const acceptedAudioFiles = ['.mp3', '.aac', '.wav', '.flac']
//     const file_ext = track.slice(track.lastIndexOf('.'))
//     if (!acceptedAudioFiles.includes(file_ext)) {
//         return Promise.reject('Please select a valid file type.')
//     }
// }

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
        .withMessage('Please provide a track.'),
    handleValidationErrors
];

router.get('/:trackId', asyncHandler(async (req, res) => {
    const trackId = parseInt(req.params.trackId, 10)
    const track = await Track.findByPk(trackId)

    return res.json(track)
}))

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

router.post('/', requireAuth, multipleMulterUpload('files'), trackValidators, asyncHandler(async (req, res, next) => {
    const {
        title,
        description,
        genre,
        userId
    } = req.body
    let imagePath

    const mediaFiles = await multiplePublicFileUpload(req.files)

    const trackPath = mediaFiles[0]

    const acceptedAudioFiles = ['.mp3', '.aac', '.wav', '.flac']
    const acceptedImageFiles = ['.jpg', '.jpeg', '.png', '.webp']

    const trackFileExt = trackPath.slice(trackPath.lastIndexOf('.'))

    if (!acceptedAudioFiles.includes(trackFileExt)) {
        const err = new Error('Invalid audio file');
        err.status = 401;
        err.title = 'Invalid audio file';
        err.errors = ['Please select a valid file type.'];
        return next(err);
    }

    if (!mediaFiles[1]) {
        imagePath = 'https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/default-imagePath.png'
    } else {
        imagePath = mediaFiles[1]
        const imageFileExt = imagePath.slice(imagePath.lastIndexOf('.'))
        if (!acceptedImageFiles.includes(imageFileExt)) {
            const err = new Error('Invalid image file');
            err.status = 401;
            err.title = 'Invalid image file';
            err.errors = ['Please select a valid file type.'];
            return next(err);
        }
    }

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
router.put('/:trackId', requireAuth, singleMulterUpload('image'), trackValidators, asyncHandler(async (req, res, next) => {

    const trackId = parseInt(req.params.trackId, 10);
    const currTrack = await Track.findByPk(trackId);

    const {
        title,
        description,
        genre,
        trackPath,
        userId
    } = req.body
    const { image } = req.body

    const acceptedImageFiles = ['.jpg', '.jpeg', '.png', '.webp']

    let imagePath

    if (req.file) {
        imagePath = await singlePublicFileUpload(req.file)
        const imageFileExt = imagePath.slice(imagePath.lastIndexOf('.'))
        if (!acceptedImageFiles.includes(imageFileExt)) {
            const err = new Error('Invalid image file');
            err.status = 401;
            err.title = 'Invalid image file';
            err.errors = ['Please select a valid file type.'];
            return next(err);
        }
    } else {
        imagePath = image
    }

    await currTrack.update({
        title,
        description,
        genre,
        trackPath,
        imagePath,
        userId
    });

    return res.json(currTrack);
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

const express = require('express');
const { Tracks } = require('../../db/models');
const { check } = require('express-validator');

const { requireAuth } = require('../../utils/auth');
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');

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
        .isURL({ protocols: false }),
    handleValidationErrors
];

// Find a track
router.get('/:trackId', asyncHandler(async (req, res) => {
    const trackId = req.params.trackId;
    const track = await Tracks.findByPk(trackId);
    return res.json(track);
}))

// Upload a track
router.post('/', requireAuth, trackValidators, asyncHandler(async (req, res) => {
    const track = await Tracks.create(req.body)

    return res.json(track);
}))

module.exports = router;

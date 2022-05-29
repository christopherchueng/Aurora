const LOAD = 'track/load';
const LOAD_TRACKS = 'track/loadTracks'
const ADD_TRACK = 'track/addTrack'
const UPDATE_TRACK = 'track/updateTrack'
const DELETE_TRACK = 'track/deleteTrack'

// Action creators
export const load = (track) => {
    return {
        type: LOAD,
        track
    }
}

export const loadTracks = (tracks) => {
    return {
        type: LOAD_TRACKS,
        tracks
    }
}

export const addTrack = (track) => {
    return {
        type: ADD_TRACK,
        track
    }
}

export const updateTrack = (track) => {
    return {
        type: UPDATE_TRACK,
        track
    }
}

export const deleteTrack = (track) => {
    return {
        type: DELETE_TRACK,
        track
    }
}

import { csrfFetch } from "./csrf";

const LOAD_TRACK = 'track/loadTrack';
const LOAD_TRACKS = 'track/loadTracks'
const LOAD_GENRES = 'track/loadGenres'
const ADD_TRACK = 'track/addTrack'
const UPDATE_TRACK = 'track/updateTrack'
const DELETE_TRACK = 'track/deleteTrack'

// Action creators
export const loadTrack = (track) => {
    return {
        type: LOAD_TRACK,
        track
    }
}

export const loadTracks = (tracks) => {
    return {
        type: LOAD_TRACKS,
        tracks
    }
}

export const loadGenres = (genres) => {
    return {
        type: LOAD_GENRES,
        genres
    }
}

export const addTrack = (track) => {
    return {
        type: ADD_TRACK,
        track
    }
}

export const editTrack = (track) => {
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

// export const getGenres = () => async (dispatch) => {
//     console.log('in get Genres')
//     const response = await csrfFetch('/api/tracks/genres');

//     if (response.ok) {
//         const genres = await response.json();
//         dispatch(loadGenres(genres));
//     }
// }

export const getOneTrack = (trackId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tracks/${trackId}`)

    if (response.ok) {
        const track = await response.json();
        dispatch(loadTrack(track));
    }
}

export const getTracks = () => async (dispatch) => {
    const response = await csrfFetch('/api/tracks')
    const tracks = await response.json();
    dispatch(loadTracks(tracks));
}

export const createTrack = (payload) => async (dispatch) => {
    const { title, description, imagePath, trackPath, genre, userId } = payload

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('genre', genre)
    formData.append('userId', userId)
    const files = [trackPath, imagePath]

    if (trackPath && imagePath) {
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i])
        }
    }
    // if (trackPath) formData.append('track', trackPath)

    const response = await csrfFetch('/api/tracks', {
        method: 'POST',
        headers: { 'Content-Type': "multipart/form-data" },
        body: formData
    })

    const track = await response.json();
    dispatch(addTrack(track))
    return track;
}

export const updateTrack = (payload, trackId) => async (dispatch) => {
    const { title, description, imagePath, trackPath, genre, userId } = payload

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('genre', genre)
    formData.append('userId', userId)
    if (trackPath && imagePath) formData.append('files', [trackPath, imagePath])

    const response = await csrfFetch(`/api/tracks/${trackId}`, {
        method: 'PUT',
        headers: { 'Content-Type': "multipart/form-data" },
        body: formData
    })

    const track = await response.json();
    dispatch(editTrack(track));
    return track;
}

export const removeTrack = (track) => async (dispatch) => {
    const response = await csrfFetch(`/api/tracks/${track.id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const track = await response.json();
        dispatch(deleteTrack(track))
        return track;
    }
}

const initialState = { entries: {}, isLoading: true };

const trackReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_TRACK:
            newState = { ...state, entries: {} }
            newState.entries[action.track.id] = action.track
            return newState
        case LOAD_TRACKS:
            newState = { ...state, entries: {...state.entries} };
            action.tracks.forEach(track => (newState.entries[track.id] = track))
            return newState
        case ADD_TRACK:
            return {
                ...state,
                entries: { ...state.entries, [action.track.id]: action.track }
            }
        case UPDATE_TRACK:
            return {
                ...state,
                [action.track.id]: action.track
            }
        case DELETE_TRACK:
            newState = { ...state }
            delete newState.entries[action.track.id]
            return newState;
        default:
            return state;
    }
}

export default trackReducer;

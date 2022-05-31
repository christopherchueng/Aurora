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

// export const getGenres = () => async (dispatch) => {
//     console.log('in get Genres')
//     const response = await csrfFetch('/api/tracks/genres');

//     if (response.ok) {
//         const genres = await response.json();
//         dispatch(loadGenres(genres));
//     }
// }

// export const getOneTrack = (trackId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/tracks/${trackId}`)

//     if (response.ok) {
//         const track = response.json();
//         dispatch(loadTrack(track));
//     }
// }

export const getTracks = () => async (dispatch) => {
    const response = await fetch('api/tracks')
    const tracks = await response.json();
    dispatch(loadTracks(tracks));
}

export const createTrack = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/tracks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    const track = await response.json();
    dispatch(addTrack(track))
    return track;
}

const initialState = { entries: {}, isLoading: true };

const trackReducer = (state = initialState, action) => {
    switch (action.type) {
        // case LOAD_GENRES:
        //     return {
        //         ...state,
        //         genres: action.genres
        //     }
        case LOAD_TRACKS:
            const newState = { ...state, entries: {...state.entries} };
            action.tracks.forEach(track => (newState.entries[track.id] = track))
            return newState
        case ADD_TRACK:
            return {
                ...state,
                entries: { ...state.entries, [action.track.id]: action.track }
            }
        default:
            return state;
    }
}

export default trackReducer;

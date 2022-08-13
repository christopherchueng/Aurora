import { csrfFetch } from "./csrf";

const LOAD_SEARCHED_TRACKS = 'search/loadSearchedTracks'

export const loadSearchedTracks = (tracks) => {
    return {
        type: LOAD_SEARCHED_TRACKS,
        tracks
    }
}

export const getSearchedTracks = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/search/${payload.keyword}`)

    const tracks = await response.json()
    dispatch(loadSearchedTracks(tracks))
}

const initialState = { entries: {}, isLoading: true }

const searchReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_SEARCHED_TRACKS:
            newState = { ...state, entries: { ...state.entries }}
            action.tracks.forEach(track => newState.entries[track.id] = track)
            return newState
        default:
            return state
    }
}

export default searchReducer

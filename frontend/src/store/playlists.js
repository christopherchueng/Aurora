import { csrfFetch } from "./csrf"

const LOAD_PLAYLISTS = 'playlist/loadPlaylists'

export const loadPlaylists = (playlists) => {
    return {
        type: LOAD_PLAYLISTS,
        playlists
    }
}

export const getPlaylists = () => async (dispatch) => {
    const response = await csrfFetch('/api/playlist')

    const playlists = await response.json()
    dispatch(loadPlaylists(playlists))
}

const initialState = { entries: {}, isLoading: true }

const playlistReducer = (state = initialState, action) => {
    let newState = {}

    switch (action.type) {
        case LOAD_PLAYLISTS:
            newState = { ...state }
            action.playlists.forEach(playlist => newState.entries[playlist.id] = playlist)
            return newState
        default:
            return state
    }
}

export default playlistReducer

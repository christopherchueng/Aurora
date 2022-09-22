const SET_TRACK = 'mediaControl/setTrack'
const SET_PLAYING = 'mediaControl/setPlaying'
const LOAD_VOLUME = 'mediaControl/loadVolume'
const SET_VOLUME = 'mediaControl/setVolume'

const setTrack = (track) => {
    return {
        type: SET_TRACK,
        track
    }
}

const isPlaying = (playing) => {
    return {
        type: SET_PLAYING,
        playing
    }
}

const loadVolume = (volume) => {
    return {
        type: LOAD_VOLUME,
        volume
    }
}

const setVolume = (volume) => {
    return {
        type: SET_VOLUME,
        volume
    }
}

export const playTrack = () => async (dispatch) => {
    dispatch(isPlaying(true))
}

export const pauseTrack = () => async (dispatch) => {
    dispatch(isPlaying(false))
}

export const setCurrentTrack = (track) => async (dispatch) => {
    dispatch(setTrack(track))
    // dispatch(isPlaying(true))
}

export const getStateVolume = (volume) => async (dispatch) => {
    dispatch(loadVolume(volume))
}

export const updateStateVolume = (volume) => async (dispatch) => {
    dispatch(setVolume(volume))
}

let initialState = {entries: {}, volume: {}}

const mediaControlReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case SET_TRACK:
            newState = {...state, track: action.track}
            console.log('what is this new state SET TRACK', newState)
            // newState.entries.track = action.track
            return newState
        case SET_PLAYING:
            newState = {...state, playing: action.playing}
            // newState.entries.playing = action.playing
            console.log('what is this new state in SET PLAYING', newState)
            return newState
        case LOAD_VOLUME:
            newState = { ...state }
            return newState
        case SET_VOLUME:
            newState = { ...state }
            newState.volume = action.volume
            return newState
        default:
            return state
    }
}

export default mediaControlReducer

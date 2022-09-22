const SET_TRACK = 'mediaControl/setTrack'
const SET_PLAYING = 'mediaControl/setPlaying'
const LOAD_VOLUME = 'mediaControl/loadVolume'
const SET_VOLUME = 'mediaControl/setVolume'
const SET_MUTE = 'mediaControl/setMute'

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

const setMute = (mute) => {
    return {
        type: SET_MUTE,
        mute,
        volume: 0
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

export const getVolume = (volume) => async (dispatch) => {
    dispatch(loadVolume(volume))
}

export const updateVolume = (volume) => async (dispatch) => {
    dispatch(setVolume(volume))
}

export const getMute = (mute) => async (dispatch) => {
    dispatch(setMute(mute))
}

let initialState = {entries: {}, volume: {}, mute: {}}

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
            newState.volume = action.volume
            return newState
        case SET_VOLUME:
            newState = { ...state }
            newState.volume = action.volume
            return newState
        case SET_MUTE:
            newState = { ...state }
            newState.mute.mute = action.mute
            newState.mute.volume = action.volume
            return newState
        default:
            return state
    }
}

export default mediaControlReducer

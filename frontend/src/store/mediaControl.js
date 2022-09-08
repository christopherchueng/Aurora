const SET_TRACK = 'mediaControl/setTrack'
const SET_PLAYING = 'mediaControl/setPlaying'

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

export const playTrack = () => async (dispatch) => {
    dispatch(isPlaying(true))
}

export const pauseTrack = () => async (dispatch) => {
    dispatch(isPlaying(false))
}

export const setCurrentTrack = (track) => async (dispatch) => {
    dispatch(setTrack(track))
    dispatch(isPlaying(true))
}

let initialState = {entries: {}}

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
        default:
            return state
    }
}

export default mediaControlReducer

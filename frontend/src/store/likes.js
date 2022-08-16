import { csrfFetch } from "./csrf"

const LOAD_LIKES = 'like/loadLikes'
const ADD_LIKE = 'like/addLike'
const REMOVE_LIKE = 'like/removeLike'

export const loadLikes = (likes) => {
    return {
        type: LOAD_LIKES,
        likes
    }
}

export const addLike = (like) => {
    return {
        type: ADD_LIKE,
        like
    }
}

export const removeLike = (likeId) => {
    return {
        type: REMOVE_LIKE,
        likeId
    }
}

export const getLikes = (trackId) => async (dispatch) => {
    const response = await csrfFetch(`/api/likes/${trackId}`)

    const likes = await response.json()
    dispatch(loadLikes(likes))
}

export const postLike = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/likes', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const like = await response.json()
        dispatch(addLike(like))
    }
}

export const deleteLike = (likeId) => async (dispatch) => {
    const response = await csrfFetch(`/api/likes/${likeId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(removeLike(likeId))
    }
}

const initialState = { entries: {}, isLoading: true }

const likeReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case LOAD_LIKES:
            newState = { entries: {} }
            action.likes.forEach(like => newState.entries[like.id] = like)
            return newState
        case ADD_LIKE:
            newState = { ...state, entries: { ...state.entries }}
            newState.entries[action.like.id] = action.like
            return newState
        case REMOVE_LIKE:
            newState = { ...state, entries: { ...state.entries }}
            delete newState.entries[action.likeId]
            return newState
        default:
            return state
    }
}

export default likeReducer

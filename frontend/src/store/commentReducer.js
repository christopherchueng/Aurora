import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = 'comment/loadComments';

// Action creators
export const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

export const getComments = (track) => async (dispatch) => {
    const response = await csrfFetch('api/comments', {
        body: JSON.stringify(track)
    })

    const comments = await response.json();
    dispatch(loadComments(comments))
}

const initialState = { entries: {}, isLoading: true };

const commentReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_COMMENTS:
            newState = { ...state, entries: {...state.entries} };
            action.comments.forEach(comment => {newState.entries[comment.id] = comment})
            return newState;
        default:
            return state;
    }
}

export default commentReducer;

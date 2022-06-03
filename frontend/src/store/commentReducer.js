import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = 'comment/loadComments';

// Action creators
export const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

export const getComments = (trackId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tracks/${trackId}/comments`)

    const comments = await response.json();
    dispatch(loadComments(comments))
}

const initialState = { entries: {}, isLoading: true };

const commentReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_COMMENTS:
            newState = { entries: {} };
            action.comments.forEach(comment => {newState.entries[comment.id] = comment})
            return newState;
        default:
            return state;
    }
}

export default commentReducer;

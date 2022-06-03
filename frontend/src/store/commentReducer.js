import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = 'comment/loadComments';
const ADD_COMMENT = 'comment/addComment';

// Action creators
export const loadComments = (comments) => {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const getComments = (trackId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tracks/${trackId}/comments`)

    const comments = await response.json();
    dispatch(loadComments(comments))
}

export const postComment = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    const comment = await response.json();
    dispatch(addComment(comment));
    return comment;
}

const initialState = { entries: {}, isLoading: true };

const commentReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_COMMENTS:
            newState = { entries: {} };
            action.comments.forEach(comment => {newState.entries[comment.id] = comment})
            return newState;

        case ADD_COMMENT:
            newState = {
                ...state,
                entries: { ...state.entries, [action.comment.id]: action.comment }
            }
            return newState;
        default:
            return state;
    }
}

export default commentReducer;

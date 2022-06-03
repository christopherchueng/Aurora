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
    return (
        <>
        </>
    )
}

export default commentReducer;

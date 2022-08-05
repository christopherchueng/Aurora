import { csrfFetch } from "./csrf"

const LOAD_USERS = 'user/loadUsers'

export const loadUsers = (users) => {
    return {
        type: LOAD_USERS,
        users
    }
}

export const getUsers = () => async (dispatch) => {
    const response = await csrfFetch('/api/users')

    const users = await response.json()
    dispatch(loadUsers(users))
}

const initialState = { entries: {}, isLoading: true }

const userReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type) {
        case LOAD_USERS:
            newState = { ...state, entries: { ...state.entries }}
            action.users.forEach(user => {newState.entries[user.id] = user})
            return newState
        default:
            return state
    }
}

export default userReducer

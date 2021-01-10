import * as actionTypes from '../actions/actionTypes';
import updateObject from '../updateObject';

const initialState = {
    users: [],
    loading: false,
    err: null
}

const fetchUsersStart = (state, action) => {
    return updateObject(state, {loading: true})
}

const fetchUsersSuccess = (state, action) => {
    return updateObject(state, {
                loading: false,
                users: action.users
            })
}
const fetchUsersFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        err: action.err
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS_START: return fetchUsersStart(state, action);
        case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action);
        case actionTypes.FETCH_USERS_FAIL: return fetchUsersFail(state, action);
        default: return state;
    }
}

export default reducer;
import * as actionTypes from './actionTypes';
import axiosInstance from '../../axiosInstance';

export const fetchUsersSuccess = (users) => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users
    }
}
export const fetchUsersFail = (err) => {
    return {
        type: actionTypes.FETCH_USERS_FAIL,
        err: err
    }
}
export const fetchUsersStart = () => {
    return {
        type: actionTypes.FETCH_USERS_START,
    }
}

export const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchUsersStart());
        axiosInstance.get('/users')
            .then(response => {
                const fetchedUsers = response.data;
                dispatch(fetchUsersSuccess(fetchedUsers));
            })
            .catch(err => {
                dispatch(fetchUsersFail(err));
            })
    }
}
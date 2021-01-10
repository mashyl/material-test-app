import * as actionTypes from '../actions/actionTypes';
import updateObject from '../updateObject';

const initialState = {
    posts: [],
    loading: false,
    error: null,
    selectedPost: null,
    comments: [],
    commentsError: null
}

const fetchPostsStart = (state, action) => {
    return updateObject(state, {loading: true, error: null})
}

const fetchPostsSuccess = (state, action) => {
    return updateObject(state, {
                loading: false,
                posts: action.posts,
                error: null
            })
}
const fetchPostsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.err
    })
}

const storeSelectedPost = (state, action) => {
    return updateObject(state, {selectedPost: {
        title: action.payload.title,
        body: action.payload.body
    }})
}

const fetchCommentsStart = (state, action) => {
    return updateObject(state, {loading: true, commentsError: null})
}

const fetchCommentsSuccess = (state, action) => {
    return updateObject(state, {
                loading: false,
                comments: action.comments,
                commentsError: null
            })
}
const fetchCommentsFail = (state, action) => {
    return updateObject(state, {loading: false, commentsError: action.err})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS_START: return fetchPostsStart(state, action);
        case actionTypes.FETCH_POSTS_SUCCESS: return fetchPostsSuccess(state, action);
        case actionTypes.FETCH_POSTS_FAIL: return fetchPostsFail(state, action);
        case actionTypes.STORE_SELECTED_POST: return storeSelectedPost(state, action);
        case actionTypes.FETCH_COMMENTS_START: return fetchCommentsStart(state, action);
        case actionTypes.FETCH_COMMENTS_SUCCESS: return fetchCommentsSuccess(state, action);
        case actionTypes.FETCH_COMMENTS_FAIL: return fetchCommentsFail(state, action);
        default: return state;
    }
}

export default reducer;
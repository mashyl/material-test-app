import * as actionTypes from './actionTypes';
import axiosInstance from '../../axiosInstance';

export const fetchPostsSuccess = (posts) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts: posts,
    }
}
export const fetchPostsFail = (err) => {
    return {
        type: actionTypes.FETCH_POSTS_FAIL,
        err: err
    }
}
export const fetchPostsStart = () => {
    return {
        type: actionTypes.FETCH_POSTS_START,
    }
}

export const fetchPosts = (id) => {
    return dispatch => {
        dispatch(fetchPostsStart());
        axiosInstance.get('/posts?userId=' + id)
            .then(response => {
                const fetchedPosts = response.data;
                dispatch(fetchPostsSuccess(fetchedPosts));
            })
            .catch(err => {
                dispatch(fetchPostsFail(err));
            })
    }
}

export const storeSeletcedPost = (title, body) => {
    localStorage.setItem('selectedPost', JSON.stringify({title: title, body: body}))
    return {
        type: actionTypes.STORE_SELECTED_POST,
        payload: {
            title: title,
            body: body
        }
    }
}

export const fetchCommentsStart = () => {
    return {
        type: actionTypes.FETCH_COMMENTS_START
    }
}
export const fetchCommentsSuccess = (comments) => {
    return {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        comments: comments
    }
}
export const fetchCommentsFail = (err) => {
    return {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        err: err
    }
}

export const fetchComments = postId => {
    return dispatch => {
        dispatch(fetchCommentsStart());
        axiosInstance.get('/comments?postId=' + postId)
            .then(response => {
                const fetchedComments = response.data;
                dispatch(fetchCommentsSuccess(fetchedComments));
            })
            .catch(err => {
                dispatch(fetchCommentsFail(err));
            })
    }
}
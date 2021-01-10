import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import Post from '../Post/Post';

import Alert from '@material-ui/lab/Alert';
import  {TextField, CircularProgress, Button, Grid, Fab} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import classes from './PostsList.module.css'
import { connect } from 'react-redux';
import * as postActions from '../../../store/actions/posts_actions'
import CustomModal from '../../../UI/Modal/CustomModal';
import axiosInstance from '../../../axiosInstance';
import { withWindowDimensions } from '../../../UI/hoc/withWindowDimensons';

const PostsList = props => {
    const {posts, loading, error, onFetchPosts, isMobileSized} = props;
    const userId = props.location.search.split('=')[1];

    const [showModal, setShowModal] = useState(false);
    const [addTitleVal, setAddTitleVal] = useState('');
    const [addBodyVal, setAddBodyVal] = useState('');
    const [isPostedSuccess, setIsPostedSuccess] = useState(null);

    useEffect(() => {
     onFetchPosts(userId);   
    }, [onFetchPosts, userId]);

    
    const hideModalHandler = () => {
        setShowModal(false);
        setAddTitleVal('');
        setAddBodyVal('');
    }

    const clearPostReqStatus = () => {
        setTimeout(() => {
            setIsPostedSuccess(null)
        }, 6000)
    }

    const addPostHandler = () => {
        const newPost = {
            title: addTitleVal,
            body: addBodyVal
        }
        axiosInstance.post('/posts', newPost)
            .then(response => {
                if(response.status >= 200 && response.status <= 299) {
                    setIsPostedSuccess(true);
                    clearPostReqStatus()
                } else {
                    setIsPostedSuccess(false);
                    clearPostReqStatus()
                }
            })
            .catch(err => {
                console.log(err)
                setIsPostedSuccess(false);
                clearPostReqStatus()
            })
        hideModalHandler()
    }

    const allPosts = posts.map(post => {
        return (
            <Post key={post.id} title={post.title} body={post.body} postId={post.id} />
        )
    })

    const newPostInputGroup = (
        <Fragment>
            <Grid
                className={classes.InputContainer}
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <TextField
                    controlled = 'true'
                    className={classes.Input}
                    style={{marginBottom: '1rem'}}
                    id="outlined-multiline-flexible"
                    label="Title"
                    multiline
                    rowsMax={4}
                    value={addTitleVal}
                    onChange={event => setAddTitleVal(event.target.value)}
                    variant="outlined"
                />
                <TextField
                    controlled = 'true'
                    className={classes.Input}
                    id="outlined-multiline-static"
                    label="Text"
                    multiline
                    rows={4}
                    variant="outlined"
                    onChange={event => setAddBodyVal(event.target.value)}
                    value={addBodyVal} 
                />
            </Grid>
        </Fragment>
    )
    
    const modal = <CustomModal 
                    show={showModal}
                    handleCancel={hideModalHandler}
                    handleConfirm={addPostHandler}
                    modalHeading='Create New Post'
                    modalBody={newPostInputGroup} />

    const alert = (
        <Alert 
            severity={isPostedSuccess 
                        ? 'success' 
                        : 'error'}
            className={classes.Alert}>
                {isPostedSuccess ? 'Posted successfully.' : 'An error occured. Please try again.'}
        </Alert>
    )
    
    return (
        <Fragment>
            { isPostedSuccess !== null || error ? alert : null }
            {modal}
            {isMobileSized
                ? <Fab 
                    color="primary" 
                    aria-label="add" 
                    onClick={() => setShowModal(true)}
                    className={classes.AddPost}
                    >
                    <AddIcon />
                    </Fab>
                : <Button 
                        variant='contained'
                        color="primary" 
                        className={classes.AddPost} 
                        onClick={() => setShowModal(true)}
                    >Add Post</Button>
            }
            <div className={classes.Container}>
                { loading
                    ? <CircularProgress 
                        color="primary"
                        className={classes.Status} />
                    : allPosts}
            </div>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: (userId) => dispatch(postActions.fetchPosts(userId)),
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        loading: state.posts.loading,
        error: state.posts.error
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(withWindowDimensions(PostsList)));
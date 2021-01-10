import React, { useEffect } from 'react';
import classes from './FullPostCard.module.css';

import {Alert} from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {TextField, Card, CardActionArea, CardContent, CardActions, Typography, IconButton, Grid} from '@material-ui/core';

import { Fragment } from 'react';
import CustomModal from '../../../../UI/Modal/CustomModal';
import axiosInstance from '../../../../axiosInstance';
import { useState } from 'react';
import { withRouter } from 'react-router';

const FullPostCard  = props => {
    let selectedPost = JSON.parse(localStorage.getItem('selectedPost'));
    const userId = props.location.search.split('=')[1];
    const [isPostedSuccess, setIsPostedSuccess] = useState(null);
    const [isDeletedSuccess, setIsDeletedSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editedPost, setEditedPost] = useState({
        title: selectedPost.title,
        body: selectedPost.body
    });
    const [isDeleting, setIsDeleting] = useState(false);
    let timer;

    const clearPostReqStatus = () => {
        timer = setTimeout(() => {
            setIsPostedSuccess(null);
        }, 6000)
    }

    useEffect(() => {
        return () => clearTimeout(timer);
    })

    const deletePostHandler = (postId) => {
        axiosInstance.delete('/posts/' + postId)
            .then(response => {
                if(response.status >= 200 && response.status <= 299) {
                    setIsDeletedSuccess(true);
                    const postDisplay = {
                        title: 'Post was deleted.',
                        body: null
                    }
                    localStorage.setItem('selectedPost', JSON.stringify(postDisplay));
                    selectedPost = JSON.parse(localStorage.getItem('selectedPost'));
                    setEditedPost({
                        title: selectedPost.title,
                        body: null
                    });
                    props.history.replace({
                        pathname: '/posts',
                        search: `?userId=${userId}`,
                    })
                } else {
                    setIsDeletedSuccess(false);
                }
            })
            .catch(err => {
                console.log(err)
                setIsDeletedSuccess(false);
            })
        hideModalHandler(true)

    }

    const editPostHandler = (postId) => {
        const data = {
            title: editedPost.title,
            body: editedPost.body
        }
        localStorage.setItem('selectedPost', JSON.stringify(data));
        axiosInstance.put('/posts/' + postId, data)
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
        hideModalHandler(true)
    }

    const hideModalHandler = (saveEdit = false) => {
        if (saveEdit === true) {
            setShowModal(false);
        } else {
            setShowModal(false);
            setEditedPost({
                title: selectedPost.title,
                body: selectedPost.body
            })
        }
    }

        const alert = (
            <Alert 
                severity={isPostedSuccess ? 'success' : 'error'}
                className={classes.Alert}>
                    {isPostedSuccess 
                    ? 'Edited successfully.'
                    : isDeletedSuccess
                        ? 'Deleted successfully.'
                        : 'An error occured. Please try again later.'}
            </Alert>
        )
    
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
                        color='secondary'
                        multiline
                        rowsMax={4}
                        value={editedPost.title}
                        onChange={event => setEditedPost({...editedPost, title: event.target.value})}
                        variant="outlined"
                    />
                    <TextField
                        controlled = 'true'
                        className={classes.Input}
                        id="outlined-multiline-static"
                        label="Text"
                        color='secondary'
                        multiline
                        rows={4}
                        variant="outlined"
                        onChange={event => setEditedPost({...editedPost, body: event.target.value})}
                        value={editedPost.body} 
                    />
                </Grid>
            </Fragment>
        )

        const deleteQuestion = <h1>Are you sure you want to delete the post?</h1>;
    
        const modal = <CustomModal 
                        show={showModal}
                        handleCancel={hideModalHandler}
                        handleConfirm={() => {
                            return isDeleting 
                            ? deletePostHandler(props.postId)
                            : editPostHandler(props.postId)}
                        } 
                        modalHeading= { isDeleting ? 'Delete post' : 'Edit Post'}
                        modalBody={ isDeleting ? deleteQuestion : newPostInputGroup}
                        isDeleting={isDeleting} />
    
        return (
            <Fragment>
                {modal}
                {isPostedSuccess !== null || isDeletedSuccess !== null 
                ? alert : null}

                <Card className={classes.CardContainer}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {editedPost.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {editedPost.body}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    {isDeletedSuccess || selectedPost.body === null 
                        ? null
                        : <CardActions style={{justifyContent: 'flex-end'}}>
                            <IconButton 
                                aria-label="delete"
                                color='secondary'
                                className={classes.Button} 
                                onClick={() => {
                                    setIsDeleting(true);
                                    setShowModal(true);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton 
                                aria-label="edit"
                                color='primary'
                                className={classes.Button} 
                                onClick={() => {
                                    setIsDeleting(false)
                                    setShowModal(true)
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </CardActions>
                    }
                </Card>
            </Fragment>
        )
}

export default React.memo(withRouter(FullPostCard));
import React from 'react';
import { connect } from 'react-redux';

import classes from './Comments.module.css';

import Alert from '@material-ui/lab/Alert';
import {Grid, Container, CircularProgress} from '@material-ui/core';

import Comment from './Comment/Comment';

const Comments = props => {
    const {comments, loading, error} = props;

    let commentsCards = comments.map(comment => {   
        return <Comment 
                    key={comment.id}
                    name={comment.name}
                    user={comment.email}
                    body={comment.body} />
    })

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Container maxWidth="lg" className={classes.Name}>COMMENTS</Container>
            { loading
                    ? <CircularProgress 
                        color="secondary"
                        className={classes.Status} />
                    : error 
                    ? <Alert severity='error'>
                            An error occured. Please try again.
                        </Alert>
                    : commentsCards}
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        comments: state.posts.comments,
        error: state.posts.commentsError,
        loading: state.posts.loading
    }
}

export default connect(mapStateToProps)(Comments);
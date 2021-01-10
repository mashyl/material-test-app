import React, { Fragment, useEffect } from 'react';
import classes from './FullPost.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as postsActions from '../../../store/actions/posts_actions';
import Comments from './Comments/Comments';
import FullPostCard from './FullPostCard/FullPostCard';
import {Button, Fab} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { withWindowDimensions } from '../../../UI/hoc/withWindowDimensons';

const FullPost = props => {
    const selectedPostId = props.history.location.search.split('=')[1];
    const {onFetchComments, isMobileSized} = props;

    useEffect(() => {
        onFetchComments(selectedPostId);
    }, [onFetchComments, selectedPostId])

    return (
        <Fragment>
            {isMobileSized
                ? <Fab 
                    aria-label="add"
                    className={classes.GoBack}
                    onClick={() => props.history.goBack()}
                    >
                        <ArrowBackIcon />
                    </Fab>
                : <Button 
                        variant="contained"
                        className={classes.GoBack}
                        onClick={() => props.history.goBack()}
                    >Back to all posts</Button>
            }
            
            <div className={classes.Container}>
                <FullPostCard 
                    postId={selectedPostId}
                 />
            </div>
            <Comments />
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        selectedPost: state.posts.selectedPost,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchComments: (id) => dispatch(postsActions.fetchComments(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withWindowDimensions(FullPost)));
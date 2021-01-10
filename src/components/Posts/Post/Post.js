import React from 'react';
import {withRouter} from 'react-router';

import { Button, Card, CardActionArea, CardContent, Typography, CardActions } from '@material-ui/core';

import classes from './Post.module.css';
import { connect } from 'react-redux';
import * as postsActions from '../../../store/actions/posts_actions';

const Post = props => {
    const {postId, title, body, onStoreSelectedPost} = props;

    const showFullPostHandler = (postId) => {
        onStoreSelectedPost(title, body);
        props.history.push('/comments?postId=' + postId)
    }

    const titleShort = title.split(' ').filter( (word, idx) => idx < 7).join(' ');

    const text = body.split(' ').filter( (word, idx) => idx < 6).join(' ');

    return (
        <>
            <Card className={classes.CardContainer}>
                <CardActionArea>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {titleShort}{titleShort.length < title.length ? '...' : null}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {text}{text.length < body.length ? '...' : null}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="medium" color="primary" onClick={() => showFullPostHandler(postId)}>
                    DETAILS
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onStoreSelectedPost: (title, body) => dispatch(postsActions.storeSeletcedPost(title, body))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Post));
import React, { useState } from 'react';

import classes from './Comment.module.css';

import {Collapse, Card, CardActionArea, CardContent, Typography, Button} from '@material-ui/core';

const Comment = props => {
    const {name, user, body} = props;

    const shortText = body.split(' ').filter((word, idx) => idx < 6).join(' ');
    const expand = shortText.length < body.length;

    const [showFull, setShowFull] = useState(expand ? false : true);

    return (
        <>
            <Card className={classes.SingleComment}>
                <Collapse in={showFull} collapsedHeight={100}>
                    <Card className={classes.root} style={{boxShadow: 'none'}}>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {'comment by ' + user}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {showFull ? body : (shortText + '...')}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Collapse>
                <Button 
                    variant='contained'
                    color={showFull ? 'default' : 'primary'} 
                    disabled={!expand} 
                    onClick={() => {
                        setShowFull(!showFull)
                    }} 
                >{showFull ? 'Less' : 'More'}</Button>
            </Card>
        </>
    )
}

export default Comment;
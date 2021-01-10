import React, { useEffect, Fragment } from 'react';
import {connect} from 'react-redux';

import { TableContainer, Paper, Table, TableCell, TableHead, TableRow, TableBody, CircularProgress, Button } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';

import * as usersActions from '../../store/actions/users_actions';
import classes from './Users.module.css';

const Users = props => {
    const {onFetchUsers, users, loading, error} = props
    useEffect(() => {
        onFetchUsers();
    }, [onFetchUsers]);

    const showUserPostsHandler = (id) => {
        props.history.push('/posts?userId=' + id)
    }

    const usersRender = users.map(user => {
        return (
            <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell style={{textAlign: 'center'}}>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={() => showUserPostsHandler(user.id)}>POSTS</Button>
                </TableCell>
            </TableRow>
        )
    })

    return (
        <Fragment>
            {error
                ? <Alert severity='error' className={classes.Alert}>
                        An error occured. Please, try again.
                    </Alert>
                : null
            }
            <TableContainer component={Paper}>
                { loading 
                    ? <CircularProgress  
                        color="secondary"
                        className={classes.Status} />
                    : null}
                <Table aria-label="simple table" style={{minHeight: '100vh'}}>
                    <TableHead>
                        <TableRow>
                            {/* {loading
                            ? <TableCell>Loading...</TableCell>
                            : <Fragment> */}
                                <TableCell>#</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell style={{textAlign: 'center'}}>See User's Posts</TableCell>
                            {/* </Fragment>
                            } */}
                        </TableRow>
                    </TableHead>
                    <TableBody className={loading ? classes.Loader : null}>
                         {usersRender}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        users: state.users.users,
        loading: state.users.loading,
        error: state.users.err
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUsers: () => dispatch(usersActions.fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Users));
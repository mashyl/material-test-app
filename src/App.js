import React, { Suspense, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Users from './components/Users/Users';
import classes from './App.css';
import { CircularProgress, createMuiTheme, ThemeProvider, Fab } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';

export const lightTheme = {
  palette: {
  type: 'light',
  },
}

export const darkTheme = {
  palette: {
  type: 'dark',
  },
}

const PostsList = React.lazy(() => {
  return import('./components/Posts/PostsList/PostsList')
})

const FullPost = React.lazy(() => {
  return import('./components/Posts/FullPost/FullPost')
})

function App() {
  const [curTheme, setCurTheme] = useState(darkTheme);

  const toggleTheme = () => {
    if (curTheme === darkTheme) {
      setCurTheme(lightTheme)
    } else {
      setCurTheme(darkTheme)
    }
  }

  const appliedTheme = createMuiTheme(curTheme)

  return (
    <ThemeProvider theme={appliedTheme} >
    <div className="App">
      <Fab 
          color="primary" 
          aria-label="add" 
          onClick={() => toggleTheme()}
          id='toggle'
          >
            {curTheme === darkTheme
              ? <Brightness4Icon />
              : <Brightness4OutlinedIcon />
            }
        </Fab>
      <Switch>
        <Suspense fallback={<CircularProgress 
                        color="primary"
                        className={classes.Status} />}>
        <Route path='/users' component={Users} />
        <Route path='/posts' render={props => <PostsList {...props} />} />
        <Route path='/comments' render={props => <FullPost {...props} />} />
        <Redirect exact from='/' to='/users' />
        </Suspense>
      </Switch>
    </div>
    </ThemeProvider>
  );
}

export default App;
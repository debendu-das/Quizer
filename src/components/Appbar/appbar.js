import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Appbar = () => {

  const classes = useStyles();

  return (
      <header>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <i class="fas fa-question-circle"></i>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Quizer
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
  );
}

export default Appbar;

import React from 'react';
import { AppBar, Button, Toolbar, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo.png';


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
        <AppBar position="fixed" color="transparent">
          <Toolbar>
            <IconButton edge="start" color="inherit" component={NavLink} to={'/'}>
              <img width="30" height="30" src={Logo} align="center" alt="Quizer"/>Quizer
            </IconButton>
            <Typography className={classes.title} />
            <Button color="inherit" component={NavLink} to={'/about'}>About</Button>
          </Toolbar>
        </AppBar>
      </header>
  );
}

export default Appbar;

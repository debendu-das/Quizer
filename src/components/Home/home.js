import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider, Paper, IconButton, Fade } from '@material-ui/core';
import {  TouchAppTwoTone } from '@material-ui/icons';
import Typical from 'react-typical';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
    },
    paper: {
        padding: theme.spacing(2),
        marginTop: '20vh',
        marginBottom: '20vh',
        width: '70vw',
        maxWidth: '700px'
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(2,2,2,4),
      color: 'green',
      '&:hover': {
          color: 'blue'
      }
    },
}));
const Home = () => {

    const [loading, setLoading] = useState(true);

    const loadingHandler = () => {
        setLoading(false);
    }

    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.root} direction="column" justify="center" alignItems="center">
                <Grid item xs={12} >
                    <Fade in={!loading}>
                    <Paper className={classes.paper} elevation={3} >
                        <Grid container justify="center" alignItems="center" spacing={2}>

                            <Grid item xs={12} align="center" >
                                <img src={Logo} align="center" alt="Quizer" onLoad={loadingHandler}/>
                                <Divider className={classes.divider}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" color="textPrimary" align="center">
                                <Typical
                                    steps={['Quizer, ', 1000, 'Quizer, It is a quiz webapp', 500, 'Quizer, It containes lots of questions', 500, 'Quizer, Start your quiz now!', 500, 'Quizer, It is made by Debendu Das', 500,]}
                                    loop={Infinity}
                                    wrapper="p"
                                />
                                </Typography>
                            </Grid>
                            <Grid item xs={12} align="center" >
                                <IconButton  variant="contained" className={classes.button} component={Link} to={'/quiz'}><TouchAppTwoTone  fontSize="large" />Start</IconButton>
                            </Grid>
                            
                            
                        </Grid>
                    </Paper>
                    </Fade>
                </Grid>
            </Grid>
        </>
    )
}

export default Home;

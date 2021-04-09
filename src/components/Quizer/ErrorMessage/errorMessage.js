import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper, Fade, Button } from '@material-ui/core';
import { HomeTwoTone } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: '100vh',
    },
    paper: {
        padding: theme.spacing(4),
        marginTop: '25vh',
        width: '70vw',
        maxWidth: '500px',
        maxheight: '500px'
    },
    button: {
        margin: theme.spacing(4,2,2,4),
        color: 'green',
        '&:hover': {
            color: 'blue'
    }
    },
}));
const ErrorMessage = ({error}) => {

    const [loading] = useState(false);

    const classes = useStyles();

    return (
        <>
            <Grid container className={classes.root} direction="column" justify="center" alignItems="center">
                <Grid item xs={12} >
                    <Fade in={!loading}>
                    <Paper className={classes.paper} elevation={3} >

                        <Grid item xs={12}>
                            <Typography variant="h5" align="center" dangerouslySetInnerHTML={{__html: error}}>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button variant="contained" startIcon={<HomeTwoTone />} className={classes.button} component={Link} to={'/'}>Home</Button>                            
                
                        </Grid>
                    </Paper>
                    </Fade>
                </Grid>
            </Grid>
        </>
    )
}

export default ErrorMessage;

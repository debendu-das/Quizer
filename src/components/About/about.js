import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider, Paper, IconButton, Fade } from '@material-ui/core';
import Typical from 'react-typical';
import Debendu from '../../assets/Debendu.jpg';

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
      
    },
    image: {
        borderRadius: '50%',
        width: '100%',
        maxWidth: '200px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    },
    about: {
        padding: theme.spacing(4),
    },
}));
const About = () => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

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

                            <Grid item xs={12} >
                                <Grid container direction="row" justify="space-evenly" alignItems="center" spacing={4}>
                                    <Grid item sm={4}>
                                        <img alt="Debendu Das" src={Debendu} className={classes.image} onLoad={loadingHandler} />
                                    </Grid>
                                    <Grid item sm={7}>
                                        <Typography variant="h4"color="textSecondary" >I'm </Typography>
                                        <Typography variant="h4">&nbsp;Debendu Das,</Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Typical
                                                steps={['a Engineering Student', 1000, 'a Web Developer!', 500, 'a Good Person!', 500, 'a Good Friend!', 500, 'a Coding Lover!', 500]}
                                                loop={Infinity}
                                                wrapper="span"
                                            />
                                        </Typography>
                                    </Grid>

                                </Grid>
                                <Divider className={classes.divider}/>
                            </Grid>
                            
                            <Grid item xs={12} className={classes.about}>
                                <Typography variant="h5" color="textPrimary" align="left">
                                    WELCOME TO <b>QUIZER!</b><br/><br/>
                                </Typography>
                                <Typography variant="body1" color="textPrimary">
                                    
                                    It is a quiz conducting webapp made by javaScript framework library React.
                                    It is completely free for all. I developed this webapp just for a project purpose,
                                    and i will improve this day by day.<br/><br/>
                                     If you like this webapp Thank you soo much! also you can give me feedback in
                                    my email address or in the social media links given below.<br/>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} align="center">                                
                                <IconButton color="inherit" target="_blank" href="mailto:debendudas100@gmail.com" >
                                    <i className="fas fa-lg fa-envelope"></i>
                                </IconButton>
                                <IconButton color="primary" target="_blank" href="https://www.facebook.com/debendu.das.96" >
                                    <i className="fab fa-lg fa-facebook"></i>
                                </IconButton>
                                <IconButton color="secondary" target="_blank" href="https://www.instagram.com/i_am_debendu/" >
                                    <i className="fab fa-lg fa-instagram"></i>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                    </Fade>
                </Grid>
            </Grid>
        </>
    )
}

export default About;

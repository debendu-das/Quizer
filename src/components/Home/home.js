import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider, Paper, IconButton, Fade, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import {  TouchAppTwoTone } from '@material-ui/icons';
import Typical from 'react-typical';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import CATEGORIES_DATA from '../../Data/CATEGORIES_DATA';
import DIFFICULTIES_DATA from '../../Data/DIFFICULTIES_DATA';

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
    formControl: {
        margin: theme.spacing(1),
        width: '50%',
        minWidth: 120,
        },
        selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
const Home = () => {

    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(9);
    const [categories] = useState(CATEGORIES_DATA);
    const [difficulty, setDifficulty] = useState('easy');
    const [difficulties] = useState(DIFFICULTIES_DATA);

    const loadingHandler = () => {
        setLoading(false);
    }

    const categoryChangeHandler = (event) => {
      setCategory(event.target.value);
    };
    const difficultyChangeHandler = (event) => {
      setDifficulty(event.target.value);
    };

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
                                    steps={['Quizer, ', 700, 'It is a quiz webapp', 700, 'Start your quiz now!', 900, 'It is awesome!', 700,]}
                                    loop={Infinity}
                                    wrapper="p"
                                />
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <Grid container justify="space-evenly" alignItems="center">
                                    <Grid item xs={6} align="center">
                                        
                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={category}
                                                onChange={categoryChangeHandler}
                                                label="Category"
                                            >
                                            
                                            {
                                                categories.length>0 ? 
                                                    categories.map( (cat, index) => {
                                                        return <MenuItem key={index} value={cat.id}>{cat.name}</MenuItem>
                                                    })
                                                : <MenuItem value={9}>
                                                    <em>General Knowledge</em>
                                                  </MenuItem>
                                            }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} align="center">

                                        <FormControl variant="outlined" className={classes.formControl}>
                                            <InputLabel id="demo-simple-select-outlined-label">Difficulty</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={difficulty}
                                                onChange={difficultyChangeHandler}
                                                label="Difficulty"
                                            >
                                            
                                            {
                                                difficulties.length>0 ? 
                                                    difficulties.map( (diff, index) => {
                                                        return <MenuItem key={index} value={diff.value}>{diff.name}</MenuItem>
                                                    })
                                                : <MenuItem value={'easy'}>
                                                    <em>Easy</em>
                                                </MenuItem>
                                            }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} align="center" >
                                <IconButton  
                                    variant="contained" 
                                    className={classes.button}
                                    component={Link} to={{
                                                            pathname: "/quiz",
                                                            state: {
                                                                category: category,
                                                                difficulty: difficulty
                                                            }
                                                        }}>
                                    <TouchAppTwoTone fontSize="large" />Start
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

export default Home;

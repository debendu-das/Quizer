import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Fade } from '@material-ui/core';
import { NavigateNext, NavigateBefore, PublishTwoTone } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(4),
      marginTop: '20vh',
      marginBottom: '10vh',
      width: '65vw',
      maxWidth: '700px'
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1, 2, 0, 0)
    },
  }));

const Questions = ({qnum, questions, handleSubmit, onChangeHandler, onSubmitHandler, nextQUestion, prevQUestion }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <Grid item xs={12} >
            <Fade in={!loading}>
            <Paper className={classes.paper} elevation={3} >
                <Grid container justify="center" alignItems="center" spacing={2}>

                    <Grid item xs={12}>
                        <Typography variant="h5" align="center">
                        <b>Question No. {qnum+1}/{10} :</b>
                        </Typography>
                        <Divider className={classes.divider}/>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Typography variant="h6" dangerouslySetInnerHTML={{__html: questions[qnum].question}}></Typography>
                        <Divider className={classes.divider}/>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <form onSubmit={handleSubmit}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend"><Typography varient="body1" gutterBottom>Options</Typography></FormLabel>
                            <RadioGroup aria-label="gender" name="gender1" value={questions!==null? questions[qnum].selected_answer : '' } onChange={onChangeHandler} >
                            {
                            questions!==null && questions[qnum].options.map( (option,id) => 
                                <FormControlLabel key={id} value={option} control={<Radio />} label={<div dangerouslySetInnerHTML={{__html: option}} /> } />
                            )
                            }
                            
                            </RadioGroup>
                        </FormControl>
                        </form>
                        <Divider className={classes.divider} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" disabled={qnum===0? true : false} onClick={ prevQUestion } startIcon={<NavigateBefore />} className={classes.button}>Previous</Button>
                        {
                            qnum<9 ? 
                                <Button variant="contained" onClick={ nextQUestion } color="primary" endIcon={<NavigateNext />} className={classes.button}>Next</Button>
                                :
                                <Button variant="contained" onClick={onSubmitHandler} color="secondary" endIcon={<PublishTwoTone /> } className={classes.button}>Submit</Button>
                        }
                    </Grid>
                </Grid>
            </Paper>
            </Fade>
        </Grid>
    )
}

export default Questions;

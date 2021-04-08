import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Divider, Button, List, ListItem, ListItemIcon, ListItemText, Fade } from '@material-ui/core';
import { CheckCircleTwoTone, RadioButtonCheckedTwoTone, BorderColorTwoTone, HomeTwoTone, ReplayTwoTone, EmojiEventsTwoTone, SentimentDissatisfiedTwoTone, ExpandMore } from '@material-ui/icons';
import spiderman_dance from '../../../assets/spiderman_dance.gif';
import sad from '../../../assets/sad.gif';
import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }, 
    paper: {
      padding: theme.spacing(4),
      marginTop: '15vh',
      width: '60vw',
      maxWidth: '700px',
    },
    ans: {
      padding: theme.spacing(2),
      margin: theme.spacing(1,0),
      width: '70vw',
      maxWidth: '700px',
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    button: {
      margin: '8px 1% 0px',
    },
    listItems: {
      margin: '0px',
      paddingLeft: '0px',
      paddingBottom: '0px',
    },
    rightAnswer: {
      border: '5px solid green',
    },
    wrongAnswer: {
      border: '5px solid red',
    },
    gif: {
      maxWidth: '200px',
    }
  }));

const Results = ({ questions, score, totalQuestions, resetHandler }) => {

  const [pass] = useState(score>=(totalQuestions*0.7));
  const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const classes = useStyles();
    
    return (
        <>
          <Grid item xs={12} >
            <Fade in={!loading}>
            <Paper className={classes.paper} elevation={3} >
                <Grid container justify="center" alignItems="center" spacing={2}>

                    <Grid item xs={12}>
                      { pass ? 
                          <Typography variant="h5" style={{color: 'green'}} align="center">
                            <b>Congratulations!<EmojiEventsTwoTone /><br/>You Passed! </b> 
                          </Typography>
                          :
                          <Typography variant="h5" color="error" align="center">
                            <b> Oops! You Failed. Please Try Again </b> <SentimentDissatisfiedTwoTone fontSize="large" />
                          </Typography>
                      }
                        <Divider className={classes.divider}/>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" >
                          <BorderColorTwoTone />
                          &nbsp;&nbsp;Your Score :  {score}
                        </Typography>
                        <Grid container justify="center" alignItems="center" spacing={2}>
                          { pass ?
                              <img src={spiderman_dance} alt="Gif Not Found" />
                            :
                              <img src={sad} className={classes.gif} alt="Gif Not Found" />
                          }
                        </Grid>
                        <Divider className={classes.divider}/>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button variant="contained" startIcon={<HomeTwoTone />} className={classes.button} component={Link} to={'/'}>Home</Button>
                
                        <Button variant="contained" onClick={ resetHandler } color="primary" endIcon={<ReplayTwoTone />} className={classes.button} >Retry</Button>
                        
                
                    </Grid>
                </Grid>
            </Paper>
            </Fade>
        </Grid>
        
        <Fade in={!loading}>
              <Grid item xs={12}>
                <Paper className={ classes.ans } elevation={3} >
                    <Typography variant="h6" >
                      Check your answers below:
                    </Typography>
                    <ExpandMore fontSize="large" />
                </Paper>
              </Grid>
            </Fade>

            {questions !== null ? 

                questions.map((question, index) => {

                  let rightAnswer = (question.correct_answer === question.selected_answer) ;

                    let paper = (
                      <Fade in={!loading} key={index}>
                          <Grid item xs={12}>
                            <Paper className={ `${classes.ans} ${ rightAnswer ? classes.rightAnswer : classes.wrongAnswer} ` } elevation={3} >
                                <Grid container justify="center" alignItems="center" spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                          Q{index+1}:&nbsp;
                                          <Typography variant="h6" dangerouslySetInnerHTML={{__html: question.question  }} component="span">
                                          </Typography>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <List>
                                        <ListItem button className={classes.listItems}>
                                            <ListItemIcon>
                                                <CheckCircleTwoTone />
                                                <Typography varient="h5" >&nbsp;Correct Answer: &nbsp;</Typography>
                                            </ListItemIcon>
                                            <ListItemText  primary={<Typography variant="body1" dangerouslySetInnerHTML={{__html: question.correct_answer }}></Typography>}   />
                                        </ListItem>
                                        <ListItem button className={classes.listItems}>
                                            <ListItemIcon>
                                                <RadioButtonCheckedTwoTone />
                                                <Typography varient="h5">&nbsp;Selected Answer: &nbsp;</Typography>
                                            </ListItemIcon>
                                            <ListItemText primary={ <Typography variant="body1" dangerouslySetInnerHTML={{__html: question.selected_answer }}></Typography> } />
                                        </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                      </Fade>);


                    return paper;
                })

                
                : null

            }
        </>
    )
}

export default Results;

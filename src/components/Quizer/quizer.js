import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid, Snackbar } from '@material-ui/core';
import axios from 'axios';
import Questions from './Questions/questions';
import Results from './Results/results';
import { useLocation } from 'react-router';
import ErrorMessage from './ErrorMessage/errorMessage';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
  },
  spinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
  },
  snackbar: {
    marginTop: theme.spacing(2)
  }
}));

const Quizer = () => {

  const classes = useStyles();

  let location = useLocation();

  const [loading, setLoading] = useState(true);
  const [qnum, setQnum] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [category] = useState(location.state !== undefined ? location.state.category : 9);
  const [difficulty] = useState(location.state !== undefined ? location.state.difficulty : 'easy');
  const [data, setData] = useState(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [dataFectched, setDataFectched] = useState(false);
  const [locationFound, setLocationFound] = useState(location.state !== undefined )

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setLocationFound(true);
  };


  const dataFetching = () => {
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`;
    axios.get(url)
      .then( response => {
            
        if(response.data.results.length>0){
          setData(response.data)
          setDataFectched(true);
        }else{
          setError('Sorry! No Questions Found! Try a Diffrent Category!');
          setDataFectched(false);
        }
        setLoading(false);
      })
      .catch( error => {
        setError("Sorry! No Questions Found! Try a Diffrent Category!");
        setLoading(false);
      });

  }


  useEffect(() => {
    dataFetching();
  }, []);

  useEffect(() => {
    let optn = null;
    let ques = [];
    if(dataFectched!==false && data.results.length>0) {
      data.results.map((obj,index)=>{
        optn = [ ...obj.incorrect_answers, obj.correct_answer];
        optn.sort(() => Math.random() - 0.5);
        
        ques.push( { question: obj.question, options: [...optn], correct_answer: obj.correct_answer, selected_answer: optn[0] } );
        return null;
      });
      setQuestions(ques);
      setLoading(false);
    }
  }, [dataFectched]);




  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const resetHandler = () => {
    setQnum(0);
    setQuestions([]);
    setSubmitted(false);
    setLoading(true);
    setScore(0);
    setData(null);
    setDataFectched(false);
    dataFetching();

  }

const onSubmitHandler = () => {
  let score = 0;
  questions.map( question => {
    score += question.correct_answer === question.selected_answer ? 1 : 0;
    return null;
  });
  setScore(score);
  setSubmitted(true);
}

const onChangeHandler = (event) => {
  let newQues = [...questions];
  newQues[qnum] = {...newQues[qnum], selected_answer: event.target.value};
  setQuestions(newQues);    
}

const nextQUestion = () => {
  setQnum(prevQnum => prevQnum+1 );
}

const prevQUestion = () => {
  setQnum(prevQnum => prevQnum-1 );
}



  let content = error === null ?
                  (!submitted ?
                    <Questions 
                      qnum={qnum}
                      questions={questions}
                      handleSubmit={handleSubmit}
                      onChangeHandler={onChangeHandler}
                      onSubmitHandler={onSubmitHandler}
                      nextQUestion={nextQUestion}
                      prevQUestion={prevQUestion}
                    />
                    : <Results questions={questions} totalQuestions={10} score={score} resetHandler={resetHandler} />)
                : <ErrorMessage error={error} /> ;

                
  
  return (
        <>
          <Grid container className={classes.root} direction="column" justify="center" alignItems="center">
            
            { 
              loading ?
              (
                  <div className={classes.spinner}>
                    <CircularProgress/>
                  </div>
              )
                :
                
                 content 
            }
            {
              !locationFound ? 
                <Snackbar className={classes.snackbar} open={!locationFound} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical : 'top', horizontal: 'center' }}>
                  <Alert severity="warning" onClose={handleClose} >
                    <AlertTitle>Warning</AlertTitle>
                    You donot selected any CATEGORY and DIFFICULTY level so by default it's became <br/><strong>GENERAL KNOWLEDGE AND EASY!</strong>
                </Alert>
              </Snackbar>
              : null
            }
          </Grid>

        </>
      )
}

export default Quizer;
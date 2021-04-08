import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid } from '@material-ui/core';
// import { NavigateNext, NavigateBefore, PublishTwoTone, CheckCircleTwoTone, RadioButtonCheckedTwoTone } from '@material-ui/icons';
import axios from 'axios';
import Questions from './Questions/questions';
import Results from './Results/results';

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
}));

const Quizer = () => {

  const classes = useStyles();

  const [data, setData] = useState(null);
  const [qnum, setQnum] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    let optn = null;
    let ques = [];
    if(data!==null) {
      data.results.map((obj,index)=>{
        optn = [ ...obj.incorrect_answers, obj.correct_answer];
        optn.sort(() => Math.random() - 0.5);
        
        ques.push( { question: obj.question, options: [...optn], correct_answer: obj.correct_answer, selected_answer: optn[0] } );
        
        return null;
      });
      setQuestions(ques);
      setLoading(false);
    }else{
      apiDataHandler();
    }
  }, [data]);

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

const apiDataHandler = () => {
  const url = "https://opentdb.com/api.php?amount=10";
  axios.get(url)
      .then( response => {
            setData(response.data);
          })
          .catch( error => {
            alert(error);
            setLoading(false);
          });
}

  let content = (!submitted ?
                  <Questions 
                    qnum={qnum}
                    questions={questions}
                    handleSubmit={handleSubmit}
                    onChangeHandler={onChangeHandler}
                    onSubmitHandler={onSubmitHandler}
                    nextQUestion={nextQUestion}
                    prevQUestion={prevQUestion}
                  />
                  : <Results questions={questions} totalQuestions={10} score={score} resetHandler={resetHandler} />);
  
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
          </Grid>

        </>
      )
}

export default Quizer;
// {/* <Grid item>
      // {
      //     options!==null && options.map( (option,id) => 
      //         <div key={id} color="black"> {option} </div>
      //     )


      // }
//                         </Grid> */}


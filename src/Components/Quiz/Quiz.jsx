import React from 'react'
import './quiz.css'
import { data } from '../../data'
import { useState } from 'react'
export default function Quiz() {
  const [index,setIndex]=useState(0);
  const [question,setQuestion]=useState(data[index]);
  const [isLastPage,setLastPage]=useState(false);
  const [score,setScore]=useState(0);
  const [lock,setLock]=useState(false);
  const [but,setBut]=useState("NEXT");
  function updateQuestion(){
    setLock(false)
    const answerElements = document.querySelectorAll('#quizlist li');
    answerElements.forEach(element => {
    element.classList.remove('correct', 'incorrect');
  });
    if(index<data.length-1)
    {
      if(index===3){
        setBut("SUBMIT")
      }
    setIndex(index+1);
    setQuestion(data[index+1]);
    }
    else{
      setLastPage(true);
    }

  }
  function checkAnswer(e,ans){
    if(lock===false){
    if(ans===question.ans)
    {
      setScore(score+1);
      e.target.classList.add('correct');
    }
    else{
      e.target.classList.add('incorrect');
      const answerElements = document.querySelectorAll('#quizlist li');
      answerElements[question.ans-1].classList.add('correct');
  
      }
    }
    setLock(true)
    

  }
  if(isLastPage===true)
  {
    return(
      <>
      <div className={score>3?'finish':'notfinish'}>
      <h1>Your Quiz has Finished!</h1>
      <h1>Score: {score}</h1>
      {score>3?<h1>Congrats! You have Passed!</h1>:<h1>Failed! Try Again</h1>}
      </div>
      
      </>
    )
  }
  else{
  return (
    <div className='quiz'>
        <center><h1>Kod Quiz</h1></center>
        <h3>{question.question}</h3>
        <ul id="quizlist">
            <li onClick={(e)=>checkAnswer(e,'1')}>{question.option1}</li>
            <li onClick={(e)=>checkAnswer(e,'2')}>{question.option2}</li>
            <li onClick={(e)=>checkAnswer(e,'3')}>{question.option3}</li>
            <li onClick={(e)=>checkAnswer(e,'4')}>{question.option4}</li>
        </ul>
        <button onClick={updateQuestion}>{but}</button>
        <div className='page'>Question: {index+1} of {data.length}</div>
    </div>
  );
}
}

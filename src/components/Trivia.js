import React, { useEffect,useState } from 'react'

import useSound from 'use-sound';
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

const Trivia = ({data,questionNumber,setQuestionNumber,setTimeOut}) => {
    const [question,setQuestion]=useState(null);
    const [selectedAnswer,setSelectedanswer]=useState(null);
    const [className,setClassName]=useState("answer");
    const [letsPlay]=useSound(play);
    const [correctanswer]=useSound(correct);
    const [wronganswer]=useSound(wrong);

    const delay=(duration , callback)=>{
        setTimeout(() => {
            callback();
        }, duration);
    }

    // useEffect(()=>{
    //     letsPlay();
    // },[letsPlay])

    useEffect(()=>{
        
        setQuestion(data[questionNumber-1]);
    },[data,questionNumber]);

    
    const handleClick=(a)=>{
        setSelectedanswer(a);
        setClassName("answer active")
        // setTimeout(() => {
        //     setClassName(a.correct?"answer correct":"answer wrong");
        // }, 3000);
        delay(3000,()=>{setClassName(a.correct?"answer correct":"answer wrong")});

        delay(5000,()=>{
            if(a.correct)
            {
                correctanswer();
                delay(5000,()=>{
                    setQuestionNumber((prev)=>prev+1);
                setSelectedanswer(null);
                });
                
            }else
            {
                wronganswer();
                delay(5000,()=>{
                    setTimeOut(true);
                });
                
            }
        });
    }
  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a)=>(
            <div className={selectedAnswer === a ? className:"answer"} 
            onClick={()=> !selectedAnswer && handleClick(a)}>{a.text}</div>
        ))}
        
        {/* <div className="answer correct">rohit</div>
        <div className="answer wrong ">rohit</div>
        
        <div className="answer">rohit</div> */}
      </div>

    </div>
  )
}

export default Trivia

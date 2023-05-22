import useSound from "use-sound";
import React, { useEffect, useState } from 'react'
import correct from '../sounds/correct.mp3';
import wait from '../sounds/wait.mp3';
import wrong from '../sounds/wrong.mp3';





const Questions = ({questions,options,ques,setstop,handleNextPress,handleCorrectAnswer,setearned}) => {
    const [singlequestion,setsinglequestion]=useState(null);
    const [selectanswer,setselectanswer]=useState(null);
    const [classname,setclassname]=useState("answer");
   
    const [correctsound]=useSound(correct, { volume: 1 });
    const [waitsound]=useSound(wait, { volume: 1 });
    const [wrongsound]=useSound(wrong, { volume: 1 });
    

 
    useEffect(()=>{
      if(ques===14){
        setearned("₹ 7 Crore");
        setstop(true);}
      else if (questions && questions.length > 0) {
        const questionText = questions[ques].question.replace(/&quot;/g, '"');
        const a=questionText.replace(/&#039;/g, "'");
        setsinglequestion(a);
      }
        console.log(questions[ques]);
    },[questions,ques]);

    const delay= (duration,calllback)=>{   
        setTimeout(()=>{
            calllback();
        },duration);

    }


    const handleclick=(e)=>{
        setselectanswer(e);
        console.log(e);
        console.log(classname);
        setclassname("answer active");
        delay(3000,()=>setclassname(e===questions[ques].correct_answer?"answer correct":"answer wrong"));
        delay(1000,()=>{
            if(e===questions[ques].correct_answer){
              correctsound();
              delay(1000,()=>{
                handleNextPress();
                setselectanswer(null);
                handleCorrectAnswer();
              }); 
            }
            else{
              wrongsound();
              delay(1000,()=>{
                setstop(true);
              });   
            }
        });
       
    };


  return (
    <div className='questions'>
      <div className="question">{singlequestion}</div>
      <div className="answers">
      {options.map((e)=>(
        <div key={e} className={selectanswer===e?classname:"answer"} onClick={()=>handleclick(e)} >{e}</div>
      ))}
      </div>
    </div>
  )
}

export default Questions

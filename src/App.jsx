import React, { useState, useEffect, useMemo } from 'react'
import './app.css'
import Questions from './components/Questions';
import SetTimer from './components/SetTimer';
import loading from './assets/loading.json'
import Lottie from "lottie-react";
import Start from './components/Start';


const App = () => {
  const [questionnumber, setquestionnumber] = useState(1);
  const [questions, setquestions] = useState({});
  const [options, setOptions] = useState([]);
  const [ques, setQues] = useState(0);
  const [stop, setstop] = useState(false);
  const [earned, setearned] = useState("$ 0");
  const [isLoaded, setIsLoaded] = useState(false);
  const [username,setusername]=useState(null);
  const [lastquestion,setlastquestion]=useState(false);

  const moneypyramid = useMemo(() => [
    { id: 1, amount: "₹ 5,000" },
    { id: 2, amount: "₹ 10,000" },
    { id: 3, amount: "₹ 20,000" },
    { id: 4, amount: "₹ 40,000" },
    { id: 5, amount: "₹ 80,000" },
    { id: 6, amount: "₹ 1,60,000" },
    { id: 7, amount: "₹ 3,20,000" },
    { id: 8, amount: "₹ 6,40,000" },
    { id: 9, amount: "₹ 12,50,000" },
    { id: 10, amount: "₹ 25,00,000" },
    { id: 11, amount: "₹ 50,00,000" },
    { id: 12, amount: "₹ 1 Crore" },
    { id: 13, amount: "₹ 3 Crore" },
    { id: 14, amount: "₹ 7 Crore" },
  ].reverse(), []);

  const getquestions = async () => {
    try {
      let url = `https://opentdb.com/api.php?amount=15&type=multiple`;
      const res = await fetch(url);
      const data = await res.json();
      setquestions(data.results);
      setOptions(generateOptions(data.results[0]));
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getquestions();
  }, []);

  useEffect(() => {
    if (questionnumber > 1) {
      setearned(moneypyramid.find((e) => e.id === questionnumber - 1).amount);
    }
  }, [moneypyramid, questionnumber]);

  const handleNextPress = () => {
    setQues(ques + 1);
    setquestionnumber(ques + 1);
    setOptions(generateOptions(questions[ques + 1]));
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const generateOptions = (_question) => {
     const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);
    shuffleArray(options);
    return options;
  };

  const handleCorrectAnswer = () => {
    setquestionnumber(questionnumber + 1);
  };

  return (
    <div className='app'>
    {username?(
      <>
      <div className="main">
        {isLoaded ? (
          <>
           {stop?
            <h1 className='endtext'>You Earned:{earned}</h1>
            :
           (
            <>
            <div className="top">
              <div className="timer">
                <SetTimer
                 setstop={setstop}
                  questionnumber={questionnumber}
                
                  />
              </div>
            </div>
            <div className="bottom">
              <Questions
                key={questionnumber}
                questions={questions}
                options={options}
                ques={ques}
                setstop={setstop}
                handleNextPress={handleNextPress}
                handleCorrectAnswer={handleCorrectAnswer}
                setlastquestion={setlastquestion}
                setearned={setearned}
              />
            </div>
            </>
           )}
          </>
        ) : (
          <Lottie className='loading' animationData={loading}/>
        )}
      </div>
      <div className="pyramid">
        <ul className="moneylist">
          {moneypyramid.map((e) => (
            <li
              key={e.id}
              className={questionnumber === e.id ? "moneylistitem active" : "moneylistitem"}
            >
              <span className='moneylistitemnumber'>{e.id}</span>
              <span className='moneylistitemamount'>{e.amount}</span>
            </li>
          ))}
        </ul>
      </div>
      </>
    ):<Start setusername={setusername} />}
     
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './Board.css';
import { useNavigate } from 'react-router-dom';
import { Data } from '../../Data/Data';
import { GiTrophy, GiLaurels } from "react-icons/gi";

const Board = () => {
  const [answers, setAnswers] = useState({}); // User's answers stored
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
    setAnswers(storedAnswers);
    calculateScore(storedAnswers);
  }, []);

  const calculateScore = (userAnswers) => {
    let correctCount = 0;
    let incorrectCount = 0;
    let totalQuestions = Data.length;
    let totalTime = 100; // Example fixed total time, modify as needed

    Data.forEach((question) => {
      const correctOption = question.correctAnswer;
      const userResponse = userAnswers[question.id];

      if (JSON.stringify(userResponse) === JSON.stringify(correctOption)) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const calculatedAccuracy = (correctCount / totalQuestions) * 100;
    const calculatedSpeed = totalQuestions > 0 ? totalTime / totalQuestions : 0;
    const calculatedTotalScore = correctCount * 2.5;

    setCorrectAnswers(correctCount);
    setIncorrectAnswers(incorrectCount);
    setAccuracy(calculatedAccuracy.toFixed(2));
    setSpeed(calculatedSpeed.toFixed(2));
    setTotalScore(calculatedTotalScore.toFixed(1));
    setScore(Math.round((correctCount / totalQuestions) * 100));
  };

  return (
    <div className="leaderboard-container">
      <i><GiTrophy /></i>
      <h1>Congratulations!</h1>
      <p>You are doing well, keep it up!</p>
      <h2><GiLaurels /> Rank - #1020</h2>

      <div className='analysis'>
        <div className='accuracy'>
          <div className='accuracy_2'>
            <h3>{accuracy}%</h3>
            <p className='accu'>Accuracy</p>
          </div>
          <p>Questions: {Data.length}</p>
        </div>

        <div className='speed'>
          <div className='accuracy_2 speed_2'>
            <h3>{speed}</h3>
            <p>Speed</p>
          </div>
          <p>Correct: {correctAnswers}</p>
        </div>

        <div className='score'>
          <div className='accuracy_2 score_2'>
            <h3>{totalScore}</h3>
            <p>Total Score</p>
          </div>
          <p>Incorrect: {incorrectAnswers}</p>
        </div>
      </div>

      <button className="review-btn" onClick={() => setShowAnswers(!showAnswers)}>
        {showAnswers ? 'Hide Answers' : 'Show All Questions with Answers'}
      </button>

      {showAnswers && (
        <div className="answers-review">
          {Data.map((question) => {
            const userResponse = answers[question.id] || null;
            return (
              <div key={question.id} className="question-review">
                <h3>{question.id}. {question.text}</h3>
                <div className="options">
                  {question.options.map((option, idx) => (
                    <p
                      key={idx}
                      className={`option 
                        ${userResponse === option ? (option === question.correctAnswer ? 'correct' : 'incorrect') : ''} 
                        ${option === question.correctAnswer ? 'correct-answer' : ''}`
                      }
                    >
                      {option}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Board;

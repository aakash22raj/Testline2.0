import React, { useState, useEffect } from 'react'
import './Test.css'
import { Link } from 'react-router-dom'
import { Data } from '../../Data/Data'




const Test = () => {

    const [questionsData, setQuestionsData] = useState([]); // Store fetched questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(true);
    // const [showSubmit, setShowSubmit] = useState(false);
    const [showPopup, setShowPopup] = useState(false);



    // Load questions from Data
    useEffect(() => {
        setQuestionsData(Data);
        setTimeLeft(90 * Data.length); // Set timer based on question count
        setLoading(false);
    }, []);



    // Countdown Timer
    useEffect(() => {
        if (questionsData.length > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setShowPopup(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [questionsData]);





    // Format timer display
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };


    // Handle answer selection
    const handleAnswer = (questionId, option) => {
        setAnswers((prev) => {
          const isMultiple = questionsData[currentQuestionIndex].type === "multiple";
          if (isMultiple) {
            return {
              ...prev,
              [questionId]: prev[questionId] ? [...prev[questionId], option] : [option],
            };
          } else {
            return { ...prev, [questionId]: [option] };
          }
        });
    };


    // Navigation between questions
    const goToNext = () => {
        if (currentQuestionIndex < questionsData.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };
    
    const goToPrev = () => {
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Store the data in local storage
    const handleSubmit = () => {
        localStorage.setItem('userAnswers', JSON.stringify(answers));
    };

    // Show loading state
    if (loading) {
        return <div className="loading">Loading questions...</div>;
    }


    

  return (
    <div className="test-page">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
            <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? "<<" : ">>"}
            </button>
            <ul className="question-list">
                {questionsData.map((q, index) => (
                    <li key={q.id}
                        className={`
                          ${currentQuestionIndex === index ? "active" : ""}
                          ${answers[q.id] ? "answered" : ""}
                        `}
                        onClick={() => setCurrentQuestionIndex(index)}
                    >  
                        {sidebarOpen ? `${q.id}. ${q.text}...` : `${q.id}`}
                    </li>
                ))}
            </ul>
        </div>

  
        {/* Test Section */}
        <div className="test-section">
            {/* Timer */}
            <div className="timer-container">
                <div className="timer">Time Left: {formatTime(timeLeft)}</div>
                <Link to="/leader-board">
                    <button className="submit-btn" onClick={() => setShowSubmit(true)}>
                        Submit Test
                    </button>
                </Link>
            </div>
            <hr />

            {/* Display Questions */}
            <h2>Question {questionsData[currentQuestionIndex].id}</h2>
            <p>{questionsData[currentQuestionIndex].text}</p>
            <div className="options">
                {questionsData[currentQuestionIndex].options.map((option, idx) => (
                    <label key={idx} className="option">
                        <input
                            type={questionsData[currentQuestionIndex].type === "multiple" ? "checkbox" : "radio"}
                            name={`question-${questionsData[currentQuestionIndex].id}`}
                            onChange={() => handleAnswer(questionsData[currentQuestionIndex].id, option)}
                        />
                        {option}
                    </label>
                ))}
            </div>
    
            {/* Navigation Buttons */}
            <div className="navigation">
                <button onClick={goToPrev} disabled={currentQuestionIndex === 0}>
                    Previous
                </button>
                <button onClick={goToNext} disabled={currentQuestionIndex === questionsData.length - 1}>
                    Next
                </button>
            </div>     
        </div>


        {/* Auto Submit Popup */}
        {showPopup && (
            <div className="popup-overlay">
                <div className="popup-content">
                    <h2>Time's up!</h2>
                    <p>Your test time is over. Please submit your test.</p>
                    <Link to="/leader-board">
                       <button className="submit-btn" onClick={handleSubmit}>Submit Test</button>
                    </Link>
                </div>
            </div>
        )}
    </div>
  )
}

export default Test
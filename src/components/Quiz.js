import React, { useState } from 'react';
import Question from './Question';
import jsonData from '../json/question.json';

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const data = JSON.stringify(jsonData.questions)
  const questions = JSON.parse(data)

  const handleStartQuizClick = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    console.log(data)
   
  };

  const handleAnswerSelected = (selectedOption) => {
    setSelectedOption(selectedOption);
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleBackClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowScore(false);
      setSelectedOption('');
    }
  };

  const handleNextClick = () => {
   if (selectedOption === '') {
      setErrorMessage('Please select an option');
      return;
    }

  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
    setShowScore(false);
    setSelectedOption('');
  } else {
    setShowScore(true);
  }
};

  const handleSubmitClick = () => {
    setShowScore(true);
  };

  const handleTryAgainClick = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setSelectedOption('');
  };

  return (
    <div className="quiz">
      {!quizStarted ? (
        <div className="start-quiz">
          <button className="btn" onClick={handleStartQuizClick}>
            Start Quiz
          </button>
        </div>
      ) : showScore ? (
        <div className="score">
          You scored {score} out of {questions.length} questions.
          <br />
          <button className="btn" onClick={handleTryAgainClick}>
            Try Again
          </button>
        </div>
      ) : (
        <QuestionContainer>
          <div className="question-info">
            <span className="question-count">Question {currentQuestion + 1}:</span>
          </div>
          <Question
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            selected={handleAnswerSelected}
            selectedOption={selectedOption}
          />
          <div className="navigation-buttons">
            <button className="btn" onClick={handleBackClick} disabled={currentQuestion === 0}>
              Back
            </button>
            {currentQuestion < questions.length - 1 && (
              <button className="btn" onClick={handleNextClick}>
                Next
              </button>
            )}
            {currentQuestion === questions.length - 1 && (
              <button className="btn" onClick={handleSubmitClick}>
                Submit
              </button>
            )}
          </div>
        </QuestionContainer>
      )}
       <div>

       {errorMessage && (
      <div className="modal" onClick={() => setErrorMessage('')}>
        <div className="modal-content">
          <p className="modal-message">{errorMessage} </p>
          
        </div>
      </div>
    )}
    </div>
    </div>
  );
};

const QuestionContainer = ({ children }) => {
  return <div className="question-container">{children}</div>;
};

export default Quiz;

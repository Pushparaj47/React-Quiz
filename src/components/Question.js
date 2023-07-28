import React, { useState } from 'react';

const Question = ({ question, options, selected }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    selected(event.target.value);
  };

  return (
    <div className="question">
      <h3>{question}</h3>
      <div className="options">
        {options.map((option, index) => (
          <div key={index} className="option">
            <label htmlFor={`option-${index}`}>
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
                required
              />
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;

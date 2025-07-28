import React, { useState } from "react";
import questions from "./data/questions.json";
import "./App.css";

function App() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const startQuiz = () => {
    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQ(randomQ);
    setStarted(true);
    setSelected(null);
    setShowResult(false);
  };

  const handleAnswer = (option) => {
    setSelected(option);
    setShowResult(true);
  };

  return (
    <div className="App">
      <h1>PharmaQuiz</h1>
      {!started ? (
        <button className="start-btn" onClick={startQuiz}>Lipinicott</button>
      ) : (
        <div className="quiz-box">
          <h2>{currentQ.question}</h2>
          <ul>
            {currentQ.options.map((opt, i) => {
              let className = "option";
              if (showResult) {
                if (opt === currentQ.answer) className += " correct";
                else if (opt === selected) className += " wrong";
              } else if (selected === opt) {
                className += " selected";
              }

              return (
                <li
                  key={i}
                  className={className}
                  onClick={() => !showResult && handleAnswer(opt)}
                >
                  {opt}
                </li>
              );
            })}

          </ul>

          {showResult && (
            <div className="result">
              <p>
                <strong>Correct Answer:</strong> {currentQ.answer}
              </p>
              <p>
                <strong>Explanation:</strong> {currentQ.explanation}
              </p>
              <button onClick={startQuiz}>Next Question</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

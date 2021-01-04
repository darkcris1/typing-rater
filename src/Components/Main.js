import React, { useState, useRef } from "react";
import Timer from "./Timer";
import Paragraph from "./Paragraph";

const SENTENCES = [
  "Programming is a great skill",
  "Don't Lose Hope Be Motivated",
  "Keep trying for more knowledge",
  "Don't be a programmer if you are not serious",
  "Hello world is the beginning",
  "Impossible things is not impossible",
  "We are amazing programmers",
  "Use your code for good",
  "Hardworking is the key",
  "Bug is always there",
  "Talk is cheap show me the code",
  "Byte Me",
  "CSS is makeup",
  "All language is the best",
  "Reading is the key",
  "Documentation must be read",
  "Battery low",
  "Time is gold",
  "Make a wise decision",
  "Don't waste your life",
  "If battery is less than 0 then charge it",
  "Java is to JavaScript what car is to Carpet",
];

const senLen = SENTENCES.length;
let COUNT_WORDS = 0;
let COUNT_LETTERS = 0;

function Main() {
  const [timer, setTimer] = useState(30);
  const [start, setStart] = useState(false);
  const [result, setResult] = useState("");
  const [sentence, setSentence] = useState(() => {
    return SENTENCES[Math.floor(Math.random() * senLen)];
  });

  const inputVal = useRef();
  const loadDiv = useRef();
  const resultDiv = useRef();
  const overlap = useRef();

  function startTime() {
    let interval = setInterval(() => {
      setTimer((prev) => {
        if (prev - 1 <= 0) {
          showResult();
          setTimer(30);
          setStart(!start);
          clearInterval(interval);
        }
        return prev - 1;
      });
    }, 1000);
  }

  function showResult() {
    loadDiv.current.innerHTML = 3;
    resultDiv.current.style.display = "flex";
    setResult(() => {
      return (
        <React.Fragment>
          <div>
            <span className="num"> {COUNT_WORDS * 2}</span>{" "}
            {COUNT_WORDS <= 1 ? "word" : "words"} per minute{" "}
          </div>
          <div>
            <span className="num"> {COUNT_LETTERS * 2}</span>{" "}
            {COUNT_LETTERS <= 1 ? "letter" : "letters"} per minute{" "}
          </div>
        </React.Fragment>
      );
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputVal.current.value === sentence) {
      COUNT_WORDS += sentence.split(" ").length;
      inputVal.current.value = "";

      // change the sentences
      setSentence((prev) => {
        let index = Math.floor(Math.random() * senLen);
        let newSentence = SENTENCES[index];

        if (newSentence === prev) {
          return SENTENCES[index - 1] || SENTENCES[index + 1];
        }
        return SENTENCES[index];
      });
    }
  }

  function handleStart(e) {
    inputVal.current.value = "";
    e.target.parentElement.style.display = "none";
    animateLoading(3);
    setSentence(() => SENTENCES[Math.floor(Math.random() * senLen)]);
    COUNT_WORDS = 0;
    COUNT_LETTERS = 0;
    setTimeout(function () {
      startTime();
    }, 4000);
  }
  function animateLoading(val) {
    loadDiv.current.style.display = "flex";
    let interval = setInterval(function () {
      if (val <= 0) {
        loadDiv.current.style.display = "none";
        inputVal.current.focus();
        setStart(!start);
        clearInterval(interval);
      }
      loadDiv.current.innerHTML = val - 1;
      val--;
    }, 1000);
  }

  function handleTest() {
    const val = inputVal.current.value;
    if (new RegExp(val, "g").test(sentence)) {
      COUNT_LETTERS += 1;
    }
  }

  function gotoHome(e) {
    e.target.parentElement.style.display = "none";
    overlap.current.style.display = "flex";
  }
  return (
    <div className="main-container">
      <div className="overlap" ref={overlap}>
        <button onClick={handleStart} className="btn">
          {" "}
          Start Rating{" "}
        </button>
      </div>
      <div className="loading" ref={loadDiv}>
        3
      </div>
      <div className="resultCont" ref={resultDiv}>
        {result}
        <button onClick={handleStart} className="btn">
          Play Again
        </button>
        <button onClick={gotoHome} className="btn">
          Home
        </button>
      </div>
      <Timer classes="timer" time={timer} />
      <Paragraph classes="sentence" par={sentence} />
      <form onSubmit={handleSubmit}>
        <input onInput={handleTest} type="text" ref={inputVal} />
        <button className="btn" type="submit">
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
}

export default Main;

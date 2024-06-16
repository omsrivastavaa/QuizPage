import React, { useState, useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

import End from "./components/End";
import Question from "./components/Question";
import Start from "./components/Start";
import quizData from "./data/quiz.json";

let interval;

const App = () => {
  const dispatch = useDispatch();
  const { step, answers } = useSelector((state) => state?.quizReducer);
  console.log(step);
  console.log(answers);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="App">
      {step === 1 && <Start />}
      {step === 2 && <Question />}
      {step === 3 && (
        <End
          data={quizData.data}
          time={time}
          onAnswersCheck={() => setShowModal(true)}
        />
      )}
    </div>
  );
};
document.addEventListener('DOMContentLoaded', function() {
  const popup = document.getElementById('popup');
  const fullScreenButton = document.getElementById('fullScreenButton');
  const testContent = document.getElementById('test');

  function isFullScreen() {
      return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
  }

  function checkFullScreen() {
      if (!isFullScreen()) {
          testContent.classList.remove('show');
          popup.classList.add('show');
      } else {
          popup.classList.remove('show');
          testContent.classList.add('show');
      }
  }

  function requestFullScreen() {
      const docElm = document.documentElement;
      if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) { // Firefox
          docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) { // Chrome, Safari and Opera
          docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) { // IE/Edge
          docElm.msRequestFullscreen();
      }
  }

  fullScreenButton.addEventListener('click', function() {
      requestFullScreen();
  });

  document.addEventListener('fullscreenchange', checkFullScreen);
  document.addEventListener('webkitfullscreenchange', checkFullScreen);
  document.addEventListener('mozfullscreenchange', checkFullScreen);
  document.addEventListener('MSFullscreenChange', checkFullScreen);

  // Initial check when the page loads
  checkFullScreen();
});

export default App;

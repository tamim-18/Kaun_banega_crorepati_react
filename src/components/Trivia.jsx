import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../Assets/play.mp3";
import correct from "../Assets/correct.mp3";
import wait from "../Assets/wait.mp3";
import wrong from "../Assets/wrong.mp3";

export default function Trivia({ data, setTiming, setQn, qn }) {
  const [ques, setQues] = useState(null);
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  const [letWait] = useSound(wait);

  useEffect(() => {
    setQues(data[qn - 1]);
  }, [data, qn]);

  useEffect(() => {
    if (selectAnswer && selectAnswer.correct) {
      correctAnswer();
    }
  }, [correctAnswer, selectAnswer]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectAnswer(a);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(a.correct ? "answer correct" : "answer wrong")
    );
    delay(8000, () => {
      if (a.correct) {
        setQn((prev) => prev + 1);
        setSelectAnswer(null);
      } else {
        setTiming(true);
        wrongAnswer();
      }
    });
  };
  useEffect(() => {
    letWait();
  }, [letWait]);

  return (
    <div className="trivia">
      <div className="question">{ques?.question}</div>
      <div className="answers">
        {ques?.answers &&
          ques.answers.map((a) => (
            <div
              key={a.id}
              className={selectAnswer === a ? className : "answer"}
              onClick={() => handleClick(a)}
            >
              {a.text}
            </div>
          ))}
      </div>
    </div>
  );
}

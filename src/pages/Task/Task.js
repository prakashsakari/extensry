import { useEffect, useState, Fragment } from "react";
import { useBrowser } from "../../context/browser-context";
import { quotes } from "../../db";
import { Weather } from "../../components";
import "./Task.css";

export const Task = () => {
  const [isChecked, setIsChecked] = useState(false);
  const {
    time,
    name,
    task,
    message,
    textQuote,
    browserDispatch
  } = useBrowser();

  useEffect(() => {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)].quote;
    browserDispatch({
      type: "QUOTE",
      payload: newQuote
    });
  }, []);

  useEffect(() => {
    const currentTask = localStorage.getItem("task");
    browserDispatch({
      type: "TASK",
      payload: currentTask
    });
  }, []);

  useEffect(() => {
    clock();
  }, [time]);

  useEffect(() => {
    const checkedStatus = localStorage.getItem("checked");
    if (checkedStatus === "true") setIsChecked(true);
    else if (checkedStatus === "false") setIsChecked(false);
  }, []);

  function clock() {
    const today = new Date();

    const hours = today.getHours();
    const minutes = today.getMinutes();

    const hour = hours < 10 ? "0" + hours : hours;
    const minute = minutes < 10 ? "0" + minutes : minutes;

    const currentTime = hour + ":" + minute;
    setTimeout(clock, 1000);
    browserDispatch({
      type: "TIME",
      payload: currentTime
    });
    browserDispatch({
      type: "MESSAGE",
      payload: hours
    });
  }

  const handleTaskInputChange = (event) => {
    if (event.key === "Enter") {
      browserDispatch({
        type: "TASK",
        payload: event.target.value
      });
      localStorage.setItem("task", event.target.value);
    }
  };

  const handleAddTaskClick = (event) => {
    event.preventDefault();
    browserDispatch({
      type: "TASK",
      payload: event.target.value
    });
    browserDispatch({
      type: "ADD_TASK"
    });
    localStorage.setItem("task", task);
  };

  const handleCompleteTaskChange = (event) => {
    if (event.target.checked) {
      setIsChecked((isChecked) => !isChecked);
    } else {
      setIsChecked((isChecked) => !isChecked);
    }
    localStorage.setItem("checked", !isChecked);
  };

  const handleClear = () => {
    browserDispatch({
      type: "CLEAR"
    });
    localStorage.removeItem("task");
    localStorage.removeItem("checked");
  };

  return (
    <div className="task-container d-flex direction-column align-center">
      <Weather />
      <span className=" time">{time}</span>
      <span className="heading-2 message">
        {message}, {name}
      </span>
      {name !== null && task === null ? (
        <Fragment>
          <span className="heading-3 focus-question">
            What is your main focus for today?
          </span>

          <form
            className="d-flex direction-column task-input"
            onSubmit={handleAddTaskClick}
          >
            <input
              required
              value={task}
              className="input form-input"
              onKeyPress={handleTaskInputChange}
            />
          </form>
        </Fragment>
      ) : (
        <div className="user-task-container d-flex direction-column align-center gap">
          <span className="heading-2">Today's Focus</span>
          <div className="d-flex align-center justify-center">
            <input
              type="checkbox"
              checked={isChecked}
              className="task-check"
              id="input-check"
              onChange={handleCompleteTaskChange}
            />
            <label
              for="input-check"
              className={isChecked ? "heading-3 strike-through" : "heading-3"}
            >
              {task}
            </label>
            <div className="cta d-flex gap">
              <button className="feat-btn" onClick={handleClear}>
                <span
                  className="material-icons-outlined"
                >
                  clear
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="quote-container">
        <span className="heading-3">{textQuote}</span>
      </div>
    </div>
  );
};

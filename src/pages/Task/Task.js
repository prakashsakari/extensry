import { useEffect, useState, Fragment } from "react";
import { useBrowser } from "../../context/browser-context";
import { quotes } from "../../db";
import { Weather, Todo } from "../../components";
import "./Task.css";

export const Task = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isTodoOpen, setIsTodoOpen] = useState(false);
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
    if (new Date().getDate() !== Number(localStorage.getItem("date"))) {
      console.log(new Date().getDate(), localStorage.getItem("date"));
      localStorage.removeItem("task");
      localStorage.removeItem("date");
      localStorage.removeItem("checked");
    }
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
      localStorage.setItem("date", new Date().getDate());
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
    setIsChecked(false);
    localStorage.removeItem("task");
    localStorage.removeItem("checked");
  };

  const handleTodoClick = () => {
    setIsTodoOpen(isTodoOpen => !isTodoOpen)
    localStorage.setItem("todoStatus", !isTodoOpen);
  }

  useEffect(() => {
    const todoStatus = localStorage.getItem("todoStatus");
    if (todoStatus === "true") setIsTodoOpen(true)
    else if (todoStatus === "false") setIsTodoOpen(false)
  }, [])


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
              className={isChecked ? "heading-3 label strike-through" : "heading-3 label"}
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
      <div className="quote-container absolute bottom-0 d-flex align-center justify-center">
        <span className="heading-3 quote">{textQuote}</span>
      </div>
      {isTodoOpen && <Todo />}
      <div className="todo-box absolute">
        <button className="button todo-btn cursor" onClick={handleTodoClick}>ToDo</button>
      </div>
      
      
    </div>
  );
};

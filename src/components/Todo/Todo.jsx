import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";
import "./Todo.css";

export const Todo = () => {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([]);

    const handleChange = (event) => {
        setTodo(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
        const updatedList = [
            ...todoList,
            { _id: uuid(), myTodo: todo, isCompleted: false }
        ]
        setTodoList(updatedList);
        setTodo("");
        localStorage.setItem("todolist", JSON.stringify(updatedList));
        }
    };

    const handleTodoChange = (todoId) => {
        const updatedList = todoList.map((todoItem) =>
        todoItem._id === todoId
        ? { ...todoItem, isCompleted: !todoItem.isCompleted }
        : todoItem
    )
        setTodoList(updatedList);
        localStorage.setItem("todolist", JSON.stringify(updatedList));
    };

    const handleTodoDeleteClick = (todoId) => {
        const filteredList = todoList.filter(({_id}) => _id !== todoId)
        setTodoList(filteredList);
        localStorage.setItem("todolist", JSON.stringify(filteredList));
    }

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todolist"));
        todos && setTodoList(todos);
    }, [])

    return (
    <div className="todo-container absolute">
      <div className="todo-input-container">
        <input
          value={todo}
          onChange={handleChange}
          className="todo-input"
          placeholder="add todo here..."
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="todo-list">
        {todoList &&
          todoList.map(({ myTodo, _id, isCompleted }) => {
            return (
              <div key={_id} className="todo-items d-flex">
                  <div className="todo-label">
                  <input
                    id={_id}
                    className="checkbox"
                    checked={isCompleted}
                    type="checkbox"
                    onChange={() => handleTodoChange(_id)}
                  />
                  <label
                for={_id}
                className={`${isCompleted ? "strike" : ""} todo-label`}
                >
                  {myTodo}
                </label>
                  </div>
                
                <div>
                <span class="close-btn material-icons-outlined cursor" onClick={() => handleTodoDeleteClick(_id)}>
                    close
                </span>
                </div>
                
              </div>
            );
          })}
      </div>
    </div>
    )
}
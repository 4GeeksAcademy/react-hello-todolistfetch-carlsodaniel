import React, { useState, useEffect } from "react";

const TodoListItems = ({ listelements, handleDeleteTask }) => {
  if (listelements.length === 0) {
    return <li className="list-group-item text-center">No hay pendientes, agrega una tarea</li>;
  } else {
    return listelements.map((item, index) => (
      <li className="list-group-item" key={index}>
        <div className="row">
          <div className="col-9">{item.label}</div>
          <div className="col-3 d-flex justify-content-end">
            <button
              className="btn btn-link text-danger delete-button"
              onClick={() => handleDeleteTask(index)}
            >
              Borrar
            </button>
          </div>
        </div>
      </li>
    ));
  }
};

const Home = () => {
  const [input1, setInput1] = useState("");
  const [listelements, setListelements] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/todo/api/todos/user/carlsodaniel');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setListelements(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTask = async () => {
    if (input1 !== "") {
      const newTask = { label: input1, done: false };
      const updatedList = [...listelements, newTask];
      setListelements(updatedList);
      setInput1("");

      try {
        const response = await fetch('https://playground.4geeks.com/todo/api/todos/user/carlsodaniel', {
          method: "PUT",
          body: JSON.stringify(updatedList),
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        await response.json();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleDeleteTask = async (index) => {
    const updatedList = listelements.filter((_, idx) => idx !== index);
    setListelements(updatedList);

    try {
      const response = await fetch('https://playground.4geeks.com/todo/api/todos/user/carlsodaniel', {
        method: "PUT",
        body: JSON.stringify(updatedList),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      await response.json();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleClearAllTasks = async () => {
    setListelements([]);

    try {
      const response = await fetch('https://playground.4geeks.com/todo/api/todos/user/carlsodaniel', {
        method: "PUT",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) throw new Error('Network response was not ok');
      await response.json();
    } catch (error) {
      console.error('Error clearing tasks:', error);
    }
  };

  return (
    <>
      <div className="container container-fluid">
        <div className="header">
          <h1 className="display-2 text-center">Todolist Carlos Daniel</h1>
        </div>
        <div className="d-flex justify-content-center">
          <div className="card col-4">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <input
                  className="border-0 w-100"
                  type="text"
                  onChange={(e) => setInput1(e.target.value)}
                  value={input1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && input1 !== "") {
                      handleAddTask();
                    }
                  }}
                />
              </li>
              <TodoListItems
                listelements={listelements}
                handleDeleteTask={handleDeleteTask}
              />
            </ul>
            <div className="card-footer d-flex justify-content-between">
              <p className="numberOfTasks">{listelements.length} Pendientes</p>
              <button className="btn btn-danger" onClick={handleClearAllTasks}>Limpiar Todo</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;


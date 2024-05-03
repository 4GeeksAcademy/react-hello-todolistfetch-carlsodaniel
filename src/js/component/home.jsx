import React, { useState, useEffect } from "react";

const TodoListItems = ({ listelements, handleDeleteTask }) => {
  if (listelements.length === 0) {
    return <li className="list-group-item text-center">No hay pendientes, agrega una tarea</li>;
  } else {
    return listelements.map((item, index) => (
      <li className="list-group-item" key={index}>
        <div className="row">
          <div className="col-9">{item}</div>
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
    fetch('https://playground.4geeks.com/todo/user/alesanchezr')
      .then(resp => resp.json())
      .then(data => {
        setListelements(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddTask = () => {
    if (input1 !== "") {
      const updatedList = [...listelements, input1];
      setListelements(updatedList);
      setInput1("");

      fetch('https://playground.4geeks.com/todo/user/alesanchezr', {
        method: "PUT",
        body: JSON.stringify(updatedList),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(data => console.log('Task added successfully:', data))
        .catch(error => console.error('Error adding task:', error));
    }
  };

  const handleDeleteTask = (index) => {
    const updatedList = listelements.filter((_, idx) => idx !== index);
    setListelements(updatedList);

    fetch('https://playground.4geeks.com/todo/user/alesanchezr', {
      method: "PUT",
      body: JSON.stringify(updatedList),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => console.log('Task deleted successfully:', data))
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleClearAllTasks = () => {
    setListelements([]);

    fetch('https://playground.4geeks.com/todo/user/alesanchezr', {
      method: "PUT",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => console.log('All tasks cleared successfully:', data))
      .catch(error => console.error('Error clearing tasks:', error));
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

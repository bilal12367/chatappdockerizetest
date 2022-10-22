import React, { useState, useEffect } from "react";
import { TodoItem } from "../../../components/TodoItem";
import { useAppContext } from "../../../context/AppContext";
// import { Audio, } from 'react-loader-spinner'
const initState = {
  todoInput: "",
};
export const TodoPage = () => {
  const { user, isLoading, pushTodo, getTodos, todos, setSelectedUser } = useAppContext();
  const [state, setState] = useState(initState);

  const handleChange = (e) => {
    setState({ [e.target.name]: e.target.value });
  };
  const addTodo = (e) => {
    e.preventDefault();
    if (state.todoInput != "") {
      pushTodo(state.todoInput, Date.now());
      setState({ todoInput: "" });
    }
  };
  useEffect(() => {
    setSelectedUser(null);
    getTodos();
  }, []);
  return (
    <div className="card shadow p-3 todoComp" style={{ width: '40%', borderRadius: '20px' }}>
      <div
        className="tab-pane fade show active"
        id="nav-home"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
      >
        <div>
          <div className="tab-todo">
            {/* {!isLoading ? Object.values(todos).map((item) => {
            return <TodoItem key={item._id} todoItem={item} />;
          }):<div className="h-100 d-flex flex-row justify-content-center align-items-center"><Audio height='50px' width='50px' color="var(--primary-color)"/></div>} */}
            {Object.values(todos).map((item) => {
              return <TodoItem key={item._id} todoItem={item} />;
            })}
          </div>
          <form className="justify-content-center">
            <div className="row mb-2">
              <div className="col-8 d-flex flex-row">
                <input
                  className="flex-fill"
                  type="text"
                  name="todoInput"
                  style={{ marginBottom: "0px" }}
                  onChange={handleChange}
                  value={state.todoInput}
                  placeholder="Enter a todo"
                />
              </div>
              <div className="col-4 d-flex flex-row">
                <button
                  type="submit"
                  className="btn todoBtn btn-md btn-primary flex-fill"
                  onClick={addTodo}
                >
                  Add Todo
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

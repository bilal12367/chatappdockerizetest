import React, { useEffect, useState } from "react";
import moment from "moment";
import { useAppContext } from "../context/AppContext";
import { Modal } from "bootstrap";
// import { EditTodoModal } from "../pages/Modals";
const initialState = {
  checked: false,
};
export const TodoItem = ({ todoItem }) => {
  const { changeStateTodo } = useAppContext();
  const { setTodoItem } = useAppContext();
  const [state, setState] = useState(initialState);
  const handleChange = (e) => {
    if (e.target.checked) {
      setState({ checked: true });
      changeStateTodo(todoItem._id, true);
    } else {
      setState({ checked: false });
      changeStateTodo(todoItem._id, false);
    }
  };
  useEffect(() => {
    setState({ checked: todoItem.checked });
  }, []);

  const getDate = () => {
    var date = new Date(parseInt(todoItem.timestamp));
    var ago = moment(date).fromNow();
    return ago;
  };

  const toggleModal = async (e) => {
    var ele = e.target;
    if (ele.tagName!= "INPUT") {
      await setTodoItem(todoItem);
      var myModal = new Modal(document.getElementById("editTodoModal"));
      myModal.show();
    }
  };

  if (state.checked) {
    return (
      <div
        className="todoItem card shadow-sm p-3 mt-3"
        name="div"
        onClick={toggleModal}
      >
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row flex-fill">
            <div>
              <input onChange={handleChange} type="checkbox" checked />
            </div>
            <div style={{ width: "4%" }}></div>
            <div style={{ textDecoration: "line-through", color: "grey" }}>
              {todoItem.todo}
            </div>
          </div>
          <p style={{marginBottom:'0px'}}>{getDate()}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="todoItem card shadow-sm p-3 mt-3" onClick={toggleModal}>
        <div className="d-flex flex-row justify-content-between">
          <div className="d-flex flex-row flex-fill">
            <div>
              <input onChange={handleChange} type="checkbox" />
            </div>
            <div style={{ width: "4%" }}></div>
            <div>{todoItem.todo}</div>
          </div>
          <p style={{marginBottom:'0px'}}>{getDate()}</p>
        </div>
      </div>
    );
  }
};

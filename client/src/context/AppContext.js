import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./Reducer";
// import { useNavigate } from "react-router-dom";
import {
  DISPLAY_ALERT,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER,
  GET_TODOS,
  SET_TODOITEM,
  SET_PROFILE_PIC,
  SET_LOADING,
  CLEAR_LOADING,
  SET_SELECTED_USER,
  SET_MESSAGES,
  SET_SCROLL_TO_BOTTOM,
  SET_PARTICIPANTS_ONLINE,
  ADD_FILE_DICT,
  UPDATE_USER,
} from "./Actions";
import axios from "axios";
import { io } from "socket.io-client";

const AppContext = React.createContext();

const addUserToLocalStorage = ({ _id, name, email }, token) => {
  localStorage.setItem("user", JSON.stringify({ _id, name, email }));
  localStorage.setItem("token", token);
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const user = localStorage.getItem("user");

const initialState = {
  // url: "https://bilal-todo-mern.herokuapp.com",
  // url:"https://chatapp-mern-bilal.onrender.com",
  url: 'https://3.84.53.141:5000',
  // url: "http://localhost:5000",
  isLoading: true,
  showAlert: false,
  alertType: "",
  alertMessage: "",
  users: [],
  profileImage:
    "data:image/png;base64,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",
  todos: [],
  todoItem: "",
  user: user ? JSON.parse(user) : null,
  token: "",
  selectedUser: null,
  chatId: "",
  chatMessages: [],
  participantsOnline: null,
  scrollToBottom: null,
  files:{},
  nameStyle: { normalStyle: "", errorStyle: "errorStyle", title: "" },
  emailStyle: { normalStyle: "", errorStyle: "errorStyle", title: "" },
  passwordStyle: { normalStyle: "", errorStyle: "errorStyle", title: "" },
};
const url3 = "https://bilal-todo-mern.herokuapp.com";
const url4 = "https://chatapp-mern-bilal.onrender.com";
// const url2 = "http://192.168.0.10:5000"
const url2 = "http://3.84.53.141:5000"
const url = "http://localhost:5000";
const ENDPOINT = url2;
// const socket = io.connect(ENDPOINT);
// socket.on("connect", () => {
//   console.log("Connected");
// })
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const loginUser = async (data) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios
        .post(url2 + "/api/v1/login", data)
        .then((res) => {
          const { user, token } = res.data;
          if (user) {
            dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
            addUserToLocalStorage(user, token);
          }
        });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const registerUser = async (data) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    await axios
      .post(url2 + "/api/v1/register", data)
      .then((res) => {
        const { user, token } = res.data;
        if (user) {
          dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } });
          addUserToLocalStorage(user, token);
        }
      })
      .catch((err) => {
        if (err.response.data.msg == "email_exist") {
          dispatch({
            type: REGISTER_USER_ERROR,
            payload: { msg: ["Email already exists."] },
          });
        } else if (err.response.data.msg == "validation_error") {
          dispatch({
            type: REGISTER_USER_ERROR,
            payload: { msg: err.response.data.messages },
          });
        } else {
          dispatch({ type: REGISTER_USER_ERROR, payload: { msg: err.msg } });
        }
      });
  };

  const logout = async () => {
    removeUserFromLocalStorage();
    dispatch({ type: LOGOUT_USER });
  };

  const getTodos = async () => {
      dispatch({ type: SET_LOADING });
      await axios
        .post(url2 + "/api/v1/getTodos", { user: state.user })
        .then((res) => {
          dispatch({ type: GET_TODOS, todos: res.data.todos });
        });
  };

  const changeStateTodo = async (todoId, state) => {
    await axios
      .post(url2 + "/api/v1/updateTodoState", { todoId, state })
      .then((res) => { });
  };

  const pushTodo = async (todo, date) => {
    if (state.isLoading == false) {
      dispatch({ type: SET_LOADING });
      await axios
        .post(url2 + "/api/v1/addTodo", { user: state.user, todo, date })
        .then((res) => {
          dispatch({ type: CLEAR_LOADING });
          getTodos();
        });
    }
  };

  const setTodoItem = async (todoItem) => {
    dispatch({ type: SET_TODOITEM, payload: todoItem });
  };

  const updateTodo = async (todoItem) => {
    const response = await axios.post(url2 + "/api/v1/updateTodo", todoItem);
    if (response.data.acknowledged == true) {
      getTodos();
    }
  };

  const deleteTodo = async (todoItem) => {
    const response = await axios.post(url2 + "/api/v1/deleteTodo", todoItem);
    if (response.data.deletedCount == 1) {
      getTodos();
    }
  };

  const getAllUsers = async () => {
    if (state.isLoading != true) {
      dispatch({ type: SET_LOADING });
      await axios.get(url2 + "/api/v1/getAllUsers").then((res) => {
        dispatch({ type: CLEAR_LOADING });
      });
    }
  };

  const uploadImage = async (file, fileType, name) => {
    // Sending file along with data
    const data = new FormData();
    data.append("myFile", file);
    data.append("user1", JSON.stringify(state.user)); // Remember to stringify the whole object otherwise you will get '[Object]object' as string itself
    data.append("fileType", JSON.stringify({ fileType }));
    data.append("name", JSON.stringify({name: name}));
    await axios
      .post(url2 + "/api/v1/uploadfile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const updatedUser = res.data.updatedUser;
        const token = res.data.token;
        updateUser(updatedUser,token);
        getImage();
      })
      .catch((err) => {
      });
  };



  const getImage = async () => {
      dispatch({ type: SET_LOADING });
      await axios
        .get(url2 + "/api/v1/getFile", { params: { user: state.user } })
        .then((res) => {
          if (res.data.img) {
            var image = "data:image/png;base64," + res.data.img;
            dispatch({ type: SET_PROFILE_PIC, payload: { img: image } });
          }
        });
  };

  const setSelectedUser = async (user) => {
    dispatch({ type: SET_SELECTED_USER, payload: { user } });
  }

  const sendMessage = async (user, selectedUser, message, status, files) => {
    // if(state.participantsOnline){
    //   console.log("The participants are online")
    // }else{
    //   console.log("The participants are offline")
    // }
    try {
      var selectedUser1 = selectedUser.user;
      if (files == null) {
        var body = { user1: user, user2: selectedUser1, message, status }
      } else {
        var body = { user1: user, user2: selectedUser1, message, status, files }
      }
      await axios.post(url2 + '/api/v1/sendMessage', body)
      // getMessages(user,selectedUser);
    } catch (error) {
    }
  }
  // const rec_msg = (data) => {
  //   console.log("Get Messages app context")
  //   console.log(state.selectedUser.user.name)
  //   dispatch({ type: SET_MESSAGES, payload: { messages: data.messages } });
  // }
  // const getMessages = async (user1, selectedUser1) => {
  //   await socket.off("rec_msg");
  //   console.log("Get messages called")
  //   const data1 = { user: user1, selectedUser: selectedUser1.user }
  //   await socket.on("rec_msg",rec_msg)
  //   await socket.emit("user",{user:user1,selectedUser: selectedUser1.user})
  //   await socket.emit("get_messages", data1)
  // }


  const setScroll = () => {
    dispatch({ type: SET_SCROLL_TO_BOTTOM })
  }
  const setParticipantsOnline = (isOnline) => {
    dispatch({ type: SET_PARTICIPANTS_ONLINE, payload: { isOnline } })
  }

  const pushFile = (fileItem) => {
    dispatch({type: ADD_FILE_DICT, payload:{fileItem}})
  }

  const removeFileFromList = (file) => {
  }

  const updateUser = async(user1,token) => {
    addUserToLocalStorage({_id: user1._id,name: user1.name, email: user1.email},token)
    dispatch({type: UPDATE_USER, payload:{user: user1}})
    // await axios.post(url2+'/api/v1/getUser',{user: JSON.parse(user)}).then((response)=>{
    //   console.log('response :>> ', response.data.user);
    //   const user1 = response.data.user
    
    // })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        logout,
        getTodos,
        pushTodo,
        changeStateTodo,
        setTodoItem,
        updateTodo,
        deleteTodo,
        uploadImage,
        getImage,
        setSelectedUser,
        getAllUsers,
        sendMessage,
        setScroll,
        setParticipantsOnline,
        pushFile,
        removeFileFromList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };

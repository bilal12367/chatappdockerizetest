import React, { useEffect, useState } from "react";
// import { io } from 'socket.io-client'
import { UserItem } from "../../../components/UserItem";
import { useAppContext } from "../../../context/AppContext";
import { TailSpin } from "react-loader-spinner";
// import useFetch from '../../../context/useFetch'
const initialState = {
  isLoading: true,
  usersList: [],
};
const ChatList = ({ socket }) => {
  // const { data, loading, error, refetch } = useFetch(
  //     url2 + "/api/v1/getAllUsers"
  //   );
  const [listState, setListState] = useState(initialState);
  // const socket = io.connect(ENDPOINT);
  const { user } = useAppContext();
  useEffect(() => {
    // socket.on("connect",()=>{
    //   console.log("Connected in chatlist")
    // });
    socket.emit("get_user_chat_list", { user });
    socket.on("user_chat_list", (data) => {
      if (data.users.length == 0) {
        setListState({ isLoading: false, usersList: [] });
      } else {
        var usersList = data.users;
        usersList = sortList(usersList);
        setListState({ isLoading: false, usersList: usersList });
      }
    });
    return () => {};
  }, []);
  const sortList = (usersList) => {
    for (var i = 0; i < usersList.length; i++) {
      var temp = Date.parse(usersList[i].updatedAt);
      for (var j = i + 1; j < usersList.length; j++) {
        var temp2 = Date.parse(usersList[j].updatedAt);
        if (temp2 > temp) {
          [usersList[i], usersList[j]] = [usersList[j], usersList[i]];
          temp = temp2;
        }
      }
    }
    return usersList;
  };
  const renderMessageList = () => {
    return Object.values(listState.usersList).map((item) => {
      return <UserItem key={Math.random() * 1000} userItem={item} />;
    });
  };
  return (
    <div className="d-flex flex-column w-100" style={{ height: "100%" }}>
      {listState.usersList.length != 0 && listState.isLoading == false && (
        <div>{renderMessageList()}</div>
      )}
      {listState.isLoading == true && (
        <div
          className="w-100 d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <div className="p-2 d-flex flex-column align-items-center center">
            <TailSpin color="blue" />
            <p>Loading Please Wait...</p>
          </div>
        </div>
      )}
      {listState.usersList.length == 0 && listState.isLoading == false && (
        <div
          className="w-100 d-flex flex-column justify-content-center align-items-center"
          style={{ height: "100%" }}
        >
          <div
            className=" d-flex flex-column align-items-center center"
            style={{ padding: "0% 7%", textAlign: "center" }}
          >
            <div className="card shadow-sm" style={{padding:'5px 10px'}}>
              <h5>Navigate to search users tab to start chatting.</h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatList;

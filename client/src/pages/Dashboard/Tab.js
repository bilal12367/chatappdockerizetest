import React, { useState, useEffect } from "react";
import "../css/Tab.css";
import { TodoItem } from "../../components/TodoItem";
import { useAppContext } from "../../context/AppContext";
import { ChatPage } from "./Tabs/ChatPage";
import { Tabs,Row as Col,Nav,Tab as Tab1 } from "react-bootstrap";
import { TodoPage } from "./Tabs/TodoPage";
export const Tab = () => {
  const handleSelect = (key) => {
    if (key == "chatPage") {
      document.getElementsByClassName("dashboardCard")[0].style.width = "60%";
    } else {
      document.getElementsByClassName("dashboardCard")[0].style.width = "40%";
    }
  };
  return (
    <div
      className="d-flex flex-row justify-content-center align-items-start"
      style={{ height: "100%" }}
    >
      <div className="card shadow-sm dashboardCard">
        <Tab1.Container className="d-flex flex-row" id="left-tabs-example" defaultActiveKey="todoPage">
          <Col className="d-flex flex-row">
              <Nav variant="tabs" onSelect={handleSelect} className="nav-tabs d-flex flex-row">
                <div className="flex-fill">
                  <Nav.Link className="d-flex flex-row justify-content-center" eventKey="todoPage">Todo</Nav.Link>
                </div>
                <div className="flex-fill"> 
                  <Nav.Link className="d-flex flex-row justify-content-center" eventKey="chatPage">Chats</Nav.Link>
                </div>
              </Nav>
              <Tab1.Content>
                <Tab1.Pane eventKey="todoPage">
                  <TodoPage/>
                </Tab1.Pane>
                <Tab1.Pane eventKey="chatPage">
                  
                  <ChatPage/>
                </Tab1.Pane>
              </Tab1.Content>
          </Col>
        </Tab1.Container>
      </div>
    </div>
  );
};

// <Tabs
//           defaultActiveKey="todoPage"
//           transition={false}
//           id="noanim-tab-example"
//           className="tabs mb-3 d-flex flex-row"
//           onSelect={handleSelect}
//         >
//           <Tab eventKey="todoPage" className="tab" title="Todo">
//             <TodoPage/>
//           </Tab>
//           <Tab eventKey="chatPage" className="tab" title="Chats">
//             <ChatPage/>
//           </Tab>
//           <Tab eventKey="contact" className="tab" title="Contact"></Tab>
//         </Tabs>

// <nav>
//           <div className="nav nav-tabs" id="nav-tab" role="tablist">
//             <button
//               className="nav-link active"
//               id="nav-home-tab"
//               data-bs-toggle="tab"
//               data-bs-target="#nav-home"
//               type="button"
//               role="tab"
//               aria-controls="nav-home"
//               aria-selected="true"
//             >
//               Todos
//             </button>
//             <button
//               className="nav-link"
//               id="nav-profile-tab"
//               data-bs-toggle="tab"
//               data-bs-target="#nav-chat"
//               type="button"
//               role="tab"
//               aria-controls="nav-chat"
//               aria-selected="false"
//             >
//               View All Todos
//             </button>
//             <button
//               className="nav-link"
//               id="nav-contact-tab"
//               data-bs-toggle="tab"
//               data-bs-target="#nav-contact"
//               type="button"
//               role="tab"
//               aria-controls="nav-contact"
//               aria-selected="false"
//             >
//               View All users
//             </button>
//           </div>
//         </nav>
//         <div
//           style={{ height: "100%" }}
//           className="tab-content"
//           id="nav-tabContent">
//           <div
//             className="tab-pane fade show active"
//             id="nav-home"
//             role="tabpanel"
//             aria-labelledby="nav-home-tab"
//           >
//             <div>
//               <div className="tab-todo">
//                 {Object.values(todos).map((item) => {
//                   return <TodoItem key={item._id} todoItem={item} />;
//                 })}
//               </div>
//               <form className="justify-content-center">
//                 <div className="row">
//                   <div className="col-8 d-flex flex-row">
//                     <input
//                       className="flex-fill"
//                       type="text"
//                       name="todoInput"
//                       style={{ marginBottom: "0px" }}
//                       onChange={handleChange}
//                       value={state.todoInput}
//                       placeholder="Enter a todo"
//                     />
//                   </div>
//                   <div className="col-4 d-flex flex-row">
//                     <button
//                       type="submit"
//                       className="btn todoBtn btn-md btn-primary flex-fill"
//                       onClick={addTodo}
//                     >
//                       Add Todo
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//           <div
//             className="tab-pane fade"
//             id="nav-chat"
//             role="tabpanel"
//             aria-labelledby="nav-profile-tab"
//           >
//             <ChatPage/>
//           </div>
//           <div
//             className="tab-pane fade"
//             id="nav-contact"
//             role="tabpanel"
//             aria-labelledby="nav-contact-tab"
//           >
//             <h1>Tab 3 Page</h1>
//           </div>
//         </div>

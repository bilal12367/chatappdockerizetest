import logo from "./logo.svg";
import "./App.css";
import React from 'react';
import './pages/pages.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { About, Landing, Login, Register } from "./pages/index.js";
import Dashboard from './pages/Dashboard/Dashboard.js'
import { TodoPage } from "./pages/Dashboard/Tabs/TodoPage";
import { ChatPage } from "./pages/Dashboard/Tabs/ChatPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<ChatPage/>}/>
            <Route path="todo" element={<TodoPage/>}/>
            <Route path="chat" element={<ChatPage/>}/>
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

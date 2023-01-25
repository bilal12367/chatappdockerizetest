import React, { useEffect, useRef, useState } from 'react'
import { Tabs, Tab, Nav } from 'react-bootstrap'
import { UserItem } from '../../../components/UserItem'
import { useAppContext } from '../../../context/AppContext'
import useFetch from '../../../context/useFetch'
import { Audio, TailSpin } from 'react-loader-spinner'
import { ChatSection } from './ChatSection'
import ChatList from './ChatList'
import UsersList from './UsersList'
import { io } from 'socket.io-client'
const ENDPOINT2 = 'http://localhost:5000';
const ENDPOINT3 = 'https://bilal-todo-mern.herokuapp.com';
const ENDPOINT4 = "https://chatapp-mern-bilal.onrender.com";
// const ENDPOINT = "192.168.0.10:5000"
const ENDPOINT = "3.84.53.141:5000"

//git test
export const ChatPage = () => {
  const { isLoading, selectedUser, user } = useAppContext()
  const url3 = 'https://bilal-todo-mern.herokuapp.com';
  const url4 = "https://chatapp-mern-bilal.onrender.com";
  // const url2 = "http://192.168.0.10:5000";
  const url2 = "http://3.84.53.141:5000";
  const url = 'http://localhost:5000';
  const { data, loading, error, refetch } = useFetch(
    url2 + '/api/v1/getAllUsers',
  )
  const [socket, setSocket] = useState(null)
  const handleSelect = (key) => {}
  useEffect(() => {
    var socket1 = io.connect(ENDPOINT)
    setSocket(socket1)
    socket1.on('connect', () => {
      socket1.emit('user', { user: user })
    })
    return () => {
      socket?.emit('closing', { user, selectedUser: selectedUser.user })
      socket?.disconnect()
      // socket?.close();
    }
  }, [])
  return (
    <div
      id="screen"
      className="card shadow"
      style={{ width: '100%', borderRadius: '20px', overflow: 'hidden' }}
    >
      <div className="row" style={{ height: '85vh', overflowY: 'clip' }}>
        <div className="usersCol h-100 p-0" id="usersCol">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Nav className="flex-row tab-row">
              <div className="flex-fill justify-content-center">
                <Nav.Link
                  eventKey="first"
                  className="d-flex justify-content-center"
                  style={{ padding: '18px 0px' }}
                >
                  Chats
                </Nav.Link>
              </div>
              <div className="flex-fill justify-content-center">
                <Nav.Link
                  eventKey="second"
                  className="d-flex justify-content-center"
                  style={{ padding: '18px 0px' }}
                >
                  Search Users
                </Nav.Link>
              </div>
            </Nav>
            <Tab.Content style={{ height: '95%', overflowY: 'scroll' }}>
              <Tab.Pane eventKey="first" >
                  {socket != null && <ChatList socket={socket} />}
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <UsersList url2={url2} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
        <div className="p-0 h-100" id="chatCol">
          {selectedUser != null && socket != null ? (
            <ChatSection selectedUser={selectedUser} socket={socket} />
          ) : (
            <div
              className="h-100 w-100 d-flex flex-column justify-content-center align-items-center"
              style={{ backgroundColor: 'var(--accent-color)' }}
            >
              <div className="card shadow-sm p-2">
                <p className="mb-0">Select someone from list to chat</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// <Tabs
//   id="controlled-tab-example"
//   onSelect={this.handleSelect}
//   style={{ backgroundColor: "yellow", width: "35%" }}
//   className="mb-3 d-flex flex-row"
// >
//   <Tab className="flex-fill" eventKey="chats" title="Chats"></Tab>
//   <Tab className="flex-fill" eventKey="findpeople" title="Find People"></Tab>
// </Tabs>;

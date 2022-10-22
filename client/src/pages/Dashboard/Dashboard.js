import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faHome,
  faHandsHelping,
  // faInbox,
  // faInfo,
  // faContactCard,
  // faDonate,
  faPerson,
} from '@fortawesome/free-solid-svg-icons'
// import { Tab } from "./Tab";
import '../css/Dashboard.css'
import Navbar from './Navbar'
import { EditProfileModal, EditTodoModal } from '../Modals'

const Dashboard = () => {
  const { user, setTodoId } = useAppContext()
  const navigate = useNavigate()
  var currentItem
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const toggleNavbar = () => {
    // console.log(window.screen.width);
    var bg = document.getElementsByClassName('bg')[0]
    var navbar = document.getElementsByClassName('navbar')[0]
    bg.classList.toggle('bg-anim')
    navbar.classList.toggle('navbar-anim')
  }

  const menuItems = [
    { icon: <FontAwesomeIcon icon={faHome} />, title: 'Chat', path: '/chat' },
    {
      icon: <FontAwesomeIcon icon={faHandsHelping} />,
      title: 'Todo',
      path: '/todo',
    },
    {
      icon: <FontAwesomeIcon icon={faPerson} />,
      title: 'About Developer',
      path: '/about',
    },
  ]
  return (
    <main>
      <div className="bg">
        <EditProfileModal user={user} />
        <EditTodoModal />
        <div
          className="vh-100 d-flex flex-column mainContent"
          id="mainContent"
          onDragOver={(event) => {
            event.preventDefault()
          }}
        >
          <div className="navbar-top d-flex flex-row justify-content-between p-3 card shadow">
            <FontAwesomeIcon
              className="navbar-toggle"
              onClick={toggleNavbar}
              icon={faBars}
            />
          </div>
          {/* <Tab /> */}
          <div
            className="d-flex flex-row justify-content-center"
            style={{
              margin: '10px 20px',
              padding: '2 0px 0px',
              borderRadius: '20px',
            }}
          >
            <Outlet />
          </div>
        </div>
        <div className="d-flex flex-column justify-content-start navbar card shadow">
          <Navbar />
          <div className="nav-items">
            {Object.values(menuItems).map((item) => {
              currentItem = item
              return (
                <div
                  key={item.path}
                  className="card1 d-flex flex-row justify-content-start align-items-center card shadow-sm mt-3"
                  onClick={() => {
                    // Toggle Hide Navbar here
                    toggleNavbar()
                    navigate('/dashboard' + item.path)
                  }}
                >
                  {item.icon}
                  <div style={{ marginLeft: '15px' }}>{item.title}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard

import React, { useEffect, useRef, useState } from 'react'
// import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faFileArrowUp,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons'
import { useAppContext } from '../../../context/AppContext'
import { io } from 'socket.io-client'
import UserStat from '../../../components/UserStat'
import MessageItem from '../../../components/MessageItem'
import FileItem from '../../../components/FileItem'


// Updated

const initialState = {
  cnt: 0,
  val: '',
  message: '',
  selectedFiles: null,
}
const initialState2 = {
  messages: [],
}
const fileState = {
  files: [],
}
export const ChatSection = ({ selectedUser1, socket }) => {
  const [state, setState] = useState(initialState)
  const [state2, setState2] = useState(initialState2)
  const [state3, setFileState] = useState(fileState)
  const ref = useRef()
  const chatSectionRef = useRef()
  const dropzoneRef = useRef(null)
  const dropzoneChildRef = useRef(null)
  const {
    user,
    chatId,
    selectedUser,
    sendMessage,
    participantsOnline,
    chatMessages,
    scrollToBottom,
    setScroll,
    setMessages,
  } = useAppContext()
  var chatId1 = ''
  // const socket = io.connect(ENDPOINT);
  const messageList = () => {
    return Object.values(state2.messages).map((item) => {
      return <MessageItem key={Math.random() * 1000} item={item} />
    })
  }
  useEffect(() => {
    if (!ref.current) {
      // ComponentDidMount
      ref.current = true
    } else {
      //Component did update
      socket.on('rec_msg_update', (data) => {
        var list = state2.messages
        if (!list.includes(data.message)) {
          list.push(data.message)
          setState2({ messages: list })
          scrollToBottom1()
        }
      })
    }
  })
  useEffect(() => {
    chatId1 =
      user._id > selectedUser.user._id
        ? user._id + '_' + selectedUser.user._id
        : selectedUser.user._id + '_' + user._id
    // getMessages(user,selectedUser)
    socket.emit('get_messages', { user, selectedUser: selectedUser.user })
    socket.on('rec_msg', (data) => {
      setState2({ ...state2, messages: data.messages })
      scrollToBottom1()
    })
  }, [selectedUser])

  if (scrollToBottom == true) {
    scrollToBottom1()
  }

  function scrollToBottom1() {
    const chatBox = document.getElementById('chat-box')
    setTimeout(() => {
      // chatBox.scrollTop = chatBox.scrollHeight;
      chatBox.scroll({ top: chatBox.scrollHeight, behavior: 'smooth' })
      setScroll()
    }, 300)
  }
  const sendMsg = (e) => {
    e.preventDefault()
    var input_message = document.getElementById('input_message')
    // setState({ ...state, message: '' });
    sendMessage(
      user,
      selectedUser,
      input_message.value,
      participantsOnline ? 'online' : 'offline',
      state.selectedFiles,
    )
    setState({ ...state, selectedFiles: null })
    var body = {
      user1: user,
      user2: selectedUser.user,
      message: input_message.value,
      status: participantsOnline ? 'online' : 'offline',
    }
    // socket.emit("send_message",body)
    input_message.value = ''
  }
  const goBack = () => {
    var usersCol = document.getElementById('usersCol')
    var chatCol = document.getElementById('chatCol')
    usersCol.classList.toggle('usersCol-trans')
    chatCol.classList.toggle('chatCol-trans')
  }

  var timer = null
  const showDropZone = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.add('dropzoneShow')
      dropzoneChildRef.current.style.opacity = '1'
    } else {
      document.getElementById('chatRef').classList.add('dropzoneShow')
      document.getElementById('dropRef').style.opacity = '1'
    }
  }
  const hideDropZone = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.classList.remove('dropzoneShow')
      dropzoneChildRef.current.style.opacity = '0'
    } else {
      document.getElementById('chatRef').classList.remove('dropzoneShow')
      document.getElementById('dropRef').style.opacity = '0'
    }
  }
  const dragOver = (e) => {
    e.preventDefault()
    clearTimeout(timer)
    showDropZone()
    timer = setTimeout(() => {
      dragLeave()
    }, 200)
  }
  const dragLeave = () => {
    hideDropZone()
  }
  const dropFile = (event) => {
    event.preventDefault()
    clearTimeout(timer)
    var files = event.dataTransfer.files
    var body
    var filesPar = []
    Object.values(files).map((file) => {
      var fileReader = new FileReader()
      fileReader.onload = () => {
        let fileUrl = fileReader.result
        filesPar.push({
          name: file.name,
          size: file.size,
          type: file.type,
          fileData: fileUrl,
        })
        if (filesPar.length == files.length) {
          setState({ ...state, selectedFiles: filesPar })
        }
      }
      fileReader.readAsDataURL(file)
    })
  }
  const droppedAgain = (event) => {
    event.preventDefault()
    var files = event.dataTransfer.files
    var filesPar = state.selectedFiles
    var filesParLen = filesPar.length
    Object.values(files).map((file) => {
      var fileReader = new FileReader()
      fileReader.onload = () => {
        let fileUrl = fileReader.result
        filesPar.push({
          name: file.name,
          size: file.size,
          type: file.type,
          fileData: fileUrl,
        })
        if (filesPar.length == files.length + filesParLen) {
          setState({ ...state, selectedFiles: filesPar })
        }
      }
      fileReader.readAsDataURL(file)
    })
  }
  const toggleDropZone = () => {
    dropzoneRef.current.classList.toggle('dropzoneShow')
    scrollToBottom1()
    if (dropzoneRef.current.style.opacity == '0') {
      dropzoneRef.current.style.opacity = '1'
    } else if (dropzoneRef.current.style.opacity == '1') {
      dropzoneRef.current.style.opacity = '0'
    }
  }
  const browseFiles = () => {
    var input = document.createElement('input')
    input.type = 'file'
    input.multiple = 'multiple'
    input.onchange = (e) => {
      e.preventDefault()
      var files = e.target.files
      var filesPar = state.selectedFiles
      var filesParLen ;
      if(filesPar){
        filesParLen = filesPar.length
      }else{
        filesParLen = 0;
      }
      Object.values(files).map((file) => {
        var fileReader = new FileReader()
        fileReader.onload = () => {
          let fileUrl = fileReader.result
          if(filesPar==null){
            filesPar = []
          }
          filesPar.push({
            name: file.name,
            size: file.size,
            type: file.type,
            fileData: fileUrl,
          })
          if (filesPar.length == files.length + filesParLen) {
            setState({ ...state, selectedFiles: filesPar })
            ('State set at drop again')
          }
        }
        fileReader.readAsDataURL(file)
      })
    }
    input.click()
  }
  const DropZone = () => {
    return (
      <div
        ref={dropzoneRef}
        onDrop={dropFile}
        id="chatRef"
        className="d-flex justify-content-center align-items-center dropzone"
      >
        <div
          ref={dropzoneChildRef}
          id="dropRef"
          className="d-flex flex-column justify-content-center align-items-center bg-light"
          style={{ padding: '10px 25px', borderRadius: '10px' }}
        >
          <FontAwesomeIcon
            icon={faFileArrowUp}
            style={{ fontSize: '60px', color: '#3d54e3', padding: '10px' }}
          />
          <span
            style={{ padding: '10px', color: '#3d54e3', fontWeight: 'bold' }}
          >
            Drop Files Here
          </span>
          <button className="w-100 btn btn-primary" onClick={browseFiles}>
            Browse Files
          </button>
        </div>
      </div>
    )
  }
  const removeFileFromList = (file) => {
    const arr = state.selectedFiles
    arr.splice(arr.indexOf(file), 1)
    setState({ ...state, selectedFiles: arr })
  }
  const getFilesItems = () => {
    return Object.values(state.selectedFiles).map((item, idx) => {
      return <FileItem idx={idx} fileItem={item} remFile={removeFileFromList} />
    })
  }
  return (
    <div
      ref={chatSectionRef}
      onDragOver={dragOver}
      onDrop={(event) => {
        event.preventDefault()
      }}
      className="h-100 d-flex flex-column chatSection"
      id="chatSection"
      style={{ backgroundColor: 'var(--accent-color)' }}
    >
      <div
        className="w-100 d-flex flex-row align-items-center p-2"
        style={{ backgroundColor: 'white', color: 'black' }}
      >
        <FontAwesomeIcon
          className="backBtn"
          icon={faArrowLeft}
          style={{ padding: '10px' }}
          onClick={goBack}
        />
        <img
          style={{ borderRadius: '35px', objectFit: 'cover' }}
          height="40px"
          width="40px"
          src={selectedUser.profPic}
        />
        <h5 className="m-2">{selectedUser.user.name}</h5>
        {/* <p className='m-0'>{selectedUser.user.email}</p> */}
        <UserStat socket={socket} />
      </div>
      <div
        className="h-100 chat-box"
        id="chat-box"
        style={{
          overflowY: 'scroll',
          overflowX: 'hidden',
          paddingBottom: '20px',
        }}
      >
        {state2.messages.length == 0 ? (
          <div className="d-flex h-100 justify-content-center align-items-center">
            <div className="card shadow p-3">
              Be the first one to say hi to {selectedUser.user.name}
            </div>
          </div>
        ) : (
          messageList()
        )}
      </div>
      {(state.selectedFiles == null || state.selectedFiles.length == 0) &&
        DropZone()}
      {state.selectedFiles != null &&
        state.selectedFiles.length != 0 }
      {state.selectedFiles && (
        <div
          onDrop={droppedAgain}
          className="d-flex flex-row justify-content-start flex-wrap"
          style={{
            // padding: '20px 10px 10px 10px',
            borderTopLeftRadius: '14px',
            borderTopRightRadius: '14px',
          }}
        >
          {getFilesItems()}
        </div>
      )}
      <form onSubmit={sendMsg}>
        <div
          className="d-flex flex-row align-items-center"
          style={{ backgroundColor: 'white', borderRadius: '0px' }}
        >
          <FontAwesomeIcon
            onClick={toggleDropZone}
            className="flex-item hoverIcon"
            style={{ fontSize: '25px', padding: '10px', margin: '10px' }}
            icon={faPaperclip}
          />
          <div className="flex-fill p-2">
            <input
              className="w-100 m-0"
              id="input_message"
              style={{ border: 'none' }}
              name="message"
              type="text"
            />
          </div>
          <div
            className="flex-item"
            style={{ width: '20%', padding: '0px 10px' }}
          >
            <button
              type="submit"
              className="w-100 btn btn-dark"
              onClick={sendMsg}
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

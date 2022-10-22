import { useAppContext } from '../context/AppContext'
import react, { useEffect, useState } from 'react'
// import axios from 'axios'
export const EditProfileModal = (user) => {
  const { uploadImage, profileImage, refetchUser } = useAppContext()
  const initialState = {
    name: user.user.name,
    bio: '',
  }
  const[state,setState] = useState(initialState);
  const saveData = () => {
    var preview = document.getElementById('showImg')
    var file = document.getElementById('fileInput').files[0]
    var reader = new FileReader()
    if (file || user.user.name != state.name) {
      console.log('if executed')
      uploadImage(file, 'profPic', state.name)
      // reader.readAsDataURL(file)
      // reader.onload = function () {
      //   preview.src = reader.result
      //   var bytes =
      //     (new Blob([reader.result]).size / 1048576).toFixed(2) + ' MB'
      // }
    }
  }

  const changeImg = () => {
    var preview = document.getElementById('showImg')
    var file = document.getElementById('fileInput').files[0]
    var reader = new FileReader()
    if (file) {
      reader.readAsDataURL(file)
      reader.onload = function () {
        preview.src = reader.result
        var bytes =
          (new Blob([reader.result]).size / 1048576).toFixed(2) + ' MB'
      }
    }
  }

  const btnMap = (e) => {
    e.preventDefault()
    document.getElementById('fileInput').click()
  }
  const handleChange = (e) => {
    setState({[e.target.name]:[e.target.value]})
  }
  return (
    <div
      className="modal fade"
      id="editProfileModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-md  modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Edit Profile
            </h5>
            <button
              type="button"
              className="btn btn-default"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              X
            </button>
          </div>
          <div className="modal-body">
            <form className="d-flex flex-column align-items-center">
              <img
                id="showImg"
                className="nav-header-pic"
                style={{
                  height: '100px',
                  width: '100px',
                  margin: '0px 0px 20px 0px ',
                }}
                src={profileImage}
                alt="img"
                height="150"
              />
              <input
                id="fileInput"
                type="file"
                placeholder="Edit Image"
                accept="image/png, image/gif, image/jpeg"
                onChange={changeImg}
                style={{ display: 'none' }}
              />
              <button className="btn btn-primary" onClick={btnMap}>
                Change Image
              </button>
              <div className='w-100 d-flex flex-column p-3'>
                <label>Change Name</label>
                <input onChange={handleChange} value={state.name} name='name' type="text" placeholder='Change Name'/>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              data-bs-dismiss="modal"
              onClick={saveData}
              className="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const EditTodoModal = () => {
  const { todoItem, updateTodo, deleteTodo } = useAppContext()
  const initialState = {
    todoInput: '',
  }
  const [state, setState] = useState(initialState)

  const handleChange = (e) => {
    setState({ todoInput: e.target.value })
  }

  const updateTodo1 = () => {
    const todo1 = todoItem
    todo1.todo = state.todoInput
    updateTodo(todo1)
  }

  const deleteTodo1 = () => {
    deleteTodo(todoItem)
  }

  useEffect(() => {
    setState({ todoInput: todoItem.todo })
  }, [todoItem])

  return (
    <div>
      <div
        className="modal fade"
        id="editTodoModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit Todo
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                style={{
                  borderRadius: '5px',
                  border: '1px solid black',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  padding: '4px 10px',
                }}
                aria-label="Close"
              >
                X
              </button>
            </div>
            <div className="modal-body p-3 d-flex flex-row">
              <div className="flex-fill">
                <textarea
                  type="text"
                  rows="5"
                  value={state.todoInput}
                  onChange={handleChange}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
            <div className="modal-footer d-flex flex-row justify-content-between">
              <div className="">
                <button
                  data-bs-dismiss="modal"
                  className="btn btn-danger"
                  onClick={deleteTodo1}
                >
                  Delete Todo
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  style={{ marginRight: '10px' }}
                >
                  Close
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  onClick={updateTodo1}
                  className="btn btn-primary"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

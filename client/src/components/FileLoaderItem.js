import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
// import useFetch from '../context/useFetch'
import FileItem from './FileItem'
import { TailSpin } from 'react-loader-spinner'
const initialState = {
  isLoading: true,
  fileItem: null,
}
const initialState2 = {
  filesLoading: [],
}
const FileLoaderItem = ({ idx, fileId }) => {
  const { url, scrollToBottom, files, pushFile } = useAppContext()
  const [state, setState] = useState(initialState)
  const [state2, setState2] = useState(initialState2)
  // const { data, isLoading, error, refetch } = useFetch("http://localhost:5000" + '/api/v1/getFileFromId',{fileId: fileId})
  const ref = useRef()
  useEffect(() => {
    if (!ref.current) {
      ref.current = true
    } else {
    }
    // console.log("---------------------------------------")
    // console.log(files[fileId])
    // console.log("files[fileId]==undefined")
    // console.log(files[fileId]==undefined)
    // console.log("Scroll To Bottom != null")
    // console.log(scrollToBottom!=null)
    // console.log("FileId:"+fileId)
    // console.log(files)
    // console.log("Local state files loading includes")
    // console.log(state2.filesLoading);
    // console.log("---------------------------------------")
    if (
      scrollToBottom != null &&
      files[fileId] == undefined &&
      !state2.filesLoading.includes(fileId)
    ) {
      var list2 = state2.filesLoading
      list2.push(fileId)
      setState2({ filesLoading: list2 })
      axios
        .post(url + '/api/v1/getFileFromId', { fileId: fileId })
        .then((res) => {
          var fileItem = res.data.res
          setState({ isLoading: false, fileItem: fileItem })
          pushFile(fileItem)
        })
    } else {
      if (files[fileId] != undefined) {
        var fileItem = files[fileId]
      }
      setState({ isLoading: false, fileItem: fileItem })
    }
  }, [])
  if (scrollToBottom != null && state.fileItem != null) {
    return (
      <FileItem
        idx={Math.random() * 1000}
        fileItem={state.fileItem}
        ctxt={'msg'}
      />
    )
  } else {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          height: '180px',
          width: '180px',
          margin: '10px',
          borderRadius: '10px',
          backgroundColor: 'white',
        }}
      >
        <TailSpin color="blue" />
      </div>
    )
  }
}

export default FileLoaderItem

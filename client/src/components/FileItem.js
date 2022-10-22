import React, { useEffect, useRef } from 'react'
import {
  faImage,
  faFileArchive,
  faFileLines,
  faVolumeHigh,
  faClose,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAppContext } from '../context/AppContext'
const FileItem = ({ idx, fileItem, ctxt, remFile }) => {
  var cursorptr = 'pointer'
  if (ctxt == undefined) {
    cursorptr = 'default'
  } else if (ctxt == 'msg') {
    cursorptr = 'pointer'
  }
  var src
  const { removeFileFromList } = useAppContext()
  useEffect(() => {}, [])
  var icon
  if (fileItem.type.includes('image')) {
    icon = faImage
    if (fileItem.fileUrl == undefined || fileItem.fileUrl == null) {
      src = fileItem.fileData
    } else {
      src = fileItem.fileUrl
    }
  } else if (fileItem.name.includes('zip') || fileItem.name.includes('rar')) {
    icon = faFileArchive
    src = null
  } else if (fileItem.type.includes('audio')) {
    icon = faVolumeHigh
    src = null
  } else {
    icon = faFileLines
    src = null
  }
  const downloadFile = () => {
    if (ctxt != undefined) {
      const file = document.createElement('a')
      file.href = fileItem.fileUrl
      file.setAttribute('download', fileItem.name)
      document.body.appendChild(file)
      file.click()
      file.parentNode.removeChild(file)
    }
  }
  const removeFileFromList1 = () => {
    remFile(fileItem)
  }
  return (
    <div
      key={idx}
      onClick={downloadFile}
      className="d-flex flex-column card shadow justify-content-between align-items-center m-2"
      style={{
        width: '180px',
        height: '170px',
        backgroundColor: 'white',
        borderRadius: '16px',
        overflow: 'clip',
        border: '4px solid #f0f0f0',
        cursor: cursorptr,
      }}
    >
      {src == null && (
        <FontAwesomeIcon
          icon={icon}
          style={{ fontSize: '60px', color: 'grey', margin: 'auto 0px' }}
        />
      )}
      {src && (
        <div style={{ height: '100px' }}>
          <img style={{ objectFit: 'fill', width: '100%' }} src={src} />
        </div>
      )}
      {ctxt != 'msg' && (
        <div
          style={{
            position: 'absolute',
            top: '4px',
            right: '10px',
            padding: '0px 6px',
            borderRadius: '4px',
            color: 'grey',
            border: '1px solid grey',
          }}
        >
          <FontAwesomeIcon
            style={{ fontSize: '15px', cursor: 'pointer' }}
            icon={faClose}
            onClick={removeFileFromList1}
          />
        </div>
      )}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: '60px',
          backgroundColor: '#f0f0f0',
          width: '100%',
          textAlign: 'center',
          fontSize: '12px',
        }}
      >
        <span style={{ overflowWrap: 'anywhere' }}>{fileItem.name}</span>
      </div>
    </div>
  )
}

export default FileItem

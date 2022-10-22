import React, { useEffect } from 'react'

const ImageComponent = (src) => {
  useEffect(() => {}, [])
  return (
    <div style={{ position: 'relative' }}>
      <img
        className="bg-light rounded-circle imgComp"
        src={src.src}
        style={{
          margin: '0px',
          height: 'unset',
          aspectRatio: '1',
          width: '100%',
          backgroundColor: 'white',
          boxShadow: 'rgb(255 255 255 / 33%) 0px 0px 0px 8px',
        }}
      />
      <div
        className="rounded-circle"
        style={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          height: '40px',
          width: '40px',
          backgroundColor: '#6b707a',
          boxShadow: 'rgb(255 255 255 / 33%) 0px 0px 0px 8px',
        }}
      ></div>
      <div
        className="rounded-circle"
        style={{
          position: 'absolute',
          top: ' -13px',
          left: '-23px',
          height: '80px',
          width: '80px',
          zIndex: '1',
          backgroundColor: '#6b707a',
          boxShadow: 'rgb(255 255 255 / 33%) 0px 0px 0px 8px',
        }}
      ></div>
    </div>
  )
}

export default ImageComponent

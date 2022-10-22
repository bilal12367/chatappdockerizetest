import React from 'react'
import ImageComponent from './Image'

const RowSkill = (props) => {
    const {type,img,content} = props;
  if (type == 'normal') {
    return (
      <div
        className="d-flex flex-row st-pad"
        style={{ color: 'white', backgroundColor: '#918b97' }}
      >
        <div className="col-2">
          <ImageComponent src={img} />
        </div>
        <div className="col-1"></div>
        <div className="col-9 m-auto">
          <p className="p1">{content}</p>
        </div>
      </div>
    )
  } else if (type == 'reverse') {
    return <div
      className="d-flex flex-row-reverse st-pad"
      style={{ color: 'white', backgroundColor: 'rgb(164 156 173)' }}
    >
      <div className="col-2">
        <ImageComponent src={img} />
      </div>
      <div className="col-1"></div>
      <div className="col-9 m-auto">
        <p className="p1">{content}</p>
      </div>
    </div>
  }
}

export default RowSkill

import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import FileLoaderItem from './FileLoaderItem';
import '../pages/css/Tab.css'
const MessageItem = ({ item }) => {
    const { user, selectedUser } = useAppContext();
    var time = new Date(item.updatedAt);
    useEffect(() => {

    }, [])
    if (item.from == user._id) {
        return (<div key={Math.random() * 1000} className="speech-wrapper" id='speech-wrapper-right'>
            <div className="bubble alt">
                <div className="txt">
                    <p className="name alt">{user.name}</p>
                    <p className="message">{item.message}</p>
                    <div>{item.files && Object.values(item.files).map((file, idx) => {
                        return <FileLoaderItem key={idx} fileId={file} />
                    })}</div>
                    <span className="timestamp">{time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear()}</span>
                </div>
                <div className="bubble-arrow alt"></div>
            </div> </div >)
    } else {
        return (

            <div key={Math.random() * 1000} className="speech-wrapper">
                <div className="bubble">
                    <div className="txt">
                        <p className="name">{selectedUser.user.name}</p>
                        <p className="message">{item.message}</p>
                        <div>{item.files && Object.values(item.files).map((file, idx) => {
                            return <FileLoaderItem key={idx} fileId={file} />
                        })}</div>
                        <span className="timestamp">{time.getDate() + "/" + time.getMonth() + "/" + time.getFullYear()}</span>
                    </div>
                    <div className="bubble-arrow"></div>
                </div>
            </div>)
    }
}

export default MessageItem
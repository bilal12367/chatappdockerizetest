import { React, useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext.js';

const UserStat = ({ socket }) => {
    const [status, setStatus] = useState("loading");
    const { user, selectedUser, setParticipantsOnline } = useAppContext();
    useEffect(() => {
        setStatus("loading")
        if (user != null) {
            socket.emit("user", { user, selectedUser: selectedUser.user })
            socket.emit("get_stat", selectedUser.user)
        }
        socket.on("user_status", (data) => {
            var id;
            if (user._id > selectedUser.user._id) {
                id = user._id + "_" + selectedUser.user._id;
            } else {
                id = selectedUser.user._id + "_" + user._id;
            }
            if (data.status == "online" && data.chat_id == id) {
                setParticipantsOnline(true);
            } else {
                setParticipantsOnline(false);
            }
            setStatus(data.status)
        })
        socket.on("user_stat_changed", (data) => {
            if (data.user_id == selectedUser.user._id) {
                setStatus(data.status);
            }
            var id;
            if (user._id > selectedUser.user._id) {
                id = user._id + "_" + selectedUser.user._id;
            } else {
                id = selectedUser.user._id + "_" + user._id;
            }
            if (data.status == "online" && data.chat_id == id) {
                setParticipantsOnline(true);
            } else {
                setParticipantsOnline(false);
            }
        })
        return () => {

        }
    }, [selectedUser])

    if (status == "online") {
        return (
            <div className='d-flex align-items-center'>
                <span className="logged-in" style={{ cursor: "default" }}>●</span>
                <span>Online</span>
            </div>
        )
    } else if (status == "offline") {
        return (
            <div className='d-flex align-items-center'>
                <span className="logged-out" style={{ cursor: "default" }}>●</span>
                <span>Offline</span>
            </div>
        );
    } else {
        return (
            <div className='d-flex align-items-center'>
                <span className="logged-loading" style={{ cursor: "default" }}>●</span>
                <span>Loading...</span>
            </div>
        )
    }
}

export default UserStat
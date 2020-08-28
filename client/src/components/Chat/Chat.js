import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

// components
import Infobar from '../InfoBar/Infobar'
import InputText from '../InputText/InputText'
import MessageWindow from '../MessageWindow/MessageWindow'
import Room from '../Room/Room'


// styles
import './Chat.css'

let socket;


export default ({location}) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])

    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        socket.emit('JOIN', { name, room }, () => {})

        return () => {
            socket.emit('DISCONNECT')
            socket.off()
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('MESSAGE', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    useEffect(() => {
        socket.on("ROOM_DATA", ({ users }) => {
            setUsers(users);
        });
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()

        if (message) {
            socket.emit('SEND_MSG', message, () => setMessage(''))
        }
    }

    return (
        <div className="chat-window">
            <div className="headerBar">
                Chat.io
            </div>
            <Infobar room={room} />
            <div className="chat-window-container">
                <div className="left-chat-window-container">
                    <Room 
                        users={users}
                    />
                </div>
                <div className="right-chat-window-container">
                    <MessageWindow 
                        messages={messages}
                        name={name}
                    />
                    <InputText 
                        message={message}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                    />
                </div>
            </div>
        </div>
    )
}
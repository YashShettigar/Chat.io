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
    const [usersInRoom, setUsersInRoom] = useState([])

    const ENDPOINT = 'localhost:5000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, () => {})

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    useEffect(() => {
        socket.on('users', ({ users }) => {
            setUsersInRoom(users)
        })
    }, [usersInRoom])

    const sendMessage = (e) => {
        e.preventDefault()

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''))
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
                        users={usersInRoom}
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
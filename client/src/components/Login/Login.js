import React, { useState } from 'react'
import { Link } from "react-router-dom";


// components
import LoginFields from '../LoginFields/LoginFields'

// styles
import './LoginStyles.css'

export default () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <div className="login">
            <div className="headerBar">
                Chat.io
            </div>
            <div className="body">
                <LoginFields 
                    setName={setName} 
                    setRoom={setRoom} 
                />
                <Link 
                    onClick={e => (!name || !room) ? e.preventDefault() : null} 
                    to={`/chat?name=${name}&room=${room}`}
                >
                    <button className="joinBtn">Join</button>
                </Link>
            </div>
        </div>
    )
}
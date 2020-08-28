import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

// styles
import './Room.css'

export default ({users}) => (
    <ScrollToBottom className="member-container">
        {users.map((user, key) => <div className="name-container" key={key}>{user.name}</div>)}
    </ScrollToBottom>
)
import React from 'react'
import ScrollToBottom from "react-scroll-to-bottom";

// components
import Message from '../Message/Message'

// styles
import './MessageWindow.css'

export default ({ messages, name }) => (
        <ScrollToBottom className="message-window">
            {messages.map((message, key) => 
                <Message 
                    key={key}
                    message={message}
                    name={name}
                />)}
        </ScrollToBottom>
)
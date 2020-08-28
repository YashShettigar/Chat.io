import React from 'react'

// styles
import './InputText.css'

// icon
import Send from '../../icons/send.svg'

export default ({ message, setMessage, sendMessage }) => (
    <div className="msg-input-container">
        <input 
            className="message-box"
            value={message} 
            type="text" 
            placeholder="Type message here ..." 
            onChange={e => setMessage(e.target.value)} 
            onKeyPress={e => e.key==='Enter' ? sendMessage(e) : null}
        />
        <button
            className="sendBtn"
            onClick={e => sendMessage(e)}
        >
            <img 
                className="send-icon"
                src={Send}
                alt="Send"
            />
        </button>
    </div>
)
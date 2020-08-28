import React from 'react'

import ReactEmoji from 'react-emoji'

// styles
import './Message.css'

export default ({ message: { user, text }, name }) => {
    let isSentByCurrentuser = false

    const trimname = name.trim().toLowerCase()

    if (user===trimname) {
        isSentByCurrentuser = true
    }

    const leftStyle = {
        borderTopLeftRadius: '6px', 
        borderTopRightRadius: '6px',

    }

    const rightStyle = {
        borderBottomLeftRadius: '6px', 
        borderBottomRightRadius: '6px',
        textAlign: 'end'
    }

    return (
        isSentByCurrentuser ? (
            <div className="message-container" style={{ position: 'relative', float: 'right' }}>
                <div className="text-box">
                    {ReactEmoji.emojify(text)}
                </div>
                <div className="writer" style={rightStyle}>You</div>
            </div>
        ) : (
            <div className="message-container">
                <div className="writer" style={leftStyle}>{user}</div>
                <div className="text-box">
                    {ReactEmoji.emojify(text)}
                </div>
            </div>
        )
    )
}
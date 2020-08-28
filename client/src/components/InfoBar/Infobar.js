import React from 'react'

// styles
import './Infobar.css'

// icons
import online_icon from '../../icons/online-icon.png'
import close_icon from '../../icons/logout.png'

export default ({ room }) => (
    <div className="infobar">
        <div className="leftContainer">
            <img 
                className="online"
                src={online_icon}
                alt="online"
            />
            <h3>
                {room}
            </h3>
        </div>
        <div className="rightContainer">
            <a href="/">
                <img 
                    className="close"
                    src={close_icon}
                    alt="close"
                />
            </a>
        </div>
    </div>
)
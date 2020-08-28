import React from 'react'

// styles
import './LoginField.css'

export default (props) => {
    const fields = [
        {label: 'Name' ,type: 'text', placeholder: 'Enter your name here', onChange: props.setName},
        {label: 'Room ID' ,type: 'text', placeholder: 'Enter room ID here', onChange: props.setRoom}
    ]
    return (
        <>
            {fields.map((field, key) => {
                 return <div className="row-container" key={key}>
                    <label className="join-label">{field.label}</label>
                    <input className="join-input" type={field.type} placeholder={field.placeholder} onChange={e => field.onChange(e.target.value)}/>
                </div>
            })}
        </>
    )
}